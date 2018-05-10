import { firestoreDb as db, storageEvents, storageRef as store } from "../libs/firebaseConfig";
// helpers
import { getImageBlob, generateUUID } from "../app/global/ImageHelper";
// constants
import { ARTWORK_CHANGE } from "./UserDataActions";

// ADD ARTWORK
export function addArtwork(userId, artworkData, imgFile, masterCanvas, callback) {
    return dispatch => {

        saveImage(userId, imgFile, 3000,
            progress => console.log("progress: ", progress)
            ,
            sourceImgUrl => {
                saveImage(userId, masterCanvas, 250,
                    progress => console.log("Thumb progress: ", progress)
                    ,
                    thumbUrl => {
                        const newArtworkData = {
                            ...artworkData,
                            adminId: userId,
                            sourceUrl: sourceImgUrl,
                            thumbUrl: thumbUrl,
                            dateAdded: Date.now()
                        };

                        fs_saveNewArtworkData(userId, newArtworkData, (artworkId) => {

                            const newArtworkDataWithId = {...newArtworkData, artworkId};

                            dispatch({
                                type: ARTWORK_CHANGE,
                                payload: { [artworkId]: newArtworkDataWithId }
                            });

                            if (callback) callback(artworkId);
                        });

                    });
            })
    }
}

function fs_saveNewArtworkData(userId, newArtworkData, callback) {
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    int_saveArtworkChanges(artworkId, newArtworkData, () => {
        if (callback) callback(artworkId);
    });
}

function fs_saveArtworkImage(blobData, onChangeCallback, onCompleteCallback) {
    int_saveImage(blobData,
        (progress) => {
            if (onChangeCallback) onChangeCallback(progress);
        },
        (downloadURL) => {
            // Upload completed successfully - return download url
            if (onCompleteCallback) onCompleteCallback(downloadURL);
        });
}

function saveImage(userId, source, maxSize, onProgress, onComplete) {
    getImageBlob(source, maxSize, blobData => {
        fs_saveArtworkImage(
            blobData
            ,
            (progressData) => {
                if (onProgress) onProgress(progressData);
            }
            ,
            (url) => {
                if (onComplete) onComplete(url)
            }
        )
    });
};

function int_saveImage(blob, onChangeCallback, onCompleteCallback) {
    // generate random unique name
    const fileName = generateUUID();
    // create the reference
    const userPicturesRef = store.child(`userContent/${fileName}`);
    // start the upload
    const uploadTask = userPicturesRef.put(blob);
    // listen for upload events
    uploadTask
        .on(storageEvents.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                onChangeCallback(progress);
            },
            (error) => {
                // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
                console.log("uncaught error: ", error);
            },
            () => {
                // return the download url so it can be saved to artwork data
                onCompleteCallback(uploadTask.snapshot.downloadURL);
            })
}

// AVE ARTWORK CHANGES
function int_saveArtworkChanges(artworkId, newData, onChangeCallback = null) {
    newData.lastUpdated = Date.now();

    db.collection('artworks')
        .doc(artworkId)
        .set(newData, { merge: true })
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Update artwork failed: ', error);
        })
}

// UPDATE ARTWORK
export function updateArtwork(artworkId, newArtworkData, callback = null) {
    return dispatch => {
        fs_updateArtwork(artworkId, newArtworkData, () => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: newArtworkData }
            });

            if (callback) callback();
        });
    }
}

function fs_updateArtwork(artworkId, newArtworkData, onChangeCallback = null) {
    int_saveArtworkChanges(artworkId, newArtworkData, () => {
        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
    });
}



/*export function fs_updateThumbnail(artworkId, artistId, thumbFile, onChangeCallback = null) {
    int_saveImage(artworkId, artistId, thumbFile, 'thumbnail_',
        (onChangeData) => {
            if (onChangeCallback) onChangeCallback(onChangeData);
        },
        (onCompleteData) => {
            // Upload completed successfully - save artwork data
            const newArtworkData = { thumb_url: onCompleteData.downloadURL };

            int_saveArtworkChanges(artworkId, newArtworkData, () => {
                onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
            });
        });
}*/

/*export function updateArtworkImage(artworkId, artistId, newImg, widthToHeightRatio, heightToWidthRatio, callback = null) {
    return dispatch => {
        fs_updateArtworkImage(artworkId, artistId, newImg, widthToHeightRatio, heightToWidthRatio, (updateProgressData) => {
            dispatch({
                type: UPDATE_ARTWORK_COMPLETE,
                payload: updateProgressData
            });

            if (callback) callback(updateProgressData);
        })
    }
}*/

/*export function updateArtworkThumbnail(artworkId, artistId, newThumbImg, callback = null) {
    return dispatch => {
        fs_updateThumbnail(artworkId, artistId, newThumbImg, (updateProgressData) => {
            dispatch({
                type: UPDATE_THUMBNAIL_COMPLETE,
                payload: updateProgressData
            });

            if (callback) callback(updateProgressData);
        })
    }
}*/

/*
export function fs_updateArtworkImage(artworkId, artistId, newImage, widthToHeightRatio, heightToWidthRatio, onChangeCallback = null) {
    // delete the server generated image urls
    db.collection('artworks')
        .doc(artworkId)
        .update({
            url_large: fb.firestore.FieldValue.delete(),
            url_med: fb.firestore.FieldValue.delete()
        })
        // delete the source image
        .then(() => {
            int_saveImage(artworkId, artistId, newImage, '',
                (onChangeData) => {
                    if (onChangeCallback) onChangeCallback(onChangeData);
                },
                (onCompleteData) => {
                    // Upload completed successfully - save artwork data
                    let newArtworkData = {
                        widthToHeightRatio,
                        heightToWidthRatio,
                        url: onCompleteData.downloadURL
                    };

                    int_saveArtworkChanges(artworkId, newArtworkData, () => {
                        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
                    });
                });
        })
        .catch(function (error) {
            console.log('Update artwork failed: ', error);
        })
}
*/