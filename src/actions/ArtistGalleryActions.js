import firebase from '../libs/firebaseConfig';
//
import {
    addArtworkIdToFirebase,
    addArtworkToFirebase,
    addArtworkToFirebaseStorage, fetchFirebaseArtist, fetchFirebaseArtistArtworkIds,
    fetchFirebaseArtwork, getFirebaseArtworkRef
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


export function fetchArtist(artistGalleryId) {
    return (dispatch) => {
        fetchFirebaseArtist(artistGalleryId, (artistData) => {
            dispatch({
                type: ARTIST_CHANGE,
                payload: { ...artistData, artistId: artistGalleryId }
            });
        })
    }
}

export function fetchArtistArtworkIds(artistGalleryId, callback) {
    return (dispatch, getState) => {
        fetchFirebaseArtistArtworkIds(artistGalleryId, (artistArtworkIdsData, alreadyCached) => {
            if (alreadyCached && callback) {
                return getState().artistArtworkIds[artistGalleryId];
            }
            else {
                dispatch({
                    type: ARTIST_ARTWORK_IDS_CHANGE,
                    payload: {[artistGalleryId]:artistArtworkIdsData}
                });

                if (callback) callback(artistArtworkIdsData);
            }
        });
    }
}

export function fetchArtwork(artworkId) {
    return (dispatch) => {
        fetchFirebaseArtwork(artworkId, (artworkData) => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            });
        })
    }
}

export function updateArtist(artistId, artistData, callback) {
    return dispatch => {
        const artistRef = firebase.database().ref(`user-data/artists/${artistId}`);
        artistRef.update({ ...artistData })
            .then(() => {
                dispatch({
                    type: ARTIST_UPDATED,
                    payload: artistData
                });

                if (callback) callback();
            })
            .catch(function (error) {
                console.log('updateArtist failed: ', error);
            })
    }
}

export function deleteArtist(galleryArtistId, userId, callback) {
    return dispatch => {

        const db = firebase.database();
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
            })
    }
}

export function deleteArtwork(artworkId, artistId, userId, callback = null) {
    return dispatch => {
        return deleteArtworkInternal(dispatch, artworkId, artistId, userId, true, callback);
    }
}

//FIREBASE WARNING: set at /user-data/artistArtworkIds/-Krkn6kFuQ5hAoHzqbVW/-KrknUmy5jSKrV24i1fN failed: permission_denied
//Uncaught (in promise) Error: PERMISSION_DENIED: Permission denied
function deleteArtworkInternal(dispatch, artworkId, artistId, userId, removeArtistArtworkId = true, callback = null) {
    // delete image in storage
    const imageStorageRef = firebase.storage().ref();
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
        });
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