import firebase from '../libs/firebaseConfig';

export const FETCH_COMMUNITY_DATA = "fetchCommunityData";

export function fetchCommunityData(callback = null) {
    return dispatch => {
        firebase.database()
            .ref(`/community`)
            .once('value')
            .then(function (snapshot) {
                dispatch({
                    type: FETCH_COMMUNITY_DATA,
                    payload: snapshot.val()
                });
                if (callback) callback();
            })
    }
}