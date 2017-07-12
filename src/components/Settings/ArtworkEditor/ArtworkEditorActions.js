// import firebase from '../../../firebase/firebaseConfig';
// import * as fb from 'firebase';

export const ARTWORK_TO_EDIT_CHANGE = "artworkToEditChange";

export function setArtworkToEdit(artworkId) {
    return dispatch => {
        dispatch({
            type: ARTWORK_TO_EDIT_CHANGE,
            payload: artworkId
        })
    }
}
