import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

import { fetchGalleryUsingID } from '../Gallery/GalleryActions';

export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
// export const FETCH_USER_ARTISTS = "fetchUserArtists";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";
// export const FETCH_USER_GALLERY = "fetchUserGallery";
export const ADD_USER_ARTIST = 'addUserArtist';
//TODO: Cancel doesn't feel right here - should this be local state only?
export const CANCEL_ADD_ARTIST = 'cancelAddArtist';
// export const GALLERY_UPDATED = 'galleryUpdated'; // also is this used or needed?

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

                                // if user is set up fetch remaining data
                                // TODO: Need to set if there's already a listener set up for both of these
                                if (userData.artistIds) {
                                    const artistIds = Object.keys(userData.artistIds);
                                    fetchUserArtists(artistIds, dispatch);
                                    // fetchArtistsArtworkIds(artistIds, dispatch)
                                }
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

function fetchUserArtists(artistIds, dispatch) {
    for (let i = 0; i < artistIds.length; i++) {
        firebase.database()
            .ref('/user-data/artists/' + artistIds[i])
            .on('value', (snapshot) => {
                // const artistId = snapshot.key;
                const artistData = snapshot.val();
                const artistGalleryId = artistData.artistGalleryId;

                // This has been imported from gallery actions.
                fetchGalleryUsingID(artistGalleryId, dispatch);

                /*dispatch({
                    type: FETCH_USER_ARTISTS,
                    payload: { [artistId]: artistData }
                });*/
            })
    }
}

/*export function updateGallery(galleryId, galleryName, callback = null) {
    return dispatch => {
        const galleryRef = firebase.database().ref(`user-data/galleries/${galleryId}`);
        galleryRef.update({ name: galleryName })
            .then(() => {
                dispatch({
                    type: GALLERY_UPDATED,
                    payload: { name: galleryName }
                });

                if (callback) callback();
            })
            .catch(function (error) {
                console.log('updateGallery failed: ', error);
            })
    }
}*/

export function addNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const userArtistRef = firebase.database().ref(`/user-data/users/${userId}/artistIds/${artistRef.key}`);
        const galleryRef = firebase.database().ref('/user-data/galleries').push();
        const galleryName = !formValues.galleryName ? `The amazing gallery of ${formValues.artistName}` : formValues.galleryName;

        const newArtistData = {
            name: formValues.artistName,
            biog: formValues.biog,
            artistGalleryId: galleryRef.key,
            adminId: userId
        };

        userArtistRef.set('true')
            .then(
                galleryRef
                    .set({
                        name: galleryName,
                        artistIds: {[artistRef.key]:true},
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

export function cancelAddArtist(callback = null) {
    return dispatch => {
        dispatch({
            type: CANCEL_ADD_ARTIST,
            payload: "cancel"
        });
        if (callback) callback();
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
            artistIds: userArtistsObj
        };

        // set the user data first, then add the gallery, then add the artist
        userRef
            .set(newUserData)
            .then(
                galleryRef
                    .set({
                        name: formValues.galleryName,
                        artistIds: userArtistsObj,
                        adminId: authId
                    })
            )
            .then(
                artistRef
                    .set({
                        name: formValues.artistName,
                        biog: "The artists' artist.",
                        artistGalleryId: galleryRef.key,
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