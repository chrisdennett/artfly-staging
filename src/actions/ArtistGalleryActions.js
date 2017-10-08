import firebase from '../libs/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const NEW_GALLERY_COMING = "newGalleryComing";
export const FETCH_GALLERY = "fetchGallery";
export const ALREADY_CACHED = "alreadyCached";
export const ARTWORK_CHANGE = "artworkChange";
export const ARTIST_CHANGE = "artistChange";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";
export const FETCH_ARTWORK_ALREADY_CACHED = "fetchArtworkAlreadyCached";
export const ARTIST_UPDATED = 'artistUpdated';
export const ARTIST_DELETED = 'artistDeleted';
export const ARTWORK_DELETED = 'artworkDeleted';
// export const GALLERY_UPDATED = 'galleryUpdated';
export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'artworkAdded';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';

// let galleryListenersRef = [];
let artistListenersRef = [];
let artworkListenersRef = [];
let artistArtworkIdsListenersRef = [];

export function fetchArtist(artistGalleryId) {
    return (dispatch) => {
        if (artistListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
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
                let artistData = snapshot.val();
                // There'll be no data if the artist has just been deleted.
                if (artistData) {
                    artistData.artistId = snapshot.key;
                }

                dispatch({
                    type: ARTIST_CHANGE,
                    payload: { [artistGalleryId]: artistData }
                });

                // if the artist has been deleted stop listening for changes
                // I wasn't sure about this so I've commented it out - cjd - 17/08/2017
                /*if(!artistData){
                    libs.database().ref(`user-data/artists/${artistGalleryId}`).off();
                    console.log("remove listener");
                }*/
            });
    }
}

export function fetchArtistArtworkIds(artistGalleryId, callback =null) {
    return (dispatch) => {
        if (artistArtworkIdsListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            if(callback) callback();
            return;
        }

        // keep track of galleryIds that have had listeners attached
        artistArtworkIdsListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/artistArtworkIds/${artistGalleryId}`).off();

        firebase.database()
            .ref(`/user-data/artistArtworkIds/${artistGalleryId}`)
            .on('value', snapshot => {
                // const artistArtworkIds = !snapshot.val() ? {} : Object.keys(snapshot.val());
                const artistArtworkIds = snapshot.val();
                dispatch({
                    type: ARTIST_ARTWORK_IDS_CHANGE,
                    payload: { artistId:artistGalleryId, artworkIds:artistArtworkIds }
                });

                if(callback) callback(artistArtworkIds);
            });
    }
}

export function fetchArtwork(artworkId, callback) {
    return (dispatch) => {
        if (artworkListenersRef.indexOf(artworkId) >= 0) {
            dispatch({
                type: FETCH_ARTWORK_ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        artworkListenersRef.push(artworkId);

        // remove any listeners if there are already there (shouldn't be)
        firebase.database().ref(`user-data/artworks/${artworkId}`).off();

        firebase.database()
            .ref('user-data/artworks/' + artworkId)
            .on('value', snapshot => {
                const artworkId = snapshot.key;
                const artworkData = { ...snapshot.val(), id: artworkId };

                dispatch({
                    type: ARTWORK_CHANGE,
                    payload: { [artworkId]: artworkData }
                });

                if (callback) callback(artworkData);
            });
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
                    else{
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
        let artworkRef = '';
        if (artworkId) {
            // reference the image to update
            artworkRef = firebase.database().ref(`/user-data/artworks/${artworkId}`);
        }
        else {
            // Or create a new image ref in the database
            artworkRef = firebase.database().ref('/user-data/artworks').push();
        }

        // use the artwork key as the name for the artwork to ensure it is unique.
        const artworkName = artworkRef.key; // + "." + fileExtension;

        // trigger callback with artwork id so progress can be shown in calling component
        //if (callback) callback(artworkRef.key);

        // image storage
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkName}`);

        // store the image data
        const uploadTask = userPicturesRef.put(imgFile);

        // ensures the progress starts afresh
        dispatch({
            type: IMAGE_UPLOAD_PROGRESS,
            payload: { artistId: artistId, id: artworkRef.key, progress: 0 }
        });

        uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: { artistId: artistId, id: artworkRef.key, progress: progress }
                });

                /*switch (snapshot.state) {
                    case fb.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case fb.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                    default:
                        console.log("uncaught snapshot state: ", snapshot.state);
                }*/
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

                const newArtworkData = {
                    adminId: userId,
                    artistId: artistId,
                    url: uploadTask.snapshot.downloadURL,
                    imgWidth: imgWidth,
                    imgHeight: imgHeight,
                    dateAdded: dateStamp
                };

                // save artwork to database and add artwork to artistArtworkIds
                const artistArtworkIdsRef = firebase.database().ref(`/user-data/artistArtworkIds/${artistId}/${artworkRef.key}`);
                artworkRef
                    .set(newArtworkData)
                    .then(
                        artistArtworkIdsRef
                            .set(dateStamp)
                            .then(() => {
                                dispatch({
                                    type: ADD_ARTWORK_COMPLETE,
                                    payload: { progress:100 }
                                });

                                if (callback) callback({...newArtworkData, artworkId: artworkRef.key});
                            })
                            .catch(function (error) {
                                console.log('Synchronization failed', error);
                            })
                    );
            });

    }
}