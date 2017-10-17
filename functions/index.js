'use strict';
const functions = require(`firebase-functions`);
const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')({ keyFilename: 'art-blam-firebase-adminsdk-zebo2-cc2250b8ef.json' });
const spawn = require(`child-process-promise`).spawn;

admin.initializeApp(functions.config().firebase);

const firestore = new Firestore();

exports.removeImagesOnDelete = functions.storage.object()
    .onChange(event => {
        const object = event.data;
        const fileBucket = object.bucket;
        const bucket = gcs.bucket(fileBucket);
        const filePath = object.name;
        const fileName = filePath.split(`/`).pop();

        // If it's not a deletion event I'm not interested.
        if (event.data.resourceState !== `not_exists`) {
            console.log(`This is not a deletion event - take no action.`);
            return;
        }

        // Exit if this is triggered on a file that is not an image.
        if (!event.data.contentType.startsWith(`image/`)) {
            console.log(`This is not an image - take no action.`);
            return;
        }

        // Exit if the image is already a thumbnail.
        if (fileName.startsWith("large_") || fileName.startsWith("medium_") || fileName.startsWith("thumb_")) {
            console.log(`A thumbnail is being deleted - take no action.`);
            return;
        }

        const largeImageFilePath = filePath.replace(fileName, "large_" + fileName);
        const mediumImageFilePath = filePath.replace(fileName, "medium_" + fileName);
        const thumbImageFilePath = filePath.replace(fileName, "thumb_" + fileName);

        const largeFile = bucket.file(largeImageFilePath);
        const mediumFile = bucket.file(mediumImageFilePath);
        const thumbFile = bucket.file(thumbImageFilePath);

        largeFile.exists().then((data) => {
            let exists = data[0];
            if (exists) {
                largeFile.delete();
            }
        });

        mediumFile.exists().then((data) => {
            let exists = data[0];
            if (exists) {
                mediumFile.delete();
            }
        });

        thumbFile.exists().then((data) => {
            let exists = data[0];
            if (exists) {
                thumbFile.delete();
            }
        });

    });

exports.generateDifferentImageSizes = functions.storage.object()
    .onChange(event => {
        const object = event.data;
        const filePath = object.name;
        // the original image name has been set to match the artworkId
        const fileName = filePath.split(`/`).pop();
        const fileBucket = object.bucket;
        const bucket = gcs.bucket(fileBucket);
        const tempFilePath = `/tmp/${fileName}`;
        const ref = firestore.doc(`artworks/${fileName}`);

        const largeImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1large_$2');
        const mediumImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1medium_$2');
        const thumbImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');

        const tempLocalLargeFile = `/tmp/large.jpg`;    //960x960  //max source size 3500x3500
        const tempLocalMediumFile = `/tmp/medium.jpg`;  //640x640
        const tempLocalThumbFile = `/tmp/tiny.jpg`;     //100x100

        const databaseUrlPropertyPrefix = 'url_';

        const signedUrlConfig = {
            action: 'read',
            expires: '02-07-2442'
        };

        // Exit if this is triggered on a file that is not an image.
        if (!event.data.contentType.startsWith(`image/`)) {
            console.log(`This is not an image.`);
            return;
        }

        // Exit if this is a move or deletion event.
        if (event.data.resourceState === `not_exists`) {
            console.log(`This is a deletion event.`);
            return;
        }

        // Exit if the image is already a thumbnail.
        if (fileName.startsWith("large_") || fileName.startsWith("medium_") || fileName.startsWith("thumb_")) {
            console.log(`Already a Thumbnail.`);
            return;
        }

        // download a copy of the original image
        return bucket.file(filePath).download({ destination: tempFilePath })
        // use imageMagick to create a thumbnail version
            .then(() => {
                return spawn(`convert`, [tempFilePath, `-thumbnail`, `100x100`, tempLocalThumbFile])
            })
            // upload the thumbnail version to storage
            .then(() => {
                return bucket.upload(tempLocalThumbFile, { destination: thumbImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the thumb file path in storage
                        const thumbFile = bucket.file(thumbImageFilePath);

                        // while this image was being created the source image may have been deleted
                        // if so we should delete it and stop the database reference from happening.
                        const sourceFile = bucket.file(filePath);
                        sourceFile.exists().then(data => {
                            let exists = data[0];

                            if (exists === false) {
                                thumbFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            thumbFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref
                                        .set({ [`${databaseUrlPropertyPrefix}thumb`]: response[0] }, { merge: true })
                                        .then(() => {
                                            // console.log("Wow it worked TINY and stuff: ");
                                        })
                                        .catch(function (error) {
                                            console.log('Add small thumb failed: ', error);
                                        })
                                })
                        });
                    })
            })

            // do the same for the medium version of the file
            .then(() => {
                return spawn(`convert`, [tempFilePath, `-thumbnail`, `640x640>`, tempLocalMediumFile])
            })
            .then(() => {
                return bucket.upload(tempLocalMediumFile, { destination: mediumImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the file path in storage
                        const mediumFile = bucket.file(mediumImageFilePath);

                        const sourceFile = bucket.file(filePath);
                        sourceFile.exists().then(data => {
                            let exists = data[0];

                            if (exists === false) {
                                mediumFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            mediumFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref
                                        .set({ [`${databaseUrlPropertyPrefix}med`]: response[0] }, { merge: true })
                                        .then(() => {
                                            // console.log("Wow it worked med and stuff: ");
                                        })
                                        .catch(function (error) {
                                            console.log('Add medium thumb failed: ', error);
                                        })
                                })
                        });
                    })
            })

            // and again for the large version of the file
            .then(() => {
                return spawn(`convert`, [tempFilePath, `-thumbnail`, `960x960>`, tempLocalLargeFile])
            })
            .then(() => {
                return bucket.upload(tempLocalLargeFile, { destination: largeImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the file path in storage
                        const largeFile = bucket.file(largeImageFilePath);

                        // while this image was being created the source image may have been deleted
                        // if so we should delete it and stop the database reference from happening.
                        const sourceFile = bucket.file(filePath);
                        sourceFile.exists().then(data => {
                            let exists = data[0];

                            if (exists === false) {
                                largeFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            largeFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref
                                        .set({ [`${databaseUrlPropertyPrefix}large`]: response[0] }, { merge: true })
                                        .then(() => {
                                            // console.log("Wow it worked large and stuff: ");
                                        })
                                        .catch(function (error) {
                                            console.log('Add large thumb failed: ', error);
                                        })
                                })
                        });
                    })
            })
            .catch(error => {
                console.log("error catch: ", error);
            })
    });

