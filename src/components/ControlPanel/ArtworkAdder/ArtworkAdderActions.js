import firebase from '../../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const CREATE_ARTWORK = 'createArtwork';
export const UPLOAD_IMAGE = 'uploadImage';
export const IMAGE_UPLOAD_PROGRESS = 'imageUploadProgress';

export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null) {
    return dispatch => {
        // Create a new image ref in the database
        const artworkRef = firebase.database().ref('/artworks').push();
        // use the artwork key as the name for the artwork to ensure it is unique.
        const artworkName = artworkRef.key;

        // image storage
        const imageStorageRef = firebase.storage().ref();
        const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkName}`);
        const uploadTask = userPicturesRef.put(imgFile);

        uploadTask.on(fb.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                dispatch({
                    type: IMAGE_UPLOAD_PROGRESS,
                    payload: progress
                });

                switch (snapshot.state) {
                    case fb.storage.TaskState.PAUSED:   console.log('Upload is paused');    break;
                    case fb.storage.TaskState.RUNNING:  console.log('Upload is running');   break;
                    default: console.log("uncaught snapshot state: ", snapshot.state);
                }
            }, function(error) {

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
                    default: console.log("uncaught error: ", error);
                }
            }, function() {
                // Upload completed successfully - save artwork data
                const dateStamp = Date.now();
                const newArtworkData = {
                    curator: userId,
                    artist: artistId,
                    imgRef: artworkRef.key,
                    url: uploadTask.snapshot.downloadURL,
                    imgWidth: imgWidth,
                    imgHeight: imgHeight,
                    dateAdded: dateStamp
                };

                // save artwork to database and add artwork to artistArtworks
                const artistArtworksRef = firebase.database().ref(`artistArtworks/${artistId}/${artworkRef.key}`);
                artworkRef
                    .set(newArtworkData)
                    .then(
                        artistArtworksRef
                            .set('true')
                            .then(() => {
                                dispatch({
                                    type: UPLOAD_IMAGE,
                                    payload: { [artworkRef.key]: newArtworkData }
                                });

                                if (callback) callback();
                            })
                            .catch(function (error) {
                                console.log('Synchronization failed', error);
                            })
                    );
            });

    }
}

// THIS DOESN'T SEEM TO BE USED
export function createNewArtwork(artistId, artData, callback = null) {
    return dispatch => {
        const artworkRef = firebase.database().ref('/artworks').push();
        const artistArtworksRef = firebase.database().ref(`/artistArtworks/${artistId}/${artworkRef.key}`);

        artistArtworksRef
            .set('true')
            .then(
                artworkRef
                    .set(artData, () => {
                        dispatch({
                            type: CREATE_ARTWORK,
                            payload: { [artworkRef.key]: artData }
                        });

                        if (callback) callback(artworkRef.key);
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed: ', error);
                    })
            );
    }
}