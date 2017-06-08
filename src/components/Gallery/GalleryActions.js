import firebase from '../../firebase/firebaseConfig';
// TODO: I think I should be able to do away with this through first import
import * as fb from 'firebase';

export const FETCH_ARTWORK_KEYS = "fetchArtworkKeys";
export const FETCH_ARTWORKS = "fetchArtworks";

export function fetchArtworkKeys(artistId, callback) {
    return dispatch => {
        firebase.database()
            .ref(`/artistArtworks/${artistId}`)
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
                .ref('/artworks/' + keys[i])
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






