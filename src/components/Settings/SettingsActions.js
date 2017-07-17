import firebase from '../../firebase/firebaseConfig';

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
