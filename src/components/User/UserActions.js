import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
export const FETCH_USER_ARTISTS = "fetchUserArtists";
export const FETCH_USER_GALLERY = "fetchUserGallery";
export const ADD_USER_ARTIST = 'addUserArtist';
//TODO: Cancel doesn't feel right here - should this be local state only?
export const CANCEL_ADD_ARTIST = 'cancelAddArtist';

export function fetchUserData() {
    return dispatch => {
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
                                    payload: { ...userData, photoURL, displayName, email, uid }
                                });

                                // if user is set up fetch remaining data
                                // TODO: Need to set if there's already a listener set up for both of these
                                if (userData.artistIds) {
                                    fetchUserArtists(userData.artistIds, dispatch);
                                }
                                if (userData.galleryId) {
                                    fetchUserGallery(userData.galleryId, dispatch);
                                }
                            }
                            else {
                                // TODO: Need to add property isNewUser if no user data set up yet

                            }


                        })
                }
                // user not authorised or not logged in
                else {
                    dispatch({
                        type: FETCH_USER,
                        payload: null
                    });
                }

            })
    }
}

function fetchUserGallery(galleryId, dispatch) {
    firebase.database()
        .ref(`user-data/galleries/${galleryId}`)
        .on('value', snapshot => {
            dispatch({
                type: FETCH_USER_GALLERY,
                payload: snapshot.val()
            });
        })
}

function fetchUserArtists(artistList, dispatch) {
    const keys = Object.keys(artistList);
    for (let i = 0; i < keys.length; i++) {
        firebase.database()
            .ref('/user-data/artists/' + keys[i])
            .on('value', (snapshot) => {
                const artistId = snapshot.key;
                const artistData = snapshot.val();
                dispatch({
                    type: FETCH_USER_ARTISTS,
                    payload: { [artistId]: artistData }
                });

            })
    }
}


export function addNewArtist(userId, galleryId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const userArtistRef = firebase.database().ref(`/user-data/users/${userId}/artistIds/${artistRef.key}`);
        const galleryArtistRef = firebase.database().ref(`/user-data/galleries/${galleryId}/artistIds/${artistRef.key}`);

        userArtistRef.set('true')
            .then(galleryArtistRef.set('true'))
            .then(artistRef.set({ name: formValues.artistName, biog: formValues.biog })
                .then(() => {
                    dispatch({
                        type: ADD_USER_ARTIST,
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


export function createNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const userRef = firebase.database().ref(`/user-data/users/${authId}`);
        const artistRef = firebase.database().ref('/user-data/artistIds').push();
        const galleryRef = firebase.database().ref('/user-data/galleries').push();
        const userArtistsObj = {};
        userArtistsObj[artistRef.key] = 'true';

        const newUserData = {
            email: formValues.email,
            galleryId: galleryRef.key,
            artistIds: userArtistsObj,
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
                        artistIds: userArtistsObj
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