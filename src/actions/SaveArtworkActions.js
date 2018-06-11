import { auth, firestoreDb as db, storage, storageEvent, storageRef as store } from "../libs/firebaseConfig";
// helpers
import { getImageBlob, generateUUID } from "../app/global/ImageHelper";
// constants
import { THUMB_SIZE, LARGE_IMG_SIZE, MAX_IMG_SIZE } from '../app/global/GLOBAL_CONSTANTS';
import { ARTWORK_CHANGE } from "./GetArtworkActions";

export const SAVING_ARTWORK_TRIGGERED = 'saving_artwork_triggered';
export const SAVING_ARTWORK_COMPLETE = 'saving_artwork_complete';
export const SAVING_ARTWORK_PROGRESS = 'saving_artwork_progress';
export const SAVING_ARTWORK_CLEAR_PROGRESS = 'saving_artwork_clear_progress';

export function resetArtworkSavingProgress() {
    return dispatch => {
        dispatch({
            type: SAVING_ARTWORK_CLEAR_PROGRESS
        });
    }
}

// UPDATE ARTWORK
export function updateArtwork(artworkId, newArtworkData, callback = null) {
    return dispatch => {

        saveArtworkChanges(artworkId, newArtworkData, () => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: newArtworkData }
            });

            if (callback) callback();
        });
    }
}

// ADD ARTWORK
export function addNewArtwork(imgFile, artworkData) {
    return dispatch => {

        const { uid: userId } = auth.currentUser;
        const { orientation, cropData } = artworkData;

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        saveImage({ userId, source: imgFile, maxSize: MAX_IMG_SIZE },
            progress => {
                dispatch({
                    type: SAVING_ARTWORK_PROGRESS,
                    payload: {
                        key: 'source',
                        progress
                    }
                });
            }
            ,
            sourceUrl => {
                // save thumb
                saveImage({ userId, source: imgFile, maxSize: THUMB_SIZE, orientation, cropData },
                    progress => {
                        dispatch({
                            type: SAVING_ARTWORK_PROGRESS,
                            payload: {
                                key: 'thumb',
                                progress
                            }
                        });
                    }
                    ,
                    thumbUrl => {

                        // save large image
                        saveImage({ userId, source: imgFile, maxSize: LARGE_IMG_SIZE, orientation, cropData },
                            progress => {
                                dispatch({
                                    type: SAVING_ARTWORK_PROGRESS,
                                    payload: {
                                        key: 'large',
                                        progress
                                    }
                                });
                            }
                            ,
                            largeUrl => {
                                // const { orientation, cropData, heightToWidthRatio, widthToHeightRatio, ...rest } = artworkData;

                                const fullArtworkData = {
                                    adminId: userId,
                                    largeUrl,
                                    sourceUrl,
                                    thumbUrl,
                                    ...artworkData
                                };

                                saveNewArtworkData(userId, fullArtworkData, (artworkId) => {
                                    // const newArtworkDataWithId = { ...newArtworkData, artworkId };

                                    dispatch({
                                        type: SAVING_ARTWORK_COMPLETE,
                                        payload: artworkId
                                    });
                                });
                            });
                    });
            })
    }
}

export function updateArtworkAndImage(imgFile, artworkData, artworkId) {
    return dispatch => {

        const { uid: userId } = auth.currentUser;
        const { orientation, cropData } = artworkData;

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        // save thumb
        saveImage({ url: artworkData.thumbUrl, userId, source: imgFile, maxSize: THUMB_SIZE, orientation, cropData },
            progress => {
                dispatch({
                    type: SAVING_ARTWORK_PROGRESS,
                    payload: {
                        key: 'thumb',
                        progress
                    }
                });
            }
            ,
            thumbUrl => {

                // save large image
                saveImage({ url: artworkData.largeUrl, userId, source: imgFile, maxSize: LARGE_IMG_SIZE, orientation, cropData },
                    progress => {
                        dispatch({
                            type: SAVING_ARTWORK_PROGRESS,
                            payload: {
                                key: 'large',
                                progress
                            }
                        });
                    }
                    ,
                    largeUrl => {
                        // const { orientation, cropData, heightToWidthRatio, widthToHeightRatio, ...rest } = artworkData;

                        const fullArtworkData = {
                            ...artworkData,
                            largeUrl,
                            thumbUrl
                        };

                        // This the only difference with adding new artwork.
                        saveArtworkChanges(artworkId, fullArtworkData, () => {
                            dispatch({
                                type: SAVING_ARTWORK_COMPLETE,
                                payload: artworkId
                            });
                        });
                    });
            });
    }
}

function saveImage({ userId, source, orientation, cropData, maxSize, url = null }, onProgress, onComplete) {
    getImageBlob({ source, maxSize, orientation, cropData }, blobData => {
        fs_saveArtworkImage(
            blobData,
            url
            ,
            (progressData) => {
                if (onProgress) onProgress(progressData);
            }
            ,
            (returnUrl) => {
                if (onComplete) onComplete(returnUrl)
            }
        )
    });
}

function fs_saveArtworkImage(blobData, url, onChangeCallback, onCompleteCallback) {
    let userPicturesRef;
    if (url) {
        userPicturesRef = storage.refFromURL(url);
    }
    else {
        // generate random unique name
        const fileName = generateUUID();
        // create the reference
        userPicturesRef = store.child(`userContent/${fileName}`);
    }

    // start the upload
    const uploadTask = userPicturesRef.put(blobData);
    // listen for upload events

    uploadTask
        .on(storageEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 100;
                onChangeCallback(progress);
            },
            (error) => {
                // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
                console.log("uncaught error: ", error);
            },
            () => {
                // return the download url so it can be saved to artwork data
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadURL => onCompleteCallback(downloadURL));
            })
}

// SAVE NEW ARTWORK
function saveNewArtworkData(userId, newArtworkData, callback) {
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    saveArtworkChanges(artworkId, newArtworkData, () => {
        if (callback) callback(artworkId);
    });
}

// SAVE ARTWORK CHANGES
function saveArtworkChanges(artworkId, newData, onChangeCallback = null) {
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


/*function int_saveImage(blobData, onChangeCallback, onCompleteCallback) {
    // generate random unique name
    const fileName = generateUUID();
    // create the reference
    const userPicturesRef = store.child(`userContent/${fileName}`);
    // start the upload
    const uploadTask = userPicturesRef.put(blobData);
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
}*/

/*function fs_updateArtwork(artworkId, newArtworkData, onChangeCallback = null) {
    saveArtworkChanges(artworkId, newArtworkData, () => {
        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
    });
}*/

/*export function fs_updateThumbnail(artworkId, artistId, thumbFile, onChangeCallback = null) {
    int_saveImage(artworkId, artistId, thumbFile, 'thumbnail_',
        (onChangeData) => {
            if (onChangeCallback) onChangeCallback(onChangeData);
        },
        (onCompleteData) => {
            // Upload completed successfully - save artwork data
            const newArtworkData = { thumb_url: onCompleteData.downloadURL };

            saveArtworkChanges(artworkId, newArtworkData, () => {
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

                    saveArtworkChanges(artworkId, newArtworkData, () => {
                        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
                    });
                });
        })
        .catch(function (error) {
            console.log('Update artwork failed: ', error);
        })
}
*/