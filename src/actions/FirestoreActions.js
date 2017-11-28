import * as fb from 'firebase';
import {
    auth,
    firestoreDb as db,
    storageRef as store,
    storageEvents
} from '../libs/firebaseConfig';

// TODO: haven't got rid of listeners anywhere, they "could" build up the data massively
// Could clear artist and artwork data when a new gallery is loaded in (clear the old data and listeners first)

// listener object - each listener is stored on it with a name matching the Action function
const unsubscribers = {};
unsubscribers.userListeners = {};
unsubscribers.userArtistListeners = {};
unsubscribers.userArtworkListeners = {};
unsubscribers.artistListeners = {};
unsubscribers.artistArtworkListeners = {};
unsubscribers.artworkListeners = {};

// UNSUBSCRIBE LISTENERS
function unsubscribAllListeners() {
    unsubscribeUserListeners();
    unsubscribeUserArtistListeners();
    unsubscribeUserArtworkListeners();
    unsubscribeArtistListeners();
    unsubscribeArtistArtworkListeners();
    unsubscribeArtworkListeners();
}

function unsubscribeUserListeners() {
    const userIds = Object.keys(unsubscribers.userListeners);
    for (let id of userIds) {
        unsubscribers.userListeners[id]();
    }
}

function unsubscribeUserArtistListeners() {
    const userIds = Object.keys(unsubscribers.userArtistListeners);
    for (let id of userIds) {
        unsubscribers.userArtistListeners[id]();
    }
}

function unsubscribeUserArtworkListeners() {
    const userIds = Object.keys(unsubscribers.userArtworkListeners);
    for (let id of userIds) {
        unsubscribers.userArtworkListeners[id]();
    }
}

function unsubscribeArtistListeners() {
    const artistIds = Object.keys(unsubscribers.artistListeners);
    for (let id of artistIds) {
        unsubscribers.artistListeners[id]();
    }
}

function unsubscribeArtistArtworkListeners() {
    const artistIds = Object.keys(unsubscribers.artistArtworkListeners);
    for (let id of artistIds) {
        unsubscribers.artistArtworkListeners[id]();
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

// UPDATE USER
export function fs_updateUser(userId, newData, onChangeCallback = null) {
    db.collection('users')
        .doc(userId)
        .update(newData)
        .then(() => {
            if (onChangeCallback) onChangeCallback({ [userId]: newData });
        })
        .catch(function (error) {
            console.log('Update user failed: ', error);
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

                fs_getUserArtworkChanges(userId);
            },
            error => {
                console.log("userId: ", userId);
                console.log("user listener error: ", error);
            });
}


//*** ARTIST ***********************************************************

// ADD ARTIST
export function fs_addNewArtist(newArtistData, onChangeCallback = null) {
    db.collection('artists')
        .add(newArtistData)
        .then((docRef) => {
            if (onChangeCallback) onChangeCallback(docRef.id);
        })
        .catch(function (error) {
            console.log('Add New Artist failed: ', error);
        })
}

// GET USER ARTIST CHANGES
export function fs_getUserArtistChanges(userId, onChangeCallback = null) {
    if (unsubscribers.userArtistListeners[userId]) {
        return;
    }

    unsubscribers.userArtistListeners[userId] = db.collection('artists')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;
                for (let change of changedDocsArr) {
                    const artistId = change.doc.id;
                    // the function itself will prevent multiple listeners
                    fs_getArtistChanges(artistId, onChangeCallback);

                    // find out if there'll be a new number of artists
                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                // if there's a different number of artists, update totalArtists
                if (docAddedOrDeleted) {
                    const totalArtists = querySnapshot.size;
                    fs_updateUser(userId, { totalArtists });
                }
            },
            error => {
                console.log("user artist listener error: ", error);
            })
}

// UPDATE ARTIST
export function fs_updateArtist(artistId, newData, onChangeCallback = null) {
    db.collection('artists')
        .doc(artistId)
        .update(newData)
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Update artist failed: ', error);
        })
}

// DELETE ARTIST
export function fs_deleteArtistAndArtworks(artistId, onCompleteCallback) {
    int_deleteArtistData(artistId, () => {
        // called here in case there are no artworks or one fails.
        onCompleteCallback();

        int_deleteArtistArtworks(artistId, () => {
            console.log("Artworks deleted for: ", artistId);
        });
    });

}

function int_deleteArtistData(artistId, onCompleteCallback) {
    db.collection('artists')
        .doc(artistId)
        .delete()
        .then(() => {
            if (onCompleteCallback) onCompleteCallback();
        })
        .catch(function (error) {
            console.log('delete artist data failed: ', error);
        })
}

// GET ARTIST CHANGES
export function fs_getArtistChanges(artistId, onChangeCallback = null) {
    if (!artistId) {
        console.log("no artistId: ", artistId);
        return;
    }

    if (unsubscribers.artistListeners[artistId]) return "already_running";

    unsubscribers.artistListeners[artistId] = db.collection('artists')
        .doc(artistId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    // TODO: should return something so ui can deal with this.
                    return;
                }

                const artistId = doc.id;
                const artistData = doc.data();
                const artistDataWithId = { ...artistData, artistId };

                if (onChangeCallback) onChangeCallback(artistDataWithId);
            },
            (error) => {
                console.log("artist listener error: ", error);
            });
}


//*** ARTWORK ***********************************************************

// ADD ARTWORK
export function fs_addArtwork(userId, artistId, imgFile, widthToHeightRatio, heightToWidthRatio, onChangeCallback = null) {
    // Get artwork database id first so can be used for the filename
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    int_saveImage(artworkId, artistId, imgFile, '',
        (onChangeData) => {
            if (onChangeCallback) onChangeCallback(onChangeData);
        },
        (onCompleteData) => {
            // Upload completed successfully - save artwork data
            const newArtworkData = {
                artistId,
                widthToHeightRatio,
                heightToWidthRatio,
                adminId: userId,
                url: onCompleteData.downloadURL,
                dateAdded: Date.now()
            };

            int_saveArtworkChanges(artworkId, newArtworkData, () => {
                onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
            });
        });
}

export function fs_addThumbnail(artworkId, artistId, thumbFile, onChangeCallback = null) {
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

// UPDATE ARTWORK
export function fs_updateArtworkArtist(artworkId, newArtistId, onChangeCallback = null) {
    const newArtworkData = { artistId: newArtistId };
    int_saveArtworkChanges(artworkId, newArtworkData, () => {
        onChangeCallback({ ...newArtworkData, status: 'complete', artworkId })
    });
}

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

// INTERNAL SAVE ARTWORK CHANGES
function int_saveArtworkChanges(artworkId, newData, onChangeCallback = null) {
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

// INTERNAL ARTWORK DATA
function int_saveImage(artworkId, artistId, blob, prefix, onChangeCallback, onCompleteCallback) {
    const fileName = prefix + artworkId;
    const userPicturesRef = store.child(`userContent/${artistId}/${fileName}`);
    // start the upload
    const uploadTask = userPicturesRef.put(blob);
    // listen for upload events
    uploadTask
        .on(storageEvents.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                onChangeCallback({ progress, artistId, id: artworkId, status: 'uploading' });
            },
            (error) => {
                // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
                console.log("uncaught error: ", error);
            },
            () => {
                onCompleteCallback({ downloadURL: uploadTask.snapshot.downloadURL });
            })
}

// GET ARTIST ARTWORK CHANGES
export function fs_getArtistArtworkChanges(artistId, userId, onChangeCallback = null) {
    if (unsubscribers.artistArtworkListeners[artistId]) {
        return;
    }

    unsubscribers.artistArtworkListeners[artistId] = db.collection('artworks')
        .where('artistId', '==', artistId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;

                for (let change of changedDocsArr) {
                    const artworkId = change.doc.id;
                    fs_getArtworkChanges(artworkId, onChangeCallback);

                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                // only attempts to update artist totals if there is a userId
                // however if userId doesn't match the artist adminId it'll fail
                if (userId) {
                    if (docAddedOrDeleted) {
                        const totalArtworks = querySnapshot.size;
                        fs_updateArtist(artistId, { totalArtworks });
                    }
                }
            },
            error => {
                console.log("Artist artwork listener error: ", error);
            })
}

// GET ARTWORK CHANGES
export function fs_getArtworkChanges(artworkId, onChangeCallback = null) {
    if (unsubscribers.artworkListeners[artworkId]) {
        return "already_running";
    }

    unsubscribers.artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    // TODO: should return something so ui can deal with this.
                    return;
                }

                const artworkId = doc.id;
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            },
            (error) => {
                console.log("artwork changes listener error: ", error);
            });
}

// GET USER ARTWORK CHANGES
export function fs_getUserArtworkChanges(userId) {
    if (unsubscribers.userArtworkListeners[userId]) {
        return "already_running";
    }

    unsubscribers.userArtworkListeners[userId] = db.collection('artworks')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;

                for (let change of changedDocsArr) {
                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                if (docAddedOrDeleted) {
                    const totalArtworks = querySnapshot.size;
                    fs_updateUser(userId, { totalArtworks });
                }
            },
            error => {
                console.log("user artworks listener error: ", error);
            })
}

// DELETE ARTWORK
export function fs_deleteArtwork(artworkId, artistId, onCompleteCallback = null) {
    int_deleteArtworkData(artworkId, () => {
        int_deleteImageFromStorage(artworkId, artistId, '', () => {
            if (onCompleteCallback) onCompleteCallback();
        });

        int_deleteImageFromStorage(artworkId, artistId, 'thumbnail_', () => {
            console.log("thumbnail image deleted ta");
        })
    })
}

function int_deleteImageFromStorage(artworkId, artistId, prefix, onCompleteCallback) {
    const fileName = prefix + artworkId;
    const imageRef = store.child(`userContent/${artistId}/${fileName}`);
    imageRef.delete()
        .then(() => {
            onCompleteCallback();
        })
        .catch(function (error) {
            console.log('Delete image failed: ', error);
        })
}

function int_deleteArtworkData(artworkId, onCompleteCallback) {
    db.collection('artworks')
        .doc(artworkId)
        .delete()
        .then(() => {
            if (onCompleteCallback) onCompleteCallback();
        })
        .catch(function (error) {
            console.log('delete artwork failed: ', error);
        })
}

// DELETE ARTIST'S ARTWORKS
function int_deleteArtistArtworks(artistId) {
    // find all artworks with the matching artistId
    db.collection('artworks')
        .where('artistId', '==', artistId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                fs_deleteArtwork(doc.id, artistId)
            })

        })
}
