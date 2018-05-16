import { firestoreDb as db, storageEvents, storageRef as store } from "../libs/firebaseConfig";
// helpers
import { getImageBlob, generateUUID } from "../app/global/ImageHelper";
// constants
import { ARTWORK_CHANGE } from "./GetArtworkActions";

// UPDATE ARTWORK
export function updateArtwork(artworkId, newArtworkData, callback = null) {
    return dispatch => {

        // Hmmm, how do I know if this has changed perhaps should use a different method
        // which I think would mean separating out resource and artwork data in component.
        const { orientation, cropData, heightToWidthRatio, widthToHeightRatio, resources, ...rest } = newArtworkData;
        const resourceData = { orientation,
            cropData, heightToWidthRatio, widthToHeightRatio };

        console.log("resources: ", resources);
        console.log("resourceData: ", resourceData);

        saveResourceChanges(resources, resourceData, () => {
            saveArtworkChanges(artworkId, newArtworkData, () => {
                dispatch({
                    type: ARTWORK_CHANGE,
                    payload: { [artworkId]: rest }
                });

                if (callback) callback();
            });
        })
    }
}

// ADD ARTWORK
export function addArtwork(userId, artworkData, imgFile, callback) {
    return dispatch => {

        saveImage(userId, imgFile, 3000,
            progress => console.log("progress: ", progress)
            ,
            sourceUrl => {
                // save thumb
                saveImage(userId, imgFile, 250,
                    progress => console.log("Thumb progress: ", progress)
                    ,
                    thumbUrl => {

                        // save large image
                        saveImage(userId, imgFile, 960,
                            progress => console.log("large image progress: ", progress)
                            ,
                            largeUrl => {
                                const { orientation, cropData, heightToWidthRatio, widthToHeightRatio, ...rest } = artworkData;

                                const resourceData = {
                                    adminId: userId,
                                    largeUrl,
                                    sourceUrl,
                                    thumbUrl,
                                    orientation,
                                    cropData, heightToWidthRatio, widthToHeightRatio
                                };

                                // Save the resource first to get the Id.
                                saveNewResource(userId, resourceData, (resourceId) => {
                                    const newArtworkData = {
                                        ...rest,
                                        resources: resourceId,
                                        adminId: userId,
                                        dateAdded: Date.now()
                                    };

                                    // save the resource id in the artwork data.
                                    saveNewArtworkData(userId, newArtworkData, (artworkId) => {
                                        const newArtworkDataWithId = { ...newArtworkData, artworkId };

                                        dispatch({
                                            type: ARTWORK_CHANGE,
                                            payload: { [artworkId]: newArtworkDataWithId }
                                        });

                                        if (callback) callback(artworkId);
                                    });
                                })

                            });
                    });
            })
    }
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
}

function fs_saveArtworkImage(blobData, onChangeCallback, onCompleteCallback) {
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
}

// SAVE NEW RESOURCE
function saveNewResource(userId, resourceData, callback) {
    const resourceDatabaseRef = db.collection('resources').doc();
    const resourceId = resourceDatabaseRef.id;

    saveResourceChanges(resourceId, resourceData, callback);
}

// SAVE RESOURCE CHANGES
function saveResourceChanges(resourceId, newData, callback) {
    newData.lastUpdated = Date.now();

    db.collection('resources')
        .doc(resourceId)
        .set(newData, { merge: true })
        .then(() => {
            if (callback) callback(resourceId);
        })
        .catch(function (error) {
            console.log('Update resource failed: ', error);
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