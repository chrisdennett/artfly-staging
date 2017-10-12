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

// FETCH USER AUTH
export function fetchFirebaseUserAuth(onChangeCallback = null) {
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
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
    }
    // The signed-in user info.
    const user = result.user;
}).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
});
*/

// FETCH USER DATA
export function fetchFirebaseUser(uid, onChangeCallback = null) {
    userListenerRef = uid;

    firebase.database()
        .ref(`/user-data/users/${uid}`)
        .on('value', (snapshot) => {
            if (onChangeCallback) onChangeCallback(snapshot.val());
        })
}

// ADD USER
// UPDATE USER
// DELETE USER

/*
*** ARTIST ***********************************************************
*/

// FETCH ARTIST
export function fetchFirebaseArtist(artistGalleryId, onChangeCallback = null) {
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
// UPDATE ARTIST
// DELETE ARTIST

/*
*** ARTWORK IDS *******************************************************
*/

// FETCH ARTIST-ARTWORK-IDS
export function fetchFirebaseArtistArtworkIds(artistGalleryId, onChangeCallback = null) {
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

// FETCH ARTWORK
export function fetchFirebaseArtwork(artworkId, onChangeCallback = null) {
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

