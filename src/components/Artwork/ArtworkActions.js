import firebase from '../../firebase/firebaseConfig';
// import * as fb from 'firebase';

export const FETCH_ARTWORK = "fetchArtwork";
export const FETCHING_ARTWORK = "fetchingArtwork";

export function fetchArtwork(artworkId, callback = null) {
    return dispatch => {
        dispatch({
            type: FETCHING_ARTWORK,
            payload: "loading"
        });
        firebase.database()
            .ref(`user-data/artworks/${artworkId}`)
            .once('value')
            .then(function (snapshot) {
                dispatch({
                    type: FETCH_ARTWORK,
                    payload: snapshot.val()
                });
                if (callback) callback();
            })
    }
}