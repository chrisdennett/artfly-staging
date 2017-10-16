import firebase from '../libs/firebaseConfig';
// import * as fb from 'firebase';
//
import {
    removeAllFirebaseListeners,
    fb_addUserListener,
    fb_addUserAuthListener,
    addArtworkIdToFirebase,
    addArtworkToFirebase,
    addArtworkToFirebaseStorage,
    fb_addArtistListener,
    fb_addArtistArtworkIdsListener,
    fb_addArtworkListener,
    getFirebaseArtworkRef,
    fb_updateArtist,
    fb_signInWithProvider,
    fb_signOut,
    fb_addNewArtist,
    fb_addUserArtist,
    fb_addNewUser,
    fb_deleteUser, fb_deleteArtwork, fb_deleteAllArtistArtworkIds, fb_deleteArtistArtworkId, fbstore_deleteImage,
    fb_deleteArtist, fb_fetchArtistArtworkIdsOnce, fb_deleteUserArtist
} from "./FirebaseActions";

export const ARTWORK_CHANGE = "artworkChange";
export const ARTIST_CHANGE = "artistChange";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";
export const ARTIST_UPDATED = 'artistUpdated';
export const ARTIST_DELETED = 'artistDeleted';
export const ARTWORK_DELETED = 'artworkDeleted';
export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'artworkAdded';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';
export const CREATE_USER = 'create_user';
export const FETCH_USER = "fetchUser";
export const SIGN_IN_USER = "signInUser";
export const SIGN_IN_USER_TRIGGERED = "signInUserTriggered";
export const SIGN_OUT_USER = "signOutUser";
export const DELETE_USER = "deleteUser";
export const ADD_USER_ARTIST = 'addUserArtist';
export const CLEAR_USER_DATA = 'clearUserData';

/*
*** AUTH ************************************************************
*/

// SIGN IN - with google
export function signInWithGoogle() {
    return dispatch => {
        dispatch({
            type: SIGN_IN_USER_TRIGGERED,
            payload: { loginStatus: 'pending' }
        });

        fb_signInWithProvider('google', (user) => {
            dispatch({
                type: SIGN_IN_USER,
                payload: user
            });
        })
    }
}

// SIGN IN - with facebook
export function signInWithFacebook() {
    return dispatch => {
        dispatch({
            type: SIGN_IN_USER_TRIGGERED,
            payload: { loginStatus: 'pending' }
        });

        fb_signInWithProvider('facebook', (user) => {
            dispatch({
                type: SIGN_IN_USER,
                payload: user
            });
        })
    }
}

// SIGN OUT
export function signOutUser() {
    return dispatch => {
        fb_signOut(() => {
            firebase.auth().signOut().then(function () {
                removeAllFirebaseListeners(() => {
                    dispatch({
                        type: CLEAR_USER_DATA,
                        payload: ""
                    })
                });

                dispatch({
                    type: SIGN_OUT_USER,
                    payload: { status: 'none', loginStatus: 'loggedOut' }
                })
            })
        })
    }
}

/*
*** USER ************************************************************
*/

// ADD NEW USER
export function addNewUser(authId, formValues, callback = null) {
    return dispatch => {
        const newUserData = {
            email: formValues.email,
            artistIds: {}
        };

        fb_addNewUser(authId, newUserData, (userId) => {
            int_addArtist(userId, formValues, () => {
                dispatch({
                    type: CREATE_USER,
                    payload: newUserData
                });

                if (callback) callback();
            })
        });
        /*const artistRef = firebase.database().ref('/user-data/artists').push();
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
            );*/
    }
}

// LISTEN FOR USER DATA CHANGES
export function listenForUserChanges() {
    return (dispatch) => {
        dispatch({
            type: FETCH_USER,
            payload: { status: "pending" }
        });

        fb_addUserAuthListener((authData) => {
            if (authData) {
                dispatch({
                    type: FETCH_USER,
                    payload: { ...authData, status: "pending" }
                });

                fb_addUserListener(authData.uid, (userData) => {
                    if (userData) {
                        dispatch({
                            type: FETCH_USER,
                            payload: { ...userData, status: "complete", loginStatus: 'loggedIn' }
                        });
                    }
                    else{
                        dispatch({
                            type: FETCH_USER,
                            payload: { status: "new", loginStatus: 'loggedIn' }
                        });
                    }
                })
            }
            else {
                dispatch({
                    type: FETCH_USER,
                    payload: { status: "none" }
                });
            }
        });
    }
}

