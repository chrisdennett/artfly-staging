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

        const thumbFilePathLarge = filePath.replace(/(\/)?([^\/]*)$/, '$1large_$2');
        const thumbFilePathMedium = filePath.replace(/(\/)?([^\/]*)$/, '$1medium_$2');
        const thumbFilePathTiny = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');

        const tempLocalThumbFileLarge = `/tmp/large`;
        const tempLocalThumbFileMedium = `/tmp/medium`;
        const tempLocalThumbFileTiny = `/tmp/tiny`;


        // Exit if this is triggered on a file that is not an image.
        if (!event.data.contentType.startsWith(`image/`)) {
            console.log(`This is not an image.`);
            return;
        }

        // Exit if the image is already a thumbnail.
        if (fileName.startsWith('url__')) {
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
            // user imageMagick to create a thumbnail version
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=100x100`, tempFilePath, `-thumbnail`, `100x100`, tempLocalThumbFileTiny])
            })
            // upload the thumbnail version to storage
            .then(() => {
                return bucket.upload(tempLocalThumbFileTiny, { destination: thumbFilePathTiny })
            })

            // do the same for the medium version of the file
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=640x640`, tempFilePath, `-thumbnail`, `640x640`, tempLocalThumbFileMedium])
            })
            .then(() => {
                return bucket.upload(tempLocalThumbFileMedium, { destination: thumbFilePathMedium })
            })

            // and again for the large version of the file
            .then(() => {
                return spawn(`convert`, [`-define`, `jpeg:size=960x960`, tempFilePath, `-thumbnail`, `960x960`, tempLocalThumbFileLarge])
            })
            .then(() => {
                return bucket.upload(tempLocalThumbFileLarge, { destination: thumbFilePathLarge })
            })

            // then write the urls to the database so they can be accessed
            .then(() => {
                const thumbFile = bucket.file(thumbFilePathTiny);
                const mediumFile = bucket.file(thumbFilePathMedium);
                const largeFile = bucket.file(thumbFilePathLarge);
                const config = {
                    action: 'read',
                    expires: '02-07-2442'
                };

                return Promise.all([
                    thumbFile.getSignedUrl(config),
                    mediumFile.getSignedUrl(config),
                    largeFile.getSignedUrl(config)
                ])
            })
            .then(results => {
                const tinyResult = results[0];
                const mediumResult = results[1];
                const largeResult = results[2];

                const tinyUrl = tinyResult[0];
                const mediumUrl = mediumResult[0];
                const largeUrl = largeResult[0];

                // the file name is the artworkId
                ref.child(`user-data/artworks/${fileName}/url__thumb`).set(tinyUrl).then(() => {
                    // console.log("Wow it worked TINY and stuff: ");
                });

                ref.child(`user-data/artworks/${fileName}/url__med`).set(mediumUrl).then(() => {
                    // console.log("Wow it worked MEDIUM and stuff: ");
                });

                ref.child(`user-data/artworks/${fileName}/url__large`).set(largeUrl).then(() => {
                    // console.log("Wow it worked LARGE and stuff: ");
                });
            })
    });