// listen for Paddle subsription events
exports.subscriptionEvent = functions.https.onRequest((request, response) => {
    // const ref = admin.database().ref();
    const alertName = request.body.alert_name;
    const userId = request.body.passthrough;
    // const ref = functions.firestore.collection('users').doc(userId);
    const ref = firestore.doc(`users/${userId}`);

    const subscriptionObject = {};
    subscriptionObject.status = request.body.status; // status can be active, trailing, past_due, deleted
    subscriptionObject.subscriptionId = request.body.subscription_id;
    subscriptionObject.email = request.body.email;
    subscriptionObject.planId = request.body.subscription_plan_id;

    // TODO: return a success response if data has correctly been updated otherwise send a different response.

    switch (alertName) {
        case 'subscription_created':
            subscriptionObject.cancelUrl = request.body.cancel_url;
            subscriptionObject.updateUrl = request.body.update_url;
            subscriptionObject.paidUntil = request.body.next_bill_date;
            break;
        case 'subscription_cancelled':
            subscriptionObject.cancellationEffectiveDate = request.body.cancellation_effective_date;
            break;
        case 'subscription_updated':
            subscriptionObject.paidUntil = request.body.next_bill_date;
            break;
        case 'subscription_payment_succeeded':
            subscriptionObject.paidUntil = request.body.next_bill_date;
            break;
        case 'subscription_payment_failed':
            break;
    }

    ref.set({ subscription: subscriptionObject }, { merge: true })
        .then(() => {
            console.log('Update subscription success');
        })
        .catch(function (error) {
            console.log('Update subscription failed: ', error);
        });

    response.send("update success");
});

