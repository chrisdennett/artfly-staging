import firebase from '../../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";
export const ADD_USER_ARTIST = 'addUserArtist';

export function fetchUserData() {
    return (dispatch) => {
        dispatch({
            type: FETCH_USER,
            payload: { status: "pending" }
        });

        firebase.auth()
            .onAuthStateChanged((result) => {
                // if authorised (result is not null) get user data
                if (result) {
                    const { photoURL, displayName, email, uid } = result;
                    // "on" sets up a listener for user so this is called every time user data changes
                    firebase.database()
                        .ref(`/user-data/users/${uid}`)
                        .on('value', (snapshot) => {
                            const userData = snapshot.val();
                            // only include the data needed
                            if (userData) {
                                dispatch({
                                    type: FETCH_USER,
                                    payload: {
                                        ...userData,
                                        photoURL,
                                        displayName,
                                        email,
                                        uid,
                                        status: "complete"
                                    }
                                });
                            }
                            else {
                                // TODO: Figure out if I need to do something with this
                                dispatch({
                                    type: FETCH_USER,
                                    payload: {
                                        photoURL,
                                        displayName,
                                        email,
                                        uid,
                                        status: "new"
                                    }
                                });
                            }
                        })
                }
                // user not authorised or not logged in
                else {
                    dispatch({
                        type: FETCH_USER,
                        payload: { status: "none" }
                    });
                }

            })
    }
}

export function addNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const artistId = artistRef.key;
        // Artist gallery has the same id as the artist as they are inextricably linked.
        const userArtistRef = firebase.database().ref(`/user-data/users/${userId}/artistGalleryIds/${artistId}`);
        const artistGalleryRef = firebase.database().ref(`/user-data/galleries/${artistId}`);
        const galleryName = !formValues.galleryName ? `The amazing gallery of ${formValues.artistName}` : formValues.galleryName;

        const newArtistData = {
            name: formValues.artistName,
            biog: formValues.biog,
            adminId: userId
        };

        userArtistRef.set('true')
            .then(
                artistGalleryRef
                    .set({
                        type: "artistGallery",
                        name: galleryName,
                        adminId: userId
                    })
            )
            .then(artistRef.set(newArtistData)
                .then(() => {
                    dispatch({
                        type: ADD_USER_ARTIST,
                        payload: { [userArtistRef.key]: newArtistData }
                    });

                    if (callback) callback();
                })
                .catch(function (error) {
                    console.log('Synchronization failed: ', error);
                })
            );
    }
}

export function createNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const userRef = firebase.database().ref(`/user-data/users/${authId}`);
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const artistId = artistRef.key;
        // Artist gallery has the same id as the artist as they are inextricably linked.
        const artistGalleryRef = firebase.database().ref(`/user-data/galleries/${artistId}`);
        const userArtistsObj = {};
        userArtistsObj[artistId] = 'true';

        const newUserData = {
            email: formValues.email,
            artistGalleryIds: userArtistsObj
        };

        // set the user data first, then add the gallery, then add the artist
        userRef
            .set(newUserData)
            .then(
                artistGalleryRef
                    .set({
                        type: "artistGallery",
                        name: formValues.galleryName,
                        adminId: authId
                    })
            )
            .then(
                artistRef
                    .set({
                        name: formValues.artistName,
                        biog: "The artists' artist.",
                        artistGalleryId: artistGalleryRef.key,
                        adminId: authId
                    })
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
                });
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