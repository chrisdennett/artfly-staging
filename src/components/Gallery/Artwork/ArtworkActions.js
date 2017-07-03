// import firebase from '../../../firebase/firebaseConfig';
// import * as fb from 'firebase';

export const SET_UP_FOR_NEW_ARTWORK = "setUpForNewArtwork";
export const IMAGE_LOADED = "imageLoaded";
// export const FETCH_ARTWORK = "fetchArtwork";
// export const FETCHING_ARTWORK = "fetchingArtwork";

export function setupForNewArtwork() {
    return dispatch => {
        dispatch({
            type: SET_UP_FOR_NEW_ARTWORK,
            payload: "setup"
        })
    }
}

export function setImageLoaded() {
    return dispatch => {
        dispatch({
            type: IMAGE_LOADED,
            payload: "loaded"
        })
    }
}

/*NOT CURRENTLY USED - AS GALLERY LOADS ALL ARTWORKS*/
/*
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
}*/
