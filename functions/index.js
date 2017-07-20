'use strict';
const functions = require(`firebase-functions`);
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')({ keyFilename: 'art-blam-firebase-adminsdk-zebo2-cc2250b8ef.json' });
const spawn = require(`child-process-promise`).spawn;

admin.initializeApp(functions.config().firebase);

exports.generateThumbnail = functions.storage.object()
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

        const tempLocalLargeFile = `/tmp/large`;
        const tempLocalMediumFile = `/tmp/medium`;
        const tempLocalThumbFile = `/tmp/tiny`;

        const databaseUrlPropertyPrefix = 'url__';

        const signedUrlConfig = {
            action: 'read',
            expires: '02-07-2442'
        };


        // Exit if this is triggered on a file that is not an image.
        if (!event.data.contentType.startsWith(`image/`)) {
            console.log(`This is not an image.`);
            return;
        }

        // Exit if the image is already a thumbnail.
        if (fileName.startsWith(databaseUrlPropertyPrefix)) {
            console.log(`Already a Thumbnail.`);
            return;
        }

        // Exit if this is a move or deletion event.
        if (event.data.resourceState === `not_exists`) {
            console.log(`This is a deletion event.`);
            return;
        }

        // download a copy of the original image
        return bucket.file(filePath).download({ destination: tempFilePath })
        // use imageMagick to create a thumbnail version
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=100x100`, tempFilePath, `-thumbnail`, `100x100`, tempLocalThumbFile])
            })
            // upload the thumbnail version to storage
            .then(() => {
                return bucket.upload(tempLocalThumbFile, { destination: thumbImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the thumb file path in storage
                        const thumbFile = bucket.file(thumbImageFilePath);
                        // get a signed url so it has public access
                        thumbFile.getSignedUrl(signedUrlConfig)
                            .then((response) => {
                                // write the signed url to the database
                                ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}thumb`).set(response[0])
                                    .then(() => {
                                        // console.log("Wow it worked TINY and stuff: ");
                                    });
                            })
                    })
            })

            // do the same for the medium version of the file
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=640x640`, tempFilePath, `-thumbnail`, `640x640`, tempLocalMediumFile])
            })
            .then(() => {
                return bucket.upload(tempLocalMediumFile, { destination: mediumImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the file path in storage
                        const mediumFile = bucket.file(mediumImageFilePath);
                        // get a signed url so it has public access
                        mediumFile.getSignedUrl(signedUrlConfig)
                            .then((response) => {
                                // write the signed url to the database
                                ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}med`).set(response[0])
                                    .then(() => {
                                        // console.log("Wow it worked TINY and stuff: ");
                                    });
                            })
                    })
            })

            // and again for the large version of the file
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=960x960`, tempFilePath, `-thumbnail`, `960x960`, tempLocalLargeFile])
            })
            .then(() => {
                return bucket.upload(tempLocalLargeFile, { destination: largeImageFilePath })
                // then get the signed url and write it to the database
                    .then(() => {
                        // reference the file path in storage
                        const largeFile = bucket.file(largeImageFilePath);
                        // get a signed url so it has public access
                        largeFile.getSignedUrl(signedUrlConfig)
                            .then((response) => {
                                // write the signed url to the database
                                ref.child(`user-data/artworks/${fileName}/${databaseUrlPropertyPrefix}large`).set(response[0])
                                    .then(() => {
                                        // console.log("Wow it worked TINY and stuff: ");
                                    });
                            })
                    })
            })
    });