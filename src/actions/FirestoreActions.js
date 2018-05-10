import * as fb from 'firebase';
import {
    auth,
    firestoreDb as db,
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
const unsubscribers = {};
unsubscribers.userListeners = {};
unsubscribers.userArtworkListeners = {};
unsubscribers.artworkListeners = {};


// UNSUBSCRIBE LISTENERS
function unsubscribAllListeners() {
    unsubscribeUserListeners();
    unsubscribeUserArtworkListeners();
    unsubscribeArtworkListeners();
}

function unsubscribeUserListeners() {
    const userIds = Object.keys(unsubscribers.userListeners);
    for (let id of userIds) {
        unsubscribers.userListeners[id]();
    }
}

function unsubscribeUserArtworkListeners() {
    const userIds = Object.keys(unsubscribers.userArtworkListeners);
    for (let id of userIds) {
        unsubscribers.userArtworkListeners[id]();
    }
}

function unsubscribeArtworkListeners() {
    const artworkIds = Object.keys(unsubscribers.artworkListeners);
    for (let id of artworkIds) {
        unsubscribers.artworkListeners[id]();
    }
}

//*** AUTH ************************************************************

// SIGN IN
export function fs_signInWithProvider(providerName, onChangeCallback = null) {
    let provider;
    if (providerName === 'google') {
        provider = new fb.auth.GoogleAuthProvider();
    }
    else if (providerName === 'facebook') {
        provider = new fb.auth.FacebookAuthProvider();
    }

    auth
        .getRedirectResult()
        .then(result => {
            onChangeCallback(result.user);
        })
        .catch(error => {
            console.log("log in error: ", error);
        });

    auth.signInWithPopup(provider);
}

// SIGN OUT
export function fs_signOut(onChangeCallback = null) {
    unsubscribAllListeners();

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

// DELETE USER
// TODO: Currently this is just used to clear auth assuming the user has no other data
// Rename this or update so it deletes all data
export function fs_deleteUser(onDeletedCallback = null) {
    fb.auth().currentUser
        .delete()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch((error) => {
            console.log(error);
        });
}

// GET USER LISTENER
export function fs_getUserChanges(userId, onChangeCallback = null) {
    if (!userId) {
        return;
    }

    unsubscribers.userListeners[userId] = db.collection('users')
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

//*** ARTWORK ***********************************************************
// ADD ARTWORK

/*export function fs_addArtwork(userId, blobData, artworkData, onChangeCallback = null) {
    // Get artwork database id first so can be used for the filename
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    int_saveImage(artworkId, blobData, '',
        (onChangeData) => {
            if (onChangeCallback) onChangeCallback(onChangeData);
        },
        (onCompleteData) => {
            // Upload completed successfully - save artwork data
            const newArtworkData = {
                ...artworkData,
                adminId: userId,
                url: onCompleteData.downloadURL,
                dateAdded: Date.now()
            };

            int_saveArtworkChanges(artworkId, newArtworkData, () => {
                onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
            });
        });
}*/

/*export function fs_addThumbnail(artworkId, artistId, thumbBlobData, onChangeCallback = null) {
    int_saveImage(artworkId, thumbBlobData, 'thumbnail_',
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



// GET ARTWORK DATA ONCE
export function fs_getArtworkDataOnce(artworkId, onComplete = null, onNotFound = null) {

    console.log("artworkId: ", artworkId);

    const docRef = db.collection('artworks').doc(artworkId);

    docRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = { [artworkId]: artworkData };

                onComplete(artworkDataWithId);
            }
            else {
                // doc.data() will be undefined in this case
                if (onNotFound) onNotFound(artworkId);
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

// GET ARTWORK CHANGES
export function fs_getArtworkChanges(artworkId, onChangeCallback = null, onErrorCallback) {
    if (unsubscribers.artworkListeners[artworkId]) {
        return "already_running";
    }

    unsubscribers.artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    if (onErrorCallback) onErrorCallback();
                    return;
                }

                const artworkId = doc.id;
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            },
            (error) => {
                if (onErrorCallback) onErrorCallback(error);
                console.log("artwork changes listener error: ", error);
            });
}

// GET USER ARTWORK CHANGES
export function fs_getUserArtworkChanges(userId, callback) {
    if (!userId || unsubscribers.userArtworkListeners[userId]) {
        return "already_running";
    }

    unsubscribers.userArtworkListeners[userId] = db.collection('artworks')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {

                let userArtworks = {};

                querySnapshot.forEach(doc => {
                    const artworkId = doc.id;
                    const artworkData = doc.data();
                    const dataWithId = { ...artworkData, artworkId };
                    userArtworks[doc.id] = dataWithId;
                });

                if (callback) callback(userArtworks);
            },
            error => {
                console.log("user artworks listener error: ", error);
            })
}