// SUBSCRIPTION CREATED
/*
let body = {
    alert_id: '1704388',
    alert_name: 'subscription_created',
    cancel_url: 'https://checkout.paddle.com/subscription/cancel?user=239588&subscription=223920&hash=eyJpdiI6Ikg4RjdwVGZDemxIaUZRSGhma0FtTFJhZUQyWkFYclA2dVVqUU9nTTJCZGc9IiwidmFsdWUiOiJ0SE93S0FHTjVKZHlnR1YxQjNiNHlLbCtscnp1TGxcL052NXJ3N0czWHZ4WjB4Mkk3bVNhUk5YaTdYSEM1bE9lVFJCTDRrRHpxcHlIXC9PV3cyWlNrZXN3PT0iLCJtYWMiOiJlOWZkYWM4YjM4YTVhYjhkZmEwMjA3YjkyNWEzNGQ1MGMyZTg2Njc1NTRlMDczYjliYTAyNzE1NDFlMDQ4YjlmIn0%253D',
    checkout_id: '9090568-chrede047665065-97f566f50f',
    currency: 'GBP',
    email: 'chrisdennett@gmail.com',
    event_time: '2017-08-21 14:42:21',
    next_bill_date: '2017-08-31',
    passthrough: '08pXRSgkZAQsn7q9Qvum15QC2Nj1',
    status: 'trialing',
    subscription_id: '223920',
    subscription_plan_id: '516947',
    update_url: 'https://checkout.paddle.com/subscription/update?user=239588&subscription=223920&hash=eyJpdiI6ImJcL3JOODBKakdBMFwvczJUdXUxQktnT2FRbXIxMlJrSHdoV1dzOFYrOTE5UT0iLCJ2YWx1ZSI6IkZXU3N5ZENnd3p6RVB6SWZzUWpFV2dWcnJNXC9zUnFkcVd6TjlJbXZrSlhWM0NCV1VvRitWVEFWVlBFSHF6TnpYNm8rekFcL1BpOWNxMjFSZnZjRkJQREE9PSIsIm1hYyI6IjBmNmI1MmZmZTk3ZTM1M2Q3MjcyMmRjM2FkY2I3MGY1MTQxNWM3YTJkYjI0NDM2M2EwYjk3NGEzOWM0Y2ZlMzYifQ%253D%253D',
    p_signature: 'hpAaWafnCLtSBN5jj3gLI8DiDwfFqyQccw11FfZv5B6uxIW/Fh6mlguvDtYJjzSjWmV3rfKEbe3eExeMzERL04iMkUESHzRBpGjYjX76J9VjQ92mMLRbZIsrHW5uaxaeqbW6l3KR4wiBGzLbEmMVe9TNAU/I3GRASDYSKcqMTbQs+iCEhK8jd8lXOsTqeveJ3w0w1IZBmAn/+4CRmeYrCPO2nawvawNuGqojVnzMAH2zqHiIDIQ2AohCvKy71CgNZweYKf6v9SmmcolbYsq6VapevQe43B7vkLZrbFqzKlkCFq9UqyZUoes2y++7OPh/fFprhF4G8LkJTJDeBJ7Kd+bzSnMNKG8jWB5i/xHxL/nDHDLcZHhPyaZfNZixONRDaGYoellw1vJFHjweGRMg7crYyCrjnfvwKzIozj5BpWc67sSyANc8N0WoLUCpc0i9G2G5DrQ89+MlVJ0lG7Jmh9b9HlL2mloDHhsQo2QqqkYo/lVNszIuQvo/KdhjSvTUZYS7hiE0jCKpTvRdliV6Ro90MwLOxqf5P/0jMsP53XOpNSp6YVCbTNo5I9LD2OqWYi/7fCPUWIlQyCnUmYQIqzoDcVlGRywvUZxUOSkwWv+t8vQwA8tmk3Qlw99si49ZS0sEgAUNoZfR3FuxBhswD4qedMHzi2FfFVQOt1sEzR8='
};

//SUBSCRIPTION CANCELLED
body = {
    alert_id: '1704550',
    alert_name: 'subscription_cancelled',
    cancellation_effective_date: '2017-08-31',
    checkout_id: '9090568-chrede047665065-97f566f50f',
    email: 'chrisdennett@gmail.com',
    event_time: '2017-08-21 14:57:37',
    passthrough: '08pXRSgkZAQsn7q9Qvum15QC2Nj1',
    status: 'deleted',
    subscription_id: '223920',
    subscription_plan_id: '516947',
    user_id: '239588',
    p_signature: 'prtNXviDqm0bKeEdwDQgY+CeIDGsLZREqc3myHsbOyRi/1b5kjf/H51lnnZn6wmPCfr7OZQZpyKi8f9DZs94G+RHXsUp7YWh9TQQWJDUoHmJ+3IRokxtcWiU83I/7WbeHw3fOGJtO+dRO/Jqp9E63kgo8+BOX1eafIe3WwgyPGWYkB24UnMiQIKE1CRxQ2FLAY9Pzdp2czXgNU0RaPTR650FHOoHOBqzObqJgxGo1Op2BC27V6kum5gBT4YjGrypSERRuMoVlFAtjfHkOrhRcE4bFh6oxOxgcrmTfh2pgIXFHDZhR+B4/pJYvclVkRdobHYlw+230f9WnW9nUht7CvoTswDFtThsNciNaSqvOUiy6Ra2TngxUeLq/WZ5u3+fSUUkBOXIOvudgmSZ2OOSHZBIQ54xYeO8Dld2lqKiE7eKdw6woPWPGW+Mb/POIlH3criVx+jzerusaKVK8A5eAvGpxQ4iwv7ZnUMXfzsZp5y1LY2AsflqM81yq00yzwmOhpi71IthxYWyUDw4TyaefJk9XV8nApUBYibsLmbTQXepArUebJLt70QT8KQQotX3k0V6wknLPdW72IpwdIDA19haDkZgrj2RWz1D8/xJG0xg0m2e+5knRUD3O5TZGVg8O5lRU2qrIXzwJ6BNNSQbXy6k4LlTINILt2ph2x41PRI='
};
*/
