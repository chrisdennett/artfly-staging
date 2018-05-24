// FB - Firestore actions
import {
    fs_addAuthListener,
    fs_signInWithProvider,
    fs_signOut,
    fs_addNewUser,
    fs_getUserChanges,
    fs_updateUser
} from './FirestoreActions';


export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'addArtworkComplete';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';
export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const SIGN_IN_USER = "signInUser";
export const SIGN_IN_USER_TRIGGERED = "signInUserTriggered";
export const SIGN_OUT_USER = "signOutUser";

export const NOTIFICATION = "notification";
export const NOTIFICATION_COMPLETE = "notification_complete";


// AUTH ************************************************************

// SIGN IN - with google
export function signInWithGoogle() {
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

export function updateUser(authId, newUserData, callback = null) {
    return dispatch => {
        fs_updateUser(authId, newUserData, () => {
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