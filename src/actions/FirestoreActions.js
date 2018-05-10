import * as fb from 'firebase';
import {
    auth,
    firestoreDb as db,
    storageRef as store,
    storageEvents
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
export function fs_saveNewArtworkData(userId, newArtworkData, callback) {
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    int_saveArtworkChanges(artworkId, newArtworkData, () => {
        if (callback) callback(artworkId);
    });
}

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

// UPDATE ARTWORK
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

                    int_saveArtworkChanges(artworkId, newArtworkData, () => {
                        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
                    });
                });
        })
        .catch(function (error) {
            console.log('Update artwork failed: ', error);
        })
}

export function fs_updateThumbnail(artworkId, artistId, thumbFile, onChangeCallback = null) {
    int_saveImage(artworkId, artistId, thumbFile, 'thumbnail_',
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
}

export function fs_updateArtwork(artworkId, newArtworkData, onChangeCallback = null) {
    int_saveArtworkChanges(artworkId, newArtworkData, () => {
        onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
    });
}

// INTERNAL SAVE ARTWORK CHANGES
function int_saveArtworkChanges(artworkId, newData, onChangeCallback = null) {
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

export function fs_saveArtworkImage(blobData, onChangeCallback, onCompleteCallback) {
    int_saveImage(blobData,
        (progress) => {
            if (onChangeCallback) onChangeCallback(progress);
        },
        (downloadURL) => {
            // Upload completed successfully - return download url
            if (onCompleteCallback) onCompleteCallback(downloadURL);
        });
}

// INTERNAL ARTWORK DATA
function int_saveImage(blob, onChangeCallback, onCompleteCallback) {
    // generate random unique name
    const fileName = generateUUID();
    // create the reference
    const userPicturesRef = store.child(`userContent/${fileName}`);
    // start the upload
    const uploadTask = userPicturesRef.put(blob);
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

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

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
