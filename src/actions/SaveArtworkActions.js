import { auth, firestoreDb as db, storage, storageEvent, storageRef as store } from "../libs/firebaseConfig";
// helpers
import { createMaxSizeCanvas } from "../editors/canvasCreators";
// constants
import { THUMB_SIZE } from '../GLOBAL_CONSTANTS';
import { getImageBlob } from "../components/global/UTILS";

export const SAVING_ARTWORK_TRIGGERED = 'saving_artwork_triggered';
export const SAVING_ARTWORK_COMPLETE = 'saving_artwork_complete';
export const SAVING_ARTWORK_PROGRESS = 'saving_artwork_progress';

export function addNewArtwork(sourceCanvas, largeArtworkCanvas, artworkData, callback) {
    return dispatch => {
        const { uid: userId } = auth.currentUser;

        const artworkDatabaseRef = db.collection('artworks').doc();
        const artworkId = artworkDatabaseRef.id;
        const thumbCanvas = createMaxSizeCanvas(largeArtworkCanvas, THUMB_SIZE, THUMB_SIZE);

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        saveImage({ userId, artworkId, canvas: sourceCanvas, directory: 'source', dispatch, key: 'source' },
            sourceUrl => {
                // save thumb
                saveImage({ userId, artworkId, directory: 'thumb', canvas: thumbCanvas, dispatch, key: 'thumb' },
                    thumbUrl => {
                        // save large image
                        saveImage({ userId, artworkId, directory: 'large', canvas: largeArtworkCanvas, dispatch, key: 'large' },
                            largeUrl => {
                                const fullArtworkData = {
                                    adminId: userId,
                                    dateAdded: Date.now(),
                                    largeUrl,
                                    sourceUrl,
                                    thumbUrl,
                                    ...artworkData
                                };

                                saveNewArtwork(fullArtworkData, (artworkId, artworkDataWithId) => {
                                    dispatch({
                                        type: SAVING_ARTWORK_COMPLETE,
                                        payload: { [artworkId]: artworkDataWithId }
                                    });

                                    if (callback) callback(artworkId);
                                });
                            });
                    });
            })
    }
}

// UPDATE batch of artworks
export function updateArtworkBatch(updatedArtworks, callback) {

    return async dispatch => {
        try {
            for (let updatedArt of updatedArtworks) {
                saveArtworkChanges(updatedArt.artworkId, updatedArt, () => {
                    dispatch({
                        type: SAVING_ARTWORK_COMPLETE,
                        payload: { [updatedArt.artworkId]: updatedArt }
                    });

                    if (callback) callback(updatedArt.artworkId);
                });
            }

            if (callback) callback();
        }
        catch (error) {
            console.log('error: ', error)
        }
    }
}

// UPDATE ARTWORK DATA ONLY
export function updateArtwork(artworkId, newArtworkData, callback) {
    return dispatch => {

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        console.log('newArtworkData: ', newArtworkData)

        saveArtworkChanges(artworkId, newArtworkData, () => {
            dispatch({
                type: SAVING_ARTWORK_COMPLETE,
                payload: { [artworkId]: newArtworkData }
            });

            if (callback) callback(artworkId);
        });
    }
}

// UPDATE ARTWORK & IMAGE WITH SOURCE
export function updateArtworkAndSourceImage(sourceCanvas, largeArtworkCanvas, artworkData, artworkId, callback) {
    return dispatch => {

        const { uid: userId } = auth.currentUser;
        const thumbCanvas = createMaxSizeCanvas(largeArtworkCanvas, THUMB_SIZE, THUMB_SIZE);

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        saveImage({ url: artworkData.sourceUrl, userId, artworkId, canvas: sourceCanvas, directory: 'source', dispatch, key: 'source' },
            sourceUrl => {
                // save thumb
                saveImage({ url: artworkData.thumbUrl, userId, canvas: thumbCanvas, dispatch, key: 'thumb' },
                    thumbUrl => {
                        // save large image
                        saveImage({ url: artworkData.largeUrl, userId, canvas: largeArtworkCanvas, dispatch, key: 'large' },
                            largeUrl => {
                                const fullArtworkData = { ...artworkData, sourceUrl, largeUrl, thumbUrl };

                                // This the only difference with adding new artwork.
                                saveArtworkChanges(artworkId, fullArtworkData, () => {
                                    dispatch({
                                        type: SAVING_ARTWORK_COMPLETE,
                                        payload: { [artworkId]: fullArtworkData }
                                    });

                                    if (callback) callback(artworkId);
                                });
                            });
                    });
            });
    }
}

