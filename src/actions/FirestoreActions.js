import * as fb from 'firebase';
import {
    auth,
    firestoreDb as db,
    storageRef as store,
    storageEvents
} from '../libs/firebaseConfig';

/*
*** AUTH ************************************************************
*/

// SIGN IN
export function fb_signInWithProvider(providerName, onChangeCallback = null) {
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
export function fb_signOut(onChangeCallback = null) {
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
export function fb_addAuthListener(onChangeCallback = null) {
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

/*
*** USER ************************************************************
*/

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

// GET USER LISTENER
export function fs_getUserChanges(userId, onChangeCallback = null) {
    db.collection('users')
        .doc(userId)
        .onSnapshot(doc => {
                if (onChangeCallback) onChangeCallback(doc.data());
            },
            error => {
                console.log("user listener error: ", error);
            });

    fs_getUserArtworkChanges(userId);
}

/*
*** ARTIST ***********************************************************
*/

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
    db.collection('artists')
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
let artistListeners = {};

export function fs_getArtistChanges(artistId, onChangeCallback = null) {
    if (!artistId) {
        console.log("no artistId: ", artistId);
        return;
    }

    if (artistListeners[artistId]) return "already_running";

    artistListeners[artistId] = db.collection('artists')
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

/*
*** ARTWORK ***********************************************************
*/

// ADD ARTWORK
export function fs_addArtwork(userId, artistId, imgFile, imgWidth, imgHeight, onChangeCallback = null) {
    // Get artwork database id first so can be used for the filename
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;

    int_saveImageChanges(artworkId, artistId, imgFile,
        (onChangeData) => {
            if (onChangeCallback) onChangeCallback(onChangeData);
        },
        (onCompleteData) => {
            // Upload completed successfully - save artwork data
            const newArtworkData = {
                artistId,
                imgWidth,
                imgHeight,
                adminId: userId,
                url: onCompleteData.downloadURL,
                dateAdded: Date.now()
            };

            int_saveArtworkChanges(artworkId, newArtworkData, () => {
                onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
            });
        });
}

// UPDATE ARTWORK
export function fs_updateArtwork(artworkId, currentArtistId, newArtistId, newImage, newWidth, newHeight, onChangeCallback = null) {
    // only overwrite the image if it has changed
    if (newImage) {
        const artistId = newArtistId ? newArtistId : currentArtistId;

        int_saveImageChanges(artworkId, artistId, newImage,
            (onChangeData) => {
                if (onChangeCallback) onChangeCallback(onChangeData);
            },
            (onCompleteData) => {
                // Upload completed successfully - save artwork data
                let newArtworkData = {
                    imgWidth: newWidth,
                    imgHeight: newHeight,
                    url: onCompleteData.downloadURL,
                };
                if (newArtistId) newArtworkData.artistId = newArtistId;

                int_saveArtworkChanges(artworkId, newArtworkData, null, () => {
                    onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
                });
            });
    }
    // If the image hasn't changed, just update the artwork data
    else if (newArtistId) {
        const newArtworkData = { artistId: newArtistId };
        int_saveArtworkChanges(artworkId, newArtworkData, () => {
            onChangeCallback({ ...newArtworkData, progress: 100, status: 'complete', artworkId })
        });
    }

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
function int_saveImageChanges(artworkId, artistId, imgFile, onChangeCallback, onCompleteCallback) {
    const userPicturesRef = store.child(`userContent/${artistId}/${artworkId}`);
    // start the upload
    const uploadTask = userPicturesRef.put(imgFile);
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
export function fs_getArtistArtworkChanges(artistId, onChangeCallback = null) {
    db.collection('artworks')
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

                // if an artwork has been added or removed save the new total
                if (docAddedOrDeleted) {
                    const totalArtworks = querySnapshot.size;
                    fs_updateArtist(artistId, { totalArtworks });
                }
            },
            error => {
                console.log("Artist artwork listener error: ", error);
            })
}

// GET ARTWORK CHANGES
let artworkListeners = {};

export function fs_getArtworkChanges(artworkId, onChangeCallback = null) {
    if (artworkListeners[artworkId]) {
        return "already_running";
    }

    artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    // TODO: should return something so ui can deal with this.
                    return;
                }

                const artworkId = doc.id;
                const artworkData = doc.data();
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            },
            (error) => {
                console.log("artwork changes listener error: ", error);
            });
}

// GET USER ARTWORK CHANGES
let userArtworkListeners = {};

export function fs_getUserArtworkChanges(userId) {
    if (userArtworkListeners[userId]) {
        return "already_running";
    }

    userArtworkListeners[userId] = db.collection('artworks')
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
        int_deleteImageFromStorage(artworkId, artistId, () => {
            if (onCompleteCallback) onCompleteCallback();
        })
    })
}

function int_deleteImageFromStorage(artworkId, artistId, onCompleteCallback) {
    const imageRef = store.child(`userContent/${artistId}/${artworkId}`);
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
function int_deleteArtistArtworks(artistId, onCompleteCallback) {
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
