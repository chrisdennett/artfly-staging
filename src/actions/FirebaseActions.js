import firebase from '../libs/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

let userListenerRef = null;
let artistListenersRef = [];
let artistArtworkIdsListenersRef = [];
let artworkListenersRef = [];



/*
*** USER ************************************************************
*/

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