// UPDATE ARTWORK & IMAGE
export function updateArtworkAndImage(largeArtworkCanvas, artworkData, artworkId, callback) {
    return dispatch => {

        const { uid: userId } = auth.currentUser;
        const thumbCanvas = createMaxSizeCanvas(largeArtworkCanvas, THUMB_SIZE, THUMB_SIZE);

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        // save thumb
        saveImage({ url: artworkData.thumbUrl, userId, canvas: thumbCanvas, dispatch, key: 'thumb' },
            thumbUrl => {
                // save large image
                saveImage({ url: artworkData.largeUrl, userId, canvas: largeArtworkCanvas, dispatch, key: 'large' },
                    largeUrl => {
                        const fullArtworkData = { ...artworkData, largeUrl, thumbUrl };

                        // This the only difference with adding new artwork.
                        saveArtworkChanges(artworkId, fullArtworkData, () => {
                            dispatch({
                                type: SAVING_ARTWORK_COMPLETE,
                                payload: { [artworkId]: fullArtworkData }
                            });

                            if (callback) callback(artworkId);
                        });
                    });
            });
    }
}

function saveImage({ userId, artworkId, directory, canvas, dispatch, key, url = null }, onComplete) {
    // jpeg quality: thumbs look a bit pixelated so use full quality
    const quality = directory === 'thumb' ? 1 : 0.95;

    getImageBlob({ canvas, quality }, blobData => {
        fs_saveArtworkImage(
            blobData,
            userId,
            artworkId,
            directory,
            url
            ,
            (progressData) => {
                dispatch({
                    type: SAVING_ARTWORK_PROGRESS,
                    payload: {
                        key: key,
                        progress: progressData
                    }
                });
            }
            ,
            (returnUrl) => {
                if (onComplete) onComplete(returnUrl)
            }
        )
    });
}

function fs_saveArtworkImage(blobData, userId, artworkId, directory, url, onChangeCallback, onCompleteCallback) {
    let userPicturesRef;
    if (url) {
        // if url exists
        userPicturesRef = storage.refFromURL(url);
    }
    else {
        // create the reference
        userPicturesRef = store.child(`user/${userId}/${directory}/${artworkId}`);
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

// SAVE NEW ARTWORK CHANGES
export function updateArtworkData(artworkId, newData, callback = null) {
    return dispatch => {

        dispatch({
            type: SAVING_ARTWORK_TRIGGERED
        });

        saveArtworkChanges(artworkId, newData, () => {
            dispatch({
                type: SAVING_ARTWORK_COMPLETE,
                payload: { [artworkId]: newData }
            });

            if (callback) callback(artworkId);
        });

    }
}

// SAVE ARTWORK CHANGES
export function saveArtworkChanges(artworkId, newData, onChangeCallback = null) {
    newData.lastUpdated = Date.now();

    db.collection('artworks')
        .doc(artworkId)
        .update(newData)
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Update artwork failed: ', error);
        })
}

export function saveNewArtwork(newData, onChangeCallback = null) {
    newData.lastUpdated = Date.now();

    const newRef = db.collection("artworks").doc();
    const newArtworkId = newRef.id;
    const artworkDataWithId = { ...newData, artworkId: newArtworkId };

    newRef
        .set(artworkDataWithId)
        .then(() => {
            if (onChangeCallback) onChangeCallback(newArtworkId, artworkDataWithId);
        })
        .catch(function (error) {
            console.log('Adding artwork failed: ', error);
        })
}