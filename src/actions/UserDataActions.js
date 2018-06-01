// FB - Firestore actions
import {
    fs_updateUser
} from './FirestoreActions';

export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'addArtworkComplete';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';
export const USER_UPDATED = 'userUpdated';

export const NOTIFICATION = "notification";
export const NOTIFICATION_COMPLETE = "notification_complete";


// AUTH ************************************************************



// USER ************************************************************

// ADD NEW USER
/*export function addNewUser(authId, formValues, callback = null) {
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
}*/

export function updateUser(authId, newUserData, callback = null) {
    return dispatch => {
        fs_updateUser(authId, newUserData, () => {
            dispatch({
                type: USER_UPDATED,
                payload: newUserData
            });

            if (callback) callback();
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