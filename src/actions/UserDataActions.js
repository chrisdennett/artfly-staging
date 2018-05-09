// FB - Firestore actions
import {
    fs_getUserArtworkChanges,
    fs_addAuthListener,
    fs_signInWithProvider,
    fs_signOut,
    fs_addNewUser,
    fs_getUserChanges,
    fs_getArtworkChanges,
    fs_deleteArtwork,
    fs_deleteUser,
    fs_updateArtworkImage,
    fs_updateThumbnail,
    fs_getArtworkDataOnce,
    fs_updateArtwork,
    fs_saveArtworkImage, fs_saveNewArtworkData, fs_deleteArtworkImage
} from './FirestoreActions';
// helpers
import * as ImageHelper from "../app/global/ImageHelper";

export const USER_ARTWORKS_CHANGE = "userArtworksChange";
export const ARTWORK_CHANGE = "artworkChange";
export const ARTWORK_DELETED = 'artworkDeleted';
export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';
export const UPDATE_THUMBNAIL_COMPLETE = 'updateThumbnailComplete';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'addArtworkComplete';
export const THUMBNAIL_UPLOAD_PROGRESS = 'thumbnailUploadProgress';
export const ADD_THUMBNAIL_COMPLETE = 'addThumbnailComplete';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';
export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const SIGN_IN_USER = "signInUser";
export const SIGN_IN_USER_TRIGGERED = "signInUserTriggered";
export const SIGN_OUT_USER = "signOutUser";
export const DELETE_USER = "deleteUser";
export const NOTIFICATION = "notification";
export const NOTIFICATION_COMPLETE = "notification_complete";


// AUTH ************************************************************

// SIGN IN - with google
export function signInWithGoogle() {
    console.log("signInWithGoogle: ");

    return dispatch => {
        dispatch({
            type: SIGN_IN_USER_TRIGGERED,
            payload: { loginStatus: 'pending' }
        });

        fs_signInWithProvider('google', (user) => {
            dispatch({
                type: SIGN_IN_USER,
                payload: user
            });
        })
    }
}

// SIGN IN - with facebook
export function signInWithFacebook() {
    console.log("signInWithFacebook: ");
    return dispatch => {
        dispatch({
            type: SIGN_IN_USER_TRIGGERED,
            payload: { loginStatus: 'pending' }
        });

        fs_signInWithProvider('facebook', (user) => {
            dispatch({
                type: SIGN_IN_USER,
                payload: user
            });
        })
    }
}

// SIGN OUT
export function signOutUser() {
    return dispatch => {
        fs_signOut(() => {
            dispatch({
                type: SIGN_OUT_USER,
                payload: { status: 'none', loginStatus: 'loggedOut' }
            })
        })
    }
}


// USER ************************************************************

// ADD NEW USER
export function addNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const newUserData = {
            email: formValues.email
        };

        fs_addNewUser(authId, newUserData, () => {
            dispatch({
                type: CREATE_USER,
                payload: newUserData
            });

            if (callback) callback();
        });
    }
}

// LISTEN FOR USER DATA CHANGES
export function listenForUserChanges() {
    return (dispatch) => {
        dispatch({
            type: FETCH_USER,
            payload: { status: "pending" }
        });

        fs_addAuthListener((authData) => {
            if (authData) {
                dispatch({
                    type: FETCH_USER,
                    payload: { ...authData, status: "pending" }
                });

                fs_getUserChanges(authData.uid, (userData) => {
                    if (userData) {
                        dispatch({
                            type: FETCH_USER,
                            payload: { ...userData, status: "complete", loginStatus: 'loggedIn' }
                        });
                    }
                    else {
                        dispatch({
                            type: FETCH_USER,
                            payload: { status: "new", loginStatus: 'loggedIn' }
                        });
                    }
                });


            }
            else {
                dispatch({
                    type: FETCH_USER,
                    payload: { status: "none" }
                });
            }
        });
    }
}

// DELETE USER
// TODO: Currently this is just used to clear auth assuming the user has no other data
// Rename this or update so it deletes all data
export function deleteUser() {
    return dispatch => {
        fs_deleteUser(() => {
            dispatch({
                type: DELETE_USER,
                payload: "success"
            })
        })
    }
}

// ARTWORK ************************************************************

// LISTEN FOR ARTWORK DATA CHANGES
export function listenForUserArtworkChanges(userId) {
    return (dispatch) => {
        const timeStamp = Date.now();

        dispatch({
            type: NOTIFICATION,
            payload: { wording: 'Artwork is being loaded', timeStamp }
        });

        fs_getUserArtworkChanges(userId, (artworks) => {
            dispatch({
                type: USER_ARTWORKS_CHANGE,
                payload: artworks
            });

            dispatch({
                type: NOTIFICATION_COMPLETE,
                payload: { timeStamp }
            });
        })
    }
}

export function listenForArtworkChanges(artworkId, callback, errorCallback) {
    return (dispatch) => {
        fs_getArtworkChanges(artworkId, (artworkData) => {
            const dataWithId = { ...artworkData, artworkId };

            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: dataWithId }
            });
            if (callback) callback(dataWithId);

        }, () => {
            if (errorCallback) errorCallback(artworkId);
        })
    }
}

// Gets a single snapshot of the artwork data
export function getArtworkDataOnce(artworkId, callback, noDocCallback) {
    return dispatch => {

        fs_getArtworkDataOnce(artworkId, (artworkData) => {
            const dataWithId = { ...artworkData, artworkId };

            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: dataWithId }
            });
            if (callback) callback(dataWithId);
        }, () => {
            if (noDocCallback) noDocCallback();
        });
    }
}

export function clearImageUpload() {
    return dispatch => {
        dispatch({
            type: CLEAR_IMAGE_UPLOAD,
            payload: {}
        });
    }
}

/**
 *
 * @param userId
 * @param artworkData
 * @param imgFile
 * @param masterCanvas
 * @returns {Function}
 */
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
                            dispatch({
                                type: ARTWORK_CHANGE,
                                payload: { [artworkId]: newArtworkData }
                            });

                            if(callback) callback(artworkId);
                        });

                    });
            })
    }
}

const saveImage = (userId, source, maxSize, onProgress, onComplete) => {
    getImageBlob(source, maxSize, blobData => {
        fs_saveArtworkImage(
            blobData
            ,
            (progressData) => {
                if (onProgress) onProgress(progressData);
            }
            ,
            (url) => {
                console.log("url: ", url);
                if (onComplete) onComplete(url)
            }
        )
    });
};

const getImageBlob = (source, maxSize, callback) => {
    const canvas = document.createElement('canvas');

    ImageHelper.drawToCanvas({
        sourceCanvas: source,
        outputCanvas: canvas,
        maxOutputCanvasWidth: maxSize,
        maxOutputCanvasHeight: maxSize
    }, () => {

        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData)
        }, 'image/jpeg', 0.95);

    });
};

/*export function addArtwork(userId, imgFile, artworkData, callback = null) {
    return dispatch => {
        fs_addArtwork(userId, imgFile, artworkData, (uploadData) => {
            if (uploadData.status === 'uploading') {
                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: uploadData
                });
            }
            else if (uploadData.status === 'complete') {
                dispatch({
                    type: ADD_ARTWORK_COMPLETE,
                    payload: { progress: 100 }
                });

                if (callback) callback(uploadData);
            }
        });
    }
}*/

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

/*export function addThumbnail(artworkId, artistId, thumbFile, callback = null) {
    return dispatch => {
        fs_addThumbnail(artworkId, artistId, thumbFile, (uploadData) => {
            if (uploadData.status === 'uploading') {
                dispatch({
                    type: THUMBNAIL_UPLOAD_PROGRESS,
                    payload: uploadData
                });
            }
            else if (uploadData.status === 'complete') {
                dispatch({
                    type: ADD_THUMBNAIL_COMPLETE,
                    payload: { progress: 100 }
                });

                if (callback) callback(uploadData);
            }

        });
    }
}*/

export function updateArtworkImage(artworkId, artistId, newImg, widthToHeightRatio, heightToWidthRatio, callback = null) {
    return dispatch => {
        fs_updateArtworkImage(artworkId, artistId, newImg, widthToHeightRatio, heightToWidthRatio, (updateProgressData) => {
            dispatch({
                type: UPDATE_ARTWORK_COMPLETE,
                payload: updateProgressData
            });

            if (callback) callback(updateProgressData);
        })
    }
}

export function updateArtworkThumbnail(artworkId, artistId, newThumbImg, callback = null) {
    return dispatch => {
        fs_updateThumbnail(artworkId, artistId, newThumbImg, (updateProgressData) => {
            dispatch({
                type: UPDATE_THUMBNAIL_COMPLETE,
                payload: updateProgressData
            });

            if (callback) callback(updateProgressData);
        })
    }
}

// NOTIFICATIONS ONLY
export function sendNotification(wording, callback) {
    const timeStamp = Date.now();

    return dispatch => {
        dispatch({
            type: NOTIFICATION,
            payload: { wording, timeStamp }
        });

        callback(timeStamp)
    }
}

export function endNotification(timeStamp) {
    return dispatch => {
        dispatch({
            type: NOTIFICATION_COMPLETE,
            payload: { timeStamp }
        });
    }
}