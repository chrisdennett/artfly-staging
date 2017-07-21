import firebase from '../../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';
export const ADD_ARTWORK_UPLOAD_PROGRESS = 'imageUploadProgress';
export const ADD_ARTWORK_COMPLETE = 'artworkAdded';

export function updateArtwork(artworkId, oldArtworkData, newArtworkData) {
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
            .then(
                dispatch({
                    type: UPDATE_ARTWORK_COMPLETE,
                    payload: newArtworkData
                })
            )
    }
}

export function uploadCanvasBlob(blob, userId) {
    return dispatch => {
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/test.jpg`);
        userPicturesRef.put(blob);

        dispatch({
            type: "dun",
            payload: {  }
        });
    }
}

export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null) {
    return dispatch => {
        // const fileExtension = imgFile.name.split('.').pop();
        // Create a new image ref in the database
        const artworkRef = firebase.database().ref('/user-data/artworks').push();
        // use the artwork key as the name for the artwork to ensure it is unique.
        const artworkName = artworkRef.key; // + "." + fileExtension;

        // trigger callback with artwork id so progress can be shown in calling component
        if (callback) callback(artworkRef.key);

        // image storage
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkName}`);
        const uploadTask = userPicturesRef.putString(imgFile);

        uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                dispatch({
                    type: ADD_ARTWORK_UPLOAD_PROGRESS,
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
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
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