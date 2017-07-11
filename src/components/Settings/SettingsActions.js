import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
//import * as fb from 'firebase';

export const ARTIST_UPDATED = 'artistUpdated';
export const ARTIST_DELETED = 'artistDeleted';
export const ARTWORK_DELETED = 'artworkDeleted';
export const GALLERY_UPDATED = 'galleryUpdated';

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

export function deleteArtist(artistId, userId, galleryId, callback) {
    return dispatch => {
        const db = firebase.database();
        const artistRef = db.ref(`user-data/artists/${artistId}`);
        const artistArtworkIdsRef = db.ref(`user-data/artistArtworkIds/${artistId}`);
        const userArtistRef = db.ref(`user-data/users/${userId}/artistIds/${artistId}`);
        const galleryArtistRef = db.ref(`user-data/galleries/${galleryId}/artistIds/${artistId}`);

        artistArtworkIdsRef
            .once('value')
            .then(snapshot => {
                const artworkIdObj = snapshot.val();
                if (artworkIdObj) {
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
                // delete the reference to the artist in the gallery data
                galleryArtistRef.remove();

                dispatch({
                    type: ARTIST_DELETED,
                    payload: artistId
                });

                if (callback) callback();
            });
    }
}

function deleteArtwork(artworkId, userId, dispatch) {
    // delete image in storage
    const imageStorageRef = firebase.storage().ref();
    const userPicturesRef = imageStorageRef.child(`userContent/${userId}/${artworkId}`);
    userPicturesRef.delete().then(() => {

        // delete artwork data
        const artworkDataRef = firebase.database().ref(`user-data/artworks/${artworkId}`);
        artworkDataRef.remove();

        dispatch({
            type: ARTWORK_DELETED,
            payload: artworkId
        });

    }).catch(function (error) {
        console.log("ControlPanelActions > deleteArtwork > error: ", error);
    });
}
