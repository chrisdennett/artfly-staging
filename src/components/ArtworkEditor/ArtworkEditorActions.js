import firebase from '../../firebase/firebaseConfig';
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

/*
"https://firebasestorage.googleapis.com/v0/b/art-blam.appspot.com/o/userContent/F08pXRSgkZAQsn7q9Qvum15QC2Nj1/-KqXM_Q_Z38ZTWXIwwXV?alt=media&token=e5d0c60b-cfe2-468d-bef4-72bdb1c5d09c"
"https://storage.googleapis.com/art-blam.appspot.com/userContent%2F08pXRSgkZAQsn7q9Qvum15QC2Nj1%2Flarge_-KqXM_Q_Z38ZTWXIwwXV?GoogleAccessId=firebase-adminsdk-zebo2@art-blam.iam.gserviceaccount.com&Expires=14898124800&Signature=k4NmILMdeyyyy1U6oOsELS6fL9N8PVoSemHbthPUW1dEJuNkjM62vnMv6EEiLBXezQlesyCnxWwo1vfGaU77Dqn6%2FJgW7Z7T4VZr0mnd9w4dYoQnb4PSYt7EdiPno19Gg9iCiaXCPrRZOVsT35H4gnFhAgq8ZUlOCJvEGyDHXyOlkvHqZGwHrBSWlPn2AJuewnZ3u0gZqYw2BvGns00g5fQcS%2FbNqI9tFkbHj8KuIVztBn3GfMzlGQ2I4ae%2Fm2u6D9ws6N9Rr6sGcpaLdFjZLd4esozAl7%2F8CstEtHStXIcjJkgoNpJ3ZNl0kz3UeMuWgUvwWODfynkmzoNzKCF%2BTg%3D%3D"
*/


export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, crop, rotation, type, callback = null) {

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

        // store the image data
        const uploadTask = userPicturesRef.put(imgFile);
        //const uploadTask = userPicturesRef.putString(imgFile);


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

                console.log("uploadTask.snapshot: ", uploadTask.snapshot);

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