import firebase from '../libs/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const LOGIN_USER = "loginUser";
export const LOGOUT_USER = "logoutUser";
export const DELETE_USER = "deleteUser";
export const ADD_USER_ARTIST = 'addUserArtist';

export function fetchUserData(callback) {
    return (dispatch) => {
        dispatch({
            type: FETCH_USER,
            payload: { status: "pending" }
        });

        firebase.auth()
            .onAuthStateChanged((result) => {
                // if authorised (result is not null) get user data
                if (result) {
                    let userData = null;
                    const { photoURL, displayName, email, uid, providerData } = result;
                    const signedInWith = providerData[0].providerId || null;
                    // "on" sets up a listener for user so this is called every time user data changes
                    firebase.database()
                        .ref(`/user-data/users/${uid}`)
                        .on('value', (snapshot) => {
                            userData = snapshot.val();
                            // only include the data needed
                            if (userData) {
                                dispatch({
                                    type: FETCH_USER,
                                    payload: {
                                        ...userData,
                                        signedInWith,
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
                                        signedInWith,
                                        photoURL,
                                        displayName,
                                        email,
                                        uid,
                                        status: "new"
                                    }
                                });
                            }

                            // not user
                            if(callback) callback(userData);
                        })
                }
                // user not authorised or not logged in
                else {
                    dispatch({
                        type: FETCH_USER,
                        payload: { status: "none" }
                    });

                    if(callback) callback(null);
                }

            })
    }
}

export function addNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        const artistRef = firebase.database().ref('/user-data/artists').push();
        const artistId = artistRef.key;
        // Artist gallery has the same id as the artist as they are inextricably linked.
        const userArtistRef = firebase.database().ref(`/user-data/users/${userId}/artistIds/${artistId}`);

        const newArtistData = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            adminId: userId
        };

        userArtistRef.set('true')
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
        const userArtistsObj = {};
        userArtistsObj[artistId] = 'true';

        const newUserData = {
            email: formValues.email,
            artistIds: userArtistsObj
        };

        // set the user data first, then add the gallery, then add the artist
        userRef
            .set(newUserData)
            .then(
                artistRef
                    .set({
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
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

export function loginWithGoogle() {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().signInWithPopup(provider);

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

export function loginWithFacebook() {
    const provider = new fb.auth.FacebookAuthProvider();
    fb.auth().signInWithPopup(provider);

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

export function logoutUser(user) {
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

// TODO: Currently this is just used to clear auth assuming the user has no other data
// Rename this or update so it deletes all data
export function deleteUser() {
    return dispatch => {
        fb.auth().currentUser.delete().then(function () {
            dispatch({
                type: DELETE_USER,
                payload: "success"
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}