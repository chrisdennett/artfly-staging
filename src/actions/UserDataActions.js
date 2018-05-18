// FB - Firestore actions
import {
    fs_addAuthListener,
    fs_signInWithProvider,
    fs_signOut,
    fs_addNewUser,
    fs_getUserChanges,
    fs_deleteUser,
} from './FirestoreActions';


export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'addArtworkComplete';
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

// SIGN IN - with facebook
export function signInWithTwitter() {
    console.log("signInWithTwitter: ");
    return dispatch => {
        dispatch({
            type: SIGN_IN_USER_TRIGGERED,
            payload: { loginStatus: 'pending' }
        });

        fs_signInWithProvider('twitter', (user) => {
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
/*

export function clearImageUpload() {
    return dispatch => {
        dispatch({
            type: CLEAR_IMAGE_UPLOAD,
            payload: {}
        });
    }
}
*/

/*export function addArtwork(userId, artworkData, imgFile, masterCanvas, callback) {
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
};*/

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