import {
    firestoreDb as db
} from '../libs/firebaseConfig';

// listener object - each listener is stored on it with a name matching the Action function
let unsubscribeUserListener;

//*** USER ************************************************************
// ADD NEW USER
export function fs_addNewUser(authId, newUserData, onAddedCallback = null) {
    db.collection('users')
        .doc(authId)
        .set(newUserData)
        .then(() => {
            if (onAddedCallback) onAddedCallback(authId);
        })
        .catch(function (error) {
            console.log('Add new user failed: ', error);
        })
}

// UPDATE USER
export function fs_updateUser(authId, newUserData, onAddedCallback = null) {
    db.collection('users')
        .doc(authId)
        .set(newUserData, { merge: true })
        .then(() => {
            if (onAddedCallback) onAddedCallback(authId);
        })
        .catch(function (error) {
            console.log('Add new user failed: ', error);
        })
}



// GET USER LISTENER
export function fs_getUserChanges(userId, onChangeCallback = null) {

    if (!userId) {
        // stop listener if there is one and bail
        if(unsubscribeUserListener) unsubscribeUserListener();
        return;
    }

    unsubscribeUserListener = db.collection('users')
        .doc(userId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    if (onChangeCallback) onChangeCallback(null);
                    return;
                }

                if (onChangeCallback) onChangeCallback(doc.data());
            },
            error => {
                console.log("userId: ", userId);
                console.log("user listener error: ", error);
            });
}