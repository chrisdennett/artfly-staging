import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const FETCH_USER_AUTH = "fetchUserAuth";
export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
export const FETCH_ARTISTS = "fetchArtists";
export const ADD_NEW_ARTIST = 'addNewArtist';
export const CANCEL_ADD_ARTIST = 'cancelAddArtist';

export function addNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const userArtistRef = firebase.database().ref(`/user-data/users/${userId}/artists/${artistRef.key}`);

        userArtistRef
            .set('true')
            .then(
                artistRef
                    .set({ name: formValues.artistName, biog: formValues.biog })
                    .then(() => {
                        dispatch({
                            type: ADD_NEW_ARTIST,
                            payload: { [userArtistRef.key]: { name: formValues.artistName, biog: formValues.biog } }
                        });

                        if (callback) callback();
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed: ', error);
                    })
            );
    }
}

export function cancelAddArtist(callback = null) {
    return dispatch => {
        dispatch({
            type: CANCEL_ADD_ARTIST,
            payload: "cancel"
        });
        if (callback) callback();
    }
}

export function fetchArtists(artistList, callback) {
    return dispatch => {
        const keys = Object.keys(artistList);

        for (let i = 0; i < keys.length; i++) {
            firebase.database()
                .ref('/user-data/artists/' + keys[i])
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

export function createNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const userRef = firebase.database().ref(`/user-data/users/${authId}`);
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const galleryRef = firebase.database().ref('/user-data/galleries').push();
        const userArtistsObj = {};
        userArtistsObj[artistRef.key] = 'true';

        const newUserData = {
            email: formValues.email,
            galleryId: galleryRef.key,
            artists: userArtistsObj,
            curator: formValues.curator
        };

        // set the user data first, then add the gallery, then add the artist
        userRef
            .set(newUserData)
            .then(
                galleryRef
                    .set({
                        name: formValues.galleryName,
                        curatorId: authId,
                        curator: formValues.curator,
                        artists: userArtistsObj
                    })
            )
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
                        console.log('Synchronization failed: ', error);
                    })
            );
    }
}

export function loginUser() {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().signInWithRedirect(provider);

    return dispatch => {
        fb.auth()
            .getRedirectResult()
            .then(result => {
                dispatch({
                    type: LOGIN_USER,
                    payload: result.user
                })
            })
            .catch(error => {
                console.log("log in error: ", error);
            });
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
            .ref(`/user-data/users/${userAuthId}`)
            .on('value', (snapshot) => {
                dispatch({
                    type: FETCH_USER,
                    payload: snapshot.val()
                });

                if (callback) callback();
            })
    }
}