// DELETE USER
// TODO: Currently this is just used to clear auth assuming the user has no other data
// Rename this or update so it deletes all data
export function deleteUser() {
    return dispatch => {
        fb_deleteUser(() => {
            dispatch({
                type: DELETE_USER,
                payload: "success"
            })
        })
    }
}

/*
*** ARTIST ************************************************************
*/

// ADD NEW ARTIST
export function addNewArtist(userId, formValues, callback = null) {
    return dispatch => {
        int_addArtist(userId, formValues, dispatch, () => {
            if (callback) callback();
        })
    }
}

// ADD NEW ARTIST - INTERNAL FUNCTION SO CAN BE CALLED BY ADD NEW USER AS WELL
function int_addArtist(userId, formValues, dispatch, callback = null) {
    const newArtistData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        adminId: userId,
        totalArtworks: 0
    };

    const newUserArtistData = {
        totalArtworks: 0
    };

    fb_addNewArtist(newArtistData, (newArtistId) => {
        fb_addUserArtist(userId, newArtistId, newUserArtistData, () => {
            dispatch({
                type: ADD_USER_ARTIST,
                payload: { [newArtistId]: newUserArtistData }
            });

            if (callback) callback(newArtistId);
        })
    })
}

// UPDATE ARTIST
export function updateArtist(artistId, artistData, callback) {
    return dispatch => {
        fb_updateArtist(artistId, artistData, () => {
            dispatch({
                type: ARTIST_UPDATED,
                payload: artistData
            });

            if (callback) callback();
        });
    }
}

// DELETE ARTIST
export function deleteArtist(artistId, userId, callback) {
    return dispatch => {
        // delete the artist data
        fb_deleteArtist(artistId, () => {
            // delete the user-artist data
            fb_deleteUserArtist(userId, artistId, () => {
                // get references to all the artworks
                fb_fetchArtistArtworkIdsOnce(artistId, (artworkIds) => {
                    for (let id of Object.keys(artworkIds)) {
                        // the false here stops the artwork trying to delete a value from data that will have already been removed
                        deleteArtworkInternal(dispatch, id, artistId, userId);
                    }
                });

                if(callback) callback();
            })

        })

        /*const db = firebase.database();
        const artistRef = db.ref(`user-data/artists/${galleryArtistId}`);
        const artistArtworkIdsRef = db.ref(`user-data/artistArtworkIds/${galleryArtistId}`);
        const userArtistRef = db.ref(`user-data/users/${userId}/artistIds/${galleryArtistId}`);

        artistArtworkIdsRef
            .once('value')
            .then(snapshot => {
                const artworkIdObj = snapshot.val();
                if (artworkIdObj && snapshot.val()) {
                    const artworkIds = Object.keys(snapshot.val());
                    for (let id of artworkIds) {
                        // the false here stops the artwork trying to delete a value from data that will have already been removed
                        deleteArtworkInternal(dispatch, id, galleryArtistId, userId, false);
                    }
                }
            })
            .then(() => {
                // delete the artists artwork Id list
                artistArtworkIdsRef.remove();

                // delete the artist data
                artistRef.remove();

                // delete the reference to the artist in the user data
                userArtistRef.remove();

                dispatch({
                    type: ARTIST_DELETED,
                    payload: galleryArtistId
                });

                if (callback) callback();
            })*/
    }
}

// LISTEN FOR ARTIST DATA CHANGES
export function listenForArtistChanges(artistGalleryId) {
    return (dispatch) => {
        fb_addArtistListener(artistGalleryId, (artistData) => {
            dispatch({
                type: ARTIST_CHANGE,
                payload: { ...artistData, artistId: artistGalleryId }
            });
        })
    }
}

// LISTEN FOR ARTIST ARTWORK IDS DATA CHANGES
export function listenForArtistArtworkIdsChanges(artistGalleryId, callback) {
    return (dispatch, getState) => {
        fb_addArtistArtworkIdsListener(artistGalleryId, (artistArtworkIdsData, alreadyCached) => {
            if (alreadyCached && callback) {
                return getState().artistArtworkIds[artistGalleryId];
            }
            else {
                dispatch({
                    type: ARTIST_ARTWORK_IDS_CHANGE,
                    payload: { [artistGalleryId]: artistArtworkIdsData }
                });

                if (callback) callback(artistArtworkIdsData);
            }
        });
    }
}

/*
*** ARTWORK ************************************************************
*/

// LISTEN FOR ARTWORK DATA CHANGES
export function listenForArtworkChanges(artworkId) {
    return (dispatch) => {
        fb_addArtworkListener(artworkId, (artworkData) => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            });
        })
    }
}

