import firebase from '../firebase/firebaseConfig';
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
export const GALLERY_UPDATED = 'galleryUpdated';
export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'artworkAdded';
export const CLEAR_IMAGE_UPLOAD = 'clearImageUpload';

let galleryListenersRef = [];
let artistListenersRef = [];
let artworkListenersRef = [];
let artistArtworkIdsListenersRef = [];

export function fetchGallery(artistGalleryId) {
    return (dispatch) => {

        if (galleryListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        galleryListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/galleries/${artistGalleryId}`).off();

        // set up a listener for this gallery
        firebase.database()
            .ref(`user-data/galleries/${artistGalleryId}`)
            .on('value', snapshot => {
                const galleryData = snapshot.val();
                dispatch({
                    type: FETCH_GALLERY,
                    payload: { [artistGalleryId]: galleryData }
                });
            });
    }
}

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
                artistData.artistId = snapshot.key;

                dispatch({
                    type: ARTIST_CHANGE,
                    payload: { [artistGalleryId]: artistData }
                });
            });
    }
}

export function fetchGalleryArtistArtworkIds(artistGalleryId) {
    return (dispatch) => {
        if (artistArtworkIdsListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        artistArtworkIdsListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/artistArtworkIds/${artistGalleryId}`).off();

        firebase.database()
            .ref(`/user-data/artistArtworkIds/${artistGalleryId}`)
            .on('value', snapshot => {
                const artistArtworkIdsData = !snapshot.val() ? {} : snapshot.val();

                dispatch({
                    type: ARTIST_ARTWORK_IDS_CHANGE,
                    payload: { [artistGalleryId]: artistArtworkIdsData }
                });
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

export function updateGallery(galleryId, newGalleryData, callback) {
    return dispatch => {
        const artistRef = firebase.database().ref(`user-data/galleries/${galleryId}`);
        artistRef.update({ ...newGalleryData })
            .then(() => {
                dispatch({
                    type: GALLERY_UPDATED,
                    payload: newGalleryData
                });

                if (callback) callback();
            })
            .catch(function (error) {
                console.log('updateGallery failed: ', error);
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
        const userArtistRef = db.ref(`user-data/users/${userId}/artistGalleryIds/${galleryArtistId}`);
        const galleryArtistRef = db.ref(`user-data/galleries/${galleryArtistId}`);

        artistArtworkIdsRef
            .once('value')
            .then(snapshot => {
                const artworkIdObj = snapshot.val();
                if (artworkIdObj && snapshot.val()) {
                    const artworkIds = Object.keys(snapshot.val());
                    for (let id of artworkIds) {
                        deleteArtwork(id, userId, dispatch);
                    }
                }

                // delete the artist data
                artistRef.remove();
                // delete the artists artwork Id list
                artistArtworkIdsRef.remove();
                // delete the reference to the artist in the user data
                userArtistRef.remove();
                // delete the artist gallery
                galleryArtistRef.remove();

                dispatch({
                    type: ARTIST_DELETED,
                    payload: galleryArtistId
                });

                if (callback) callback();
            });
    }
}

function deleteArtwork(artworkId, userId, dispatch) {
    // delete image in storage
    const imageStorageRef = firebase.storage().ref();
    console.log("imageStorageRef: ", imageStorageRef);
    const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkId}`);
    console.log("userPicturesRef: ", userPicturesRef);
    userPicturesRef.delete().then(() => {

        // delete artwork data
        const artworkDataRef = firebase.database().ref(`user-data/artworks/${artworkId}`);
        console.log("artworkDataRef: ", artworkDataRef);
        artworkDataRef.remove();
        console.log("artworkDataRef: AFTER");

        dispatch({
            type: ARTWORK_DELETED,
            payload: artworkId
        });

    }).catch(function (error) {
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

            newArtistArtworkIdsRef.set('true');
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

//                          cropImg, uid,  selectedArtistId, width, height, rotation)
export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, artworkId = null, callback = null) {
    return dispatch => {
        let artworkRef = '';
        if (artworkId) {
            // reference the image to update
            artworkRef = firebase.database().ref(`/user-data/artworks/${artworkId}`);
            console.log("artworkRef: ", artworkRef);
        }
        else {
            // Or create a new image ref in the database
            artworkRef = firebase.database().ref('/user-data/artworks').push();
            console.log("new artwork");
        }

        // use the artwork key as the name for the artwork to ensure it is unique.
        const artworkName = artworkRef.key; // + "." + fileExtension;

        // trigger callback with artwork id so progress can be shown in calling component
        if (callback) callback(artworkRef.key);

        // image storage
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkName}`);

        // store the image data
        const uploadTask = userPicturesRef.put(imgFile);

        uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                console.log("snapshot: ", snapshot);

                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: { artistId: artistId, id: artworkRef.key, progress: progress }
                });

                switch (snapshot.state) {
                    case fb.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case fb.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                    default:
                        console.log("uncaught snapshot state: ", snapshot.state);
                }
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
                            .set('true')
                            .then(() => {

                                console.log("artistArtworkIdsRef: ", artistArtworkIdsRef);

                                dispatch({
                                    type: ADD_ARTWORK_COMPLETE,
                                    payload: { [artistId]: newArtworkData }
                                });
                            })
                            .catch(function (error) {
                                console.log('Synchronization failed', error);
                            })
                    );
            });

    }
}