import firebase from '../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const FETCH_USER_AUTH = "fetchUserAuth";
export const FETCH_USER = "fetchUser";
export const FETCH_ARTISTS = "fetchArtists";
export const FETCH_ARTWORK_KEYS = "fetchArtworkKeys";
export const FETCH_ARTWORKS = "fetchArtworks";
export const FETCH_ARTWORK = "fetchArtwork";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
export const CREATE_USER = 'create_user';
export const ADD_USER_ARTIST = 'create_artist';
export const CREATE_ARTWORK = 'createArtwork';
export const UPLOAD_IMAGE = 'uploadImage';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
// export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';
// export const DELETE_IMAGE_UPLOAD = 'deleteImageUpload';

export function createNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/artists').push();
        const userArtistRef = firebase.database().ref(`/users/${userId}/artists/${artistRef.key}`);

        userArtistRef
            .set('true')
            .then(
                artistRef
                    .set({ name: formValues.artistName, biog: formValues.biog })
                    .then(() => {
                        dispatch({
                            type: ADD_USER_ARTIST,
                            payload: { [userArtistRef.key]: { name: formValues.artistName, biog: formValues.biog } }
                        });

                        if (callback) callback();
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed');
                    })
            );
    }
}

export function createNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const userRef = firebase.database().ref(`/users/${authId}`);
        const artistRef = firebase.database().ref('/artists').push();
        const userArtistsObj = {};
        userArtistsObj[artistRef.key] = 'true';
        const newUserData = { ...formValues, artists: userArtistsObj };

        userRef
            .set(newUserData)
            .then(
                artistRef
                    .set({ name: formValues.artistName })
                    .then(() => {
                        dispatch({
                            type: CREATE_USER,
                            payload: newUserData
                        });

                        if (callback) callback();
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed');
                    })
            );
    }
}

export function loginUser() {
    const provider = new fb.auth.GoogleAuthProvider();

    return dispatch => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            dispatch({
                type: LOGIN_USER,
                payload: result
            })
        }).catch((error) => {
            console.log(error);
        });


       /* firebase.auth().signInWithPopup(provider).then(function (result) {
            dispatch({
                type: LOGIN_USER,
                payload: result
            })
        }).catch((error) => {
            console.log(error);
        });*/
    }
}

export function logoutUser() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            dispatch({
                type: LOGOUT_USER,
                payload: "success"
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}

export function fetchUserAuth(callback = null) {
    return dispatch => {
        firebase.auth()
            .onAuthStateChanged(function (result) {
                dispatch({
                    type: FETCH_USER_AUTH,
                    payload: result
                });
                if (callback) callback();
            })
    }
}

export function fetchUser(userAuthId, callback = null) {
    return dispatch => {
        firebase.database()
            .ref(`/users/${userAuthId}`)
            .on('value', (snapshot) => {
                dispatch({
                    type: FETCH_USER,
                    payload: snapshot.val()
                });

                if (callback) callback();
            })
    }
}

export function fetchArtists(artistList, callback) {
    return dispatch => {
        const keys = Object.keys(artistList);

        for (let i = 0; i < keys.length; i++) {
            firebase.database()
                .ref('/artists/' + keys[i])
                .on('value', (snapshot) => {
                    const artistId = snapshot.key;
                    const artistData = snapshot.val();

                    dispatch({
                        type: FETCH_ARTISTS,
                        payload: { [artistId]: artistData }
                    });

                    if (callback) callback();
                })
        }
    }
}

export function fetchArtworkKeys(artistId, callback) {
    return dispatch => {
        firebase.database()
            .ref(`/artistArtworks/${artistId}`)
            .once('value')
            .then(function (snapshot) {
                dispatch({
                    type: FETCH_ARTWORK_KEYS,
                    payload: snapshot.val()
                });

                if (callback) callback();
            })
    }
}

export function fetchArtworks(artworks, callback) {
    return dispatch => {
        // if the artist has not artworks this will come through as null
        if (!artworks) {
            dispatch({
                type: FETCH_ARTWORKS,
                payload: {}
            });

            if (callback) callback();
            return;
        }

        const keys = Object.keys(artworks);
        const totalToGet = keys.length;
        let promiseArray = [];

        for (let i = 0; i < totalToGet; i++) {
            let promise = firebase.database()
                .ref('/artworks/' + keys[i])
                .once('value')
                .then(function (snapshot) {
                    return snapshot;
                });
            promiseArray.push(promise);
        }

        fb.Promise.all(promiseArray).then((values) => {
            let returnedArtworks = {}, key, value, snapshot;
            for (let j = 0; j < values.length; j++) {
                snapshot = values[j];
                key = snapshot.key;
                value = snapshot.val();
                returnedArtworks[key] = value;
            }

            dispatch({
                type: FETCH_ARTWORKS,
                payload: returnedArtworks
            });

            if (callback) callback();
        });
    }
}

export function fetchArtwork(artworkId, callback = null) {
    return dispatch => {
        firebase.database()
            .ref(`/artworks/${artworkId}`)
            .once('value')
            .then(function (snapshot) {
                dispatch({
                    type: FETCH_ARTWORK,
                    payload: snapshot.val()
                });
                if (callback) callback();
            })
    }
}

export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null) {
    return dispatch => {
        // Create a new image ref in the database
        const artworkRef = firebase.database().ref('/artworks').push();
        // use the artwork key as the name for the artwork to ensure it is unique.
        const artworkName = artworkRef.key;

        // image storage
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkName}`);
        const uploadTask = userPicturesRef.put(imgFile);

        uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: progress
                });

                switch (snapshot.state) {
                    case fb.storage.TaskState.PAUSED:   console.log('Upload is paused');    break;
                    case fb.storage.TaskState.RUNNING:  console.log('Upload is running');   break;
                    default: console.log("uncaught snapshot state: ", snapshot.state);
                }
            }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default: console.log("uncaught error: ", error);
                }
            }, function() {
                // Upload completed successfully - save artwork data
                const dateStamp = Date.now();
                const newArtworkData = {
                    owner: userId,
                    artist: artistId,
                    imgRef: artworkRef.key,
                    url: uploadTask.snapshot.downloadURL,
                    imgWidth: imgWidth,
                    imgHeight: imgHeight,
                    dateAdded: dateStamp
                };

                // save artwork to database and add artwork to artistArtworks
                const artistArtworksRef = firebase.database().ref(`artistArtworks/${artistId}/${artworkRef.key}`);
                artworkRef
                    .set(newArtworkData)
                    .then(
                        artistArtworksRef
                            .set('true')
                            .then(() => {
                                dispatch({
                                    type: UPLOAD_IMAGE,
                                    payload: { [artworkRef.key]: newArtworkData }
                                });

                                if (callback) callback();
                            })
                            .catch(function (error) {
                                console.log('Synchronization failed', error);
                            })
                    );
            });

    }
}

export function createNewArtwork(artistId, artData, callback = null) {
    return dispatch => {
        const artworkRef = firebase.database().ref('/artworks').push();
        const artistArtworksRef = firebase.database().ref(`/artistArtworks/${artistId}/${artworkRef.key}`);

        artistArtworksRef
            .set('true')
            .then(
                artworkRef
                    .set(artData, () => {
                        dispatch({
                            type: CREATE_ARTWORK,
                            payload: { [artworkRef.key]: artData }
                        });

                        if (callback) callback(artworkRef.key);
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed');
                    })
            );
    }
}
