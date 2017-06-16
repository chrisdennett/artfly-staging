import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const FETCH_GALLERY = "fetchGallery";
export const FETCH_ARTWORK_KEYS = "fetchArtworkKeys";
export const FETCH_ARTWORKS = "fetchArtworks";
export const FETCH_GALLERY_ARTISTS = "fetchGalleryArtists";

export function fetchGallery(galleryId) {
    return dispatch => {
        firebase.database()
            .ref(`user-data/galleries/${galleryId}`)
            .on('value', snapshot => {
                const galleryData = snapshot.val();
                dispatch({
                    type: FETCH_GALLERY,
                    payload: galleryData
                });

                if (galleryData.artistIds) {
                    fetchGalleryArtists(galleryData.artistIds, dispatch);
                    fetchGalleryArtworks(galleryData.artistIds, dispatch)
                }

            })
    }
}

function fetchGalleryArtworks(artistList, dispatch) {
    const keys = Object.keys(artistList);
    for (let i = 0; i < keys.length; i++) {
        let artistId = keys[i];

        firebase.database()
            .ref('/user-data/artistArtworks/' + artistId)
            .on('value', (snapshot) => {
                const artistArtworkIds = snapshot.val();
                const artworkIds = Object.keys(artistArtworkIds);
                fetchArtworksFromIds(artworkIds, dispatch);
            })
    }
}

function fetchArtworksFromIds(artworkIds, dispatch){
    for (let i = 0; i < artworkIds.length; i++) {

        const totalToGet = artworkIds.length;
        let promiseArray = [];

        for (let i = 0; i < totalToGet; i++) {
            let artworkId = artworkIds[i];
            let promise = firebase.database()
                .ref('user-data/artworks/' + artworkId)
                .once('value')
                .then(function (snapshot) {
                    return snapshot;
                });
            promiseArray.push(promise);
        }

        fb.Promise.all(promiseArray).then((values) => {
            let returnedArtworks = {}, key, value, snapshot;
            for (let j = 0; j < values.length; j++) {
                snapshot = values[j];
                key = snapshot.key;
                value = snapshot.val();
                returnedArtworks[key] = value;
            }

            dispatch({
                type: FETCH_ARTWORKS,
                payload: returnedArtworks
            });
        });
    }
}

function fetchGalleryArtists(artistList, dispatch) {
    const keys = Object.keys(artistList);

    for (let i = 0; i < keys.length; i++) {
        firebase.database()
            .ref('user-data/artists/' + keys[i])
            .on('value', (snapshot) => {
                const artistId = snapshot.key;
                const artistData = snapshot.val();

                dispatch({
                    type: FETCH_GALLERY_ARTISTS,
                    payload: { [artistId]: artistData }
                });
            })
    }
}

export function fetchArtworkKeys(artistId, callback) {
    return dispatch => {
        firebase.database()
            .ref(`user-data/artistArtworks/${artistId}`)
            .once('value')
            .then(function (snapshot) {
                dispatch({
                    type: FETCH_ARTWORK_KEYS,
                    payload: snapshot.val()
                });

                if (callback) callback();
            })
    }
}

export function fetchArtworks(artworks, callback) {
    return dispatch => {
        // if the artist has not artworks this will come through as null
        if (!artworks) {
            dispatch({
                type: FETCH_ARTWORKS,
                payload: {}
            });

            if (callback) callback();
            return;
        }

        const keys = Object.keys(artworks);
        const totalToGet = keys.length;
        let promiseArray = [];

        for (let i = 0; i < totalToGet; i++) {
            let promise = firebase.database()
                .ref('user-data/artworks/' + keys[i])
                .once('value')
                .then(function (snapshot) {
                    return snapshot;
                });
            promiseArray.push(promise);
        }

        fb.Promise.all(promiseArray).then((values) => {
            let returnedArtworks = {}, key, value, snapshot;
            for (let j = 0; j < values.length; j++) {
                snapshot = values[j];
                key = snapshot.key;
                value = snapshot.val();
                returnedArtworks[key] = value;
            }

            dispatch({
                type: FETCH_ARTWORKS,
                payload: returnedArtworks
            });

            if (callback) callback();
        });
    }
}