export function deleteArtwork(artworkId, artistId, userId, callback = null) {
    return dispatch => {
        return deleteArtworkInternal(dispatch, artworkId, artistId, userId, callback);
    }
}

function deleteArtworkInternal(dispatch, artworkId, artistId, userId, callback = null) {
    fb_deleteArtwork(artworkId, () => {
        fbstore_deleteImage(userId, artworkId, () => {
            fb_deleteArtistArtworkId(artistId, artworkId, () => {
                dispatch({
                    type: ARTWORK_DELETED,
                    payload: artworkId
                });
                if (callback) callback();
            })
        })
    })

    /*const imageStorageRef = firebase.storage().ref();
    const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkId}`);
    const artworkDataRef = firebase.database().ref(`user-data/artworks/${artworkId}`);
    const artistArtworkIdRef = firebase.database().ref(`user-data/artistArtworkIds/${artistId}/${artworkId}`);

    userPicturesRef.delete()
        .then(() => {
            // delete artwork data
            artworkDataRef.remove()
                .then(() => {
                    // delete the artistArtworkId
                    if (removeArtistArtworkId) {
                        artistArtworkIdRef.remove()
                            .then(() => {
                                dispatch({
                                    type: ARTWORK_DELETED,
                                    payload: artworkId
                                });
                                console.log("artwork deleted > artworkId: ", artworkId);

                                if (callback) callback();
                            })
                    }
                    else {
                        dispatch({
                            type: ARTWORK_DELETED,
                            payload: artworkId
                        });
                        console.log("artwork deleted without IDS > artworkId: ", artworkId);

                        if (callback) callback();
                    }
                })

        })
        .catch(function (error) {
            console.log("ControlPanelActions > deleteArtwork > error: ", error);
        });*/
}

export function updateArtwork(artworkId, oldArtworkData, newArtworkData, callback) {
    return dispatch => {
        // get the current artwork data
        // get the artistId from the artwork data
        // use the artistId to remove connection in artistArtworkIds
        // set new artistId on artwork
        // add artworkId to the artistArtworkIds list for the correct artist

        const artworkRef = firebase.database().ref(`/user-data/artworks/${artworkId}`);
        if (newArtworkData.artistId && oldArtworkData.artistId !== newArtworkData.artistId) {
            const oldArtistArtworkIdsRef = firebase.database().ref(`/user-data/artistArtworkIds/${oldArtworkData.artistId}/${artworkId}`);
            const newArtistArtworkIdsRef = firebase.database().ref(`/user-data/artistArtworkIds/${newArtworkData.artistId}/${artworkId}`);

            newArtistArtworkIdsRef.set(oldArtworkData.dateAdded);
            oldArtistArtworkIdsRef.remove();
        }

        artworkRef.update(newArtworkData)
            .then(() => {
                    dispatch({
                        type: UPDATE_ARTWORK_COMPLETE,
                        payload: newArtworkData
                    });

                    if (callback) callback();
                }
            )
    }
}

export function clearImageUpload(callback = null) {
    return dispatch => {
        dispatch({
            type: CLEAR_IMAGE_UPLOAD,
            payload: {}
        });
    }
}

export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, artworkId = null, callback = null) {
    return dispatch => {
        // First get the database reference so the image can be named the same
        const artworkDatabaseRef = getFirebaseArtworkRef(artworkId);
        const artworkDatabaseKey = artworkDatabaseRef.key;

        // add the image to storage and dispatch progress events
        addArtworkToFirebaseStorage(imgFile, userId, artworkDatabaseKey, (uploadData) => {
            if (uploadData.status === 'uploading') {
                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: { artistId: artistId, id: artworkDatabaseKey, progress: uploadData.progress }
                });
            }
            else if (uploadData.status === 'complete') {
                const newArtworkData = {
                    adminId: userId,
                    artistId: artistId,
                    url: uploadData.downloadURL,
                    imgWidth: imgWidth,
                    imgHeight: imgHeight,
                    dateAdded: uploadData.dateStamp
                };

                // add artwork data to the database
                addArtworkToFirebase(artworkDatabaseRef, newArtworkData, () => {
                    // add artwork ID to the database
                    addArtworkIdToFirebase(artistId, artworkDatabaseKey, uploadData.dateStamp, userId, () => {
                        dispatch({
                            type: ADD_ARTWORK_COMPLETE,
                            payload: { progress: 100 }
                        });

                        if (callback) callback({ ...newArtworkData, artworkId: artworkDatabaseKey });
                    })
                });
            }
        });
    }
}