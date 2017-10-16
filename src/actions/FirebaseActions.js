import firebase from '../libs/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

let userListenerRef = null;
let artistListenersRef = [];
let artistArtworkIdsListenersRef = [];
let artworkListenersRef = [];

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

    fb.auth()
        .getRedirectResult()
        .then(result => {
            onChangeCallback(result.user);
        })
        .catch(error => {
            console.log("log in error: ", error);
        });

    fb.auth().signInWithPopup(provider);
}

// SIGN OUT
export function fb_signOut(onChangeCallback = null) {
    firebase.auth()
        .signOut()
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch((error) => {
            console.log("sign out error: ", error);
        });
}

// ADD USER AUTH LISTENER
export function fb_addUserAuthListener(onChangeCallback = null) {
    firebase.auth()
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
/*export function fb_addNewUser(authId, newUserData, onAddedCallback = null) {
    const ref = firebase.database().ref(`/user-data/users/${authId}`);
    ref.set(newUserData)
        .then(() => {
            if (onAddedCallback) onAddedCallback(ref.key);
        })
        .catch(function (error) {
            console.log('Add New User failed: ', error);
        })
}*/

// ADD USER LISTENER
export function fb_addUserListener(userId, onChangeCallback = null) {
    userListenerRef = userId;

    firebase.database()
        .ref(`/user-data/users/${userId}`)
        .on('value', (snapshot) => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        })
}

// ADD USER ARTIST
export function fb_addUserArtist(userId, newArtistId, newUserArtistData, onChangeCallback = null) {
    const ref = firebase.database().ref(`user-data/users/${userId}/artistIds/${newArtistId}`)

    ref.set(newUserArtistData)
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Add User Artist failed: ', error);
        })
}

// DELETE USER ARTIST
export function fb_deleteUserArtist(userId, artistId, onChangeCallback = null) {
    const ref = firebase.database().ref(`user-data/users/${userId}/artistIds/${artistId}`)

    ref.remove()
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Delete User Artist failed: ', error);
        })
}

// DELETE USER
export function fb_deleteUser(onDeletedCallback = null) {
    fb.auth().currentUser
        .delete()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch((error) => {
            console.log(error);
        });
}

/*
*** ARTIST ***********************************************************
*/

// FETCH ARTIST
export function fb_addArtistListener(artistGalleryId, onChangeCallback = null) {
    if (artistListenersRef.indexOf(artistGalleryId) >= 0) {
        return;
    }
    // keep track of galleryIds that have had listeners attached
    artistListenersRef.push(artistGalleryId);

    // remove any listeners if there are already there (shouldn't be)
    firebase.database().ref(`user-data/artists/${artistGalleryId}`).off();

    // set up a listener for this artist
    firebase.database()
        .ref(`/user-data/artists/${artistGalleryId}`)
        .on('value', (snapshot) => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        });
}

// ADD ARTIST
/*export function fb_addNewArtist(newArtistData, onChangeCallback = null) {
    const ref = firebase.database().ref('/user-data/artists').push();
    ref.set(newArtistData)
        .then(() => {
            if (onChangeCallback) onChangeCallback(ref.key);
        })
        .catch(function (error) {
            console.log('Add New Artist failed: ', error);
        })
}*/

// UPDATE ARTIST
export function fb_updateArtist(artistId, artistData, onChangeCallback = null) {
    firebase.database()
        .ref(`user-data/artists/${artistId}`)
        .update({ ...artistData })
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('updateArtist failed: ', error);
        })
}

// DELETE ARTIST
export function fb_deleteArtist(artistId, onChangeCallback = null) {
    firebase.database()
        .ref(`user-data/artists/${artistId}`)
        .remove()
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Delete artist failed: ', error);
        })
}

/*
*** ARTWORK IDS *******************************************************
*/
// FETCH ARTIST-ARTWORK-IDS ONCE
export function fb_fetchArtistArtworkIdsOnce(artistId, onChangeCallback = null) {
    firebase.database()
        .ref(`/user-data/artistArtworkIds/${artistId}`)
        .once('value')
        .then(snapshot => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        })
        .catch(error => {
            console.log("error: ", error);
        })
}

// DELETE ALL ARTIST-ARTWORK-IDS
export function fb_deleteAllArtistArtworkIds(artistId, onDeletedCallback = null) {
    firebase.database()
        .ref(`user-data/artistArtworkIds/${artistId}`)
        .remove()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch(function (error) {
            console.log('Delete all artist-artwork-ids failed: ', error);
        })
}

// DELETE ARTIST-ARTWORK-ID
export function fb_deleteArtistArtworkId(artistId, artworkId, onDeletedCallback = null) {
    firebase.database()
        .ref(`user-data/artistArtworkIds/${artistId}/${artworkId}`)
        .remove()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch(function (error) {
            console.log('Delete artist-artwork-id failed: ', error);
        })
}

// ADD ARTIST-ARTWORK-IDS LISTENER
export function fb_addArtistArtworkIdsListener(artistGalleryId, onChangeCallback = null) {
    if (artistArtworkIdsListenersRef.indexOf(artistGalleryId) >= 0) {
        if (onChangeCallback) onChangeCallback(null, true);
    }

    // keep track of galleryIds that have had listeners attached
    artistArtworkIdsListenersRef.push(artistGalleryId);

    // remove any listeners if there are already there
    firebase.database().ref(`user-data/artistArtworkIds/${artistGalleryId}`).off();

    firebase.database()
        .ref(`/user-data/artistArtworkIds/${artistGalleryId}`)
        .on('value', (snapshot) => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        });
}

// ADD ARTIST-ARTWORK-IDS
// UPDATE ARTIST-ARTWORK-IDS
// DELETE ARTIST-ARTWORK-IDS

/*
*** ARTWORK ***********************************************************
*/

// ADD ARTWORK-ARTWORK-IDS LISTENER
export function fb_addArtworkListener(artworkId, onChangeCallback = null) {
    if (artworkListenersRef.indexOf(artworkId) >= 0) {
        return;
    }

    artworkListenersRef.push(artworkId);
    // remove any listeners if there are already there (shouldn't be)
    firebase.database().ref(`user-data/artworks/${artworkId}`).off();

    firebase.database()
        .ref('user-data/artworks/' + artworkId)
        .on('value', snapshot => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        });
}

// GET ARTWORK DATABASE REF
export function getFirebaseArtworkRef(artworkId = null) {
    let artworkRef = '';
    if (artworkId) {
        // reference the image to update
        artworkRef = firebase.database().ref(`/user-data/artworks/${artworkId}`);
    }
    else {
        // Or create a new image ref in the database
        artworkRef = firebase.database().ref('/user-data/artworks').push();
    }

    return artworkRef;
}

// ADD ARTWORK-FILE-TO-STORAGE
export function addArtworkToFirebaseStorage(imgFile, userId, artworkDatabaseKey, onChangeCallback = null) {
    // image storage
    const imageStorageRef = firebase.storage().ref();
    const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkDatabaseKey}`);
    const uploadTask = userPicturesRef.put(imgFile);

    // listen for upload events
    uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (onChangeCallback) onChangeCallback({ progress, status: 'uploading' })
        }, function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("storage/unauthorized");
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    console.log("storage/canceled");
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    console.log("storage/unknown");
                    break;
                default:
                    console.log("uncaught error: ", error);
            }
        }, function () {
            // Upload completed successfully - save artwork data
            const dateStamp = Date.now();
            if (onChangeCallback) onChangeCallback(
                {
                    progress: 100,
                    downloadURL: uploadTask.snapshot.downloadURL,
                    dateStamp,
                    status: 'complete'
                }
            )
        })
}

export function addArtworkIdToFirebase(artistId, artworkId, dateStamp, userId, onCompleteCallback = null) {
    const artistAllArtworkIdsRef = firebase.database().ref(`/user-data/artistArtworkIds/${artistId}`);
    const artistArtworkIdsRef = firebase.database().ref(`/user-data/artistArtworkIds/${artistId}/${artworkId}`);
    const artistTotalArtworksRef = firebase.database().ref(`/user-data/artists/${artistId}/totalArtworks`);
    const userArtistTotalArtworksRef = firebase.database().ref(`/user-data/users/${userId}/artistIds/${artistId}/totalArtworks`);

    artistAllArtworkIdsRef.once('value').then(snapshot => {
        const currentArtistArtworkIds = snapshot.val();
        const totalCurrentArtworks = currentArtistArtworkIds ? Object.keys(currentArtistArtworkIds).length : 0;
        const newTotalArtistArtworks = totalCurrentArtworks + 1;

        userArtistTotalArtworksRef
            .set(newTotalArtistArtworks)
            .then(() => {
                artistTotalArtworksRef.set(newTotalArtistArtworks)
            })
            .then(() => {
                artistArtworkIdsRef
                    .set(dateStamp)
                    .then(() => {
                        if (onCompleteCallback) onCompleteCallback();
                    })
                    .catch(function (error) {
                        console.log('addArtworkIdToFirebase failed', error);
                    });
            })
    });
}

// ADD ARTWORK
export function addArtworkToFirebase(artworkRef, newArtworkData, onCompleteCallback = null) {
    artworkRef
        .set(newArtworkData)
        .then(() => {
            if (onCompleteCallback) onCompleteCallback();
        })
        .catch(function (error) {
            console.log('addArtworkToFirebase failed', error);
        });
}

// UPDATE ARTWORK
// DELETE ARTWORK
export function fb_deleteArtwork(artworkId, onDeletedCallback = null) {
    firebase.database()
        .ref(`user-data/artworks/${artworkId}`)
        .remove()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch(function (error) {
            console.log('Delete artwork failed: ', error);
        })
}

// DELETE ARTWORK FROM STORAGE
export function fbstore_deleteImage(userId, artworkId, onDeletedCallback = null) {
    const imageStorageRef = firebase.storage().ref();
    const imageRef = imageStorageRef.child(`userContent/${userId}/${artworkId}`);

    imageRef.delete()
        .then(() => {
            if (onDeletedCallback) onDeletedCallback();
        })
        .catch(function (error) {
            console.log('Delete image failed: ', error);
        })
}


/*
*** UTILITIES **********************************************************
*/

// Remove all listeners
export function removeAllFirebaseListeners(onChangeCallback = null) {
    // user listener
    if (userListenerRef) {

    }

    // artist listeners
    for (let id of artistListenersRef) {
        firebase.database().ref(`user-data/artists/${id}`).off();
    }

    // artworkIds listeners
    for (let id of artistArtworkIdsListenersRef) {
        firebase.database().ref(`user-data/artistArtworkIds/${id}`).off();
    }

    // artwork listeners
    for (let id of artworkListenersRef) {
        firebase.database().ref(`user-data/artworks/${id}`).off();
    }

    artistListenersRef = [];
    artistArtworkIdsListenersRef = [];
    artworkListenersRef = [];

    if (onChangeCallback) onChangeCallback();
}

