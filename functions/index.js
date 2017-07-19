const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')({ keyFilename: 'art-blam-firebase-adminsdk-zebo2-cc2250b8ef.json' });
const exec = require('child-process-promise').exec;
const admin = require('firebase-admin');
const LOCAL_TMP_FOLDER = '/tmp/';

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

admin.initializeApp(functions.config().firebase);

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
exports.generateThumbnail = functions.storage.object().onChange(event => {
    const filePath = event.data.name;
    const filePathSplit = filePath.split('/');
    const fileName = filePathSplit.pop();
    const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
    const thumbFilePath = `${fileDir}${THUMB_PREFIX}${fileName}`;
    const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`;
    const tempLocalFile = `${tempLocalDir}${fileName}`;
    const tempLocalThumbFile = `${LOCAL_TMP_FOLDER}${thumbFilePath}`;
    const ref = admin.database().ref();

    // Exit if this is triggered on a file that is not an image.
    if (!event.data.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return;
    }

    // Exit if the image is already a thumbnail.
    if (fileName.startsWith(THUMB_PREFIX)) {
        console.log('Already a Thumbnail.');
        return;
    }

    // Exit if this is a move or deletion event.
    if (event.data.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }

    // Create the temp directory where the storage file will be downloaded.
    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        const bucket = gcs.bucket(event.data.bucket);
        return bucket.file(filePath).download({
            destination: tempLocalFile
        }).then(() => {
            console.log('The file has been downloaded to', tempLocalFile);
            // Generate a thumbnail using ImageMagick.
            return exec(`convert "${tempLocalFile}" -thumbnail '${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>' "${tempLocalThumbFile}"`).then(() => {
                console.log('Thumbnail created at', tempLocalThumbFile);
                // Uploading the Thumbnail.
                return bucket.upload(tempLocalThumbFile, {
                    destination: thumbFilePath
                }).then(() => {
                    console.log('Thumbnail uploaded to Storage at', thumbFilePath);

                    const thumbFile = bucket.file(thumbFilePath);
                    const config = {
                        action: 'read',
                        expires: '02/07/2442'
                    };

                    return Promise.all([
                        thumbFile.getSignedUrl(config)
                    ])
                }).then(results => {
                    const thumbResult = results[0];
                    const thumbFileUrl = thumbResult[0];

                    console.log("thumbFileUrl: ", thumbFileUrl);
                    //art-blam/user-data/artworks/[artworkId]/thumbUrl

                    ref.child(`user-data/artworks/${fileName}/thumbUrl`).set(thumbFileUrl).then(()=>{
                        console.log("Wow it worked and stuff: ");
                    });
                })
            });
        });
    });
});