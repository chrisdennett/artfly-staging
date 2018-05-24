import firebase from 'firebase/app';

import {
    auth,
    firestoreDb as db
} from '../libs/firebaseConfig';

/*[2018-04-29T08:01:00.438Z]  @firebase/firestore: Firestore (4.13.0):
The behavior for Date objects stored in Firestore is going to change
AND YOUR APP MAY BREAK.
    To hide this warning and ensure your app does not break, you need to add the
following code to your app before calling any other Cloud Firestore methods:

    const firestore = firebase.firestore();
const settings = {/!* your settings... *!/ timestampsInSnapshots: true};
firestore.settings(settings);

With this change, timestamps stored in Cloud Firestore will be read back as
Firebase Timestamp objects instead of as system Date objects. So you will also
need to update code expecting a Date to instead expect a Timestamp. For example:

    // Old:
    const date = snapshot.get('created_at');
// New:
const timestamp = snapshot.get('created_at');
const date = timestamp.toDate();

Please audit all existing usages of Date when you enable the new behavior. In a
future release, the behavior will change to the new behavior, so if you do not
    follow these steps, YOUR APP MAY BREAK.*/


// listener object - each listener is stored on it with a name matching the Action function
let unsubscribeUserListener;


//*** AUTH ************************************************************

// SIGN IN
export function fs_signInWithProvider(providerName, onChangeCallback = null) {
    let provider;
    if (providerName === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
    }
    else if (providerName === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    }
    else if (providerName === 'twitter') {
        provider = new firebase.auth.TwitterAuthProvider();
    }

    auth
        .signInWithPopup(provider)
        .then(result => {
            onChangeCallback(result.user);
        })
        .catch(error => {
            console.log("log in error: ", error);
        });
}

// SIGN OUT
export function fs_signOut(onChangeCallback = null) {
    // unsubscribeUserListeners();

    auth
        .signOut()
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch((error) => {
            console.log("sign out error: ", error);
        });
}

// ADD USER AUTH LISTENER
// const fbui = new firebaseui.auth.AuthUI(firebase.auth());

export function fs_addAuthListener(onChangeCallback = null) {
    auth
        .onAuthStateChanged((result) => {
            if (result) {
                const { photoURL, displayName, email, uid, providerData } = result;
                const signedInWith = providerData[0].providerId || null;

                if (onChangeCallback) onChangeCallback({ signedInWith, photoURL, displayName, email, uid });
            }
            else {
                if (onChangeCallback) onChangeCallback(null);
            }
        })
}

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