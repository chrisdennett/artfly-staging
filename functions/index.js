'use strict';
const functions = require(`firebase-functions`);
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')({ keyFilename: 'art-blam-firebase-adminsdk-zebo2-cc2250b8ef.json' });
const spawn = require(`child-process-promise`).spawn;

admin.initializeApp(functions.config().firebase);

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
        const fileName = filePath.split(`/`).pop();
        const fileBucket = object.bucket;
        const bucket = gcs.bucket(fileBucket);
        const tempFilePath = `/tmp/${fileName}`;
        const ref = admin.database().ref();

        const largeImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1large_$2');
        const mediumImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1medium_$2');
        const thumbImageFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');

        const tempLocalLargeFile = `/tmp/large.jpg`;
        const tempLocalMediumFile = `/tmp/medium.jpg`;
        const tempLocalThumbFile = `/tmp/tiny.jpg`;

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
                            console.log("THUMB Pic made > source path exists: ", exists);

                            if (exists === false) {
                                thumbFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            thumbFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}thumb`).set(response[0])
                                        .then(() => {
                                            // console.log("Wow it worked TINY and stuff: ");
                                        });
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
                            console.log("MEDIUM Pic made > source path exists: ", exists);

                            if (exists === false) {
                                mediumFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            mediumFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}med`).set(response[0])
                                        .then(() => {
                                            // console.log("Wow it worked TINY and stuff: ");
                                        });
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
                            console.log("LARGE Pic made > source path exists: ", exists);

                            if (exists === false) {
                                largeFile.delete();
                                return;
                            }

                            // get a signed url so it has public access
                            largeFile.getSignedUrl(signedUrlConfig)
                                .then((response) => {
                                    // write the signed url to the database
                                    ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}large`).set(response[0])
                                        .then(() => {
                                            // console.log("Wow it worked TINY and stuff: ");
                                        });
                                })
                        });
                    })
            })
    });