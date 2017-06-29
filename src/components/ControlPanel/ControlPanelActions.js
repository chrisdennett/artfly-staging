import firebase from '../../firebase/firebaseConfig';

export const CURRENT_ARTIST_UPDATED = 'currentArtistUpdated';
export const ARTIST_UPDATED = 'artistUpdated';
export const ARTIST_UPDATE_CANCELLED = 'artistUpdated';

export function setCurrentArtist(artistId, callback) {
    return dispatch => {
        const artistRef = firebase.database().ref(`user-data/artists/${artistId}`);
        artistRef
            .once('value')
            .then(snapshot => {
                dispatch({
                    type: CURRENT_ARTIST_UPDATED,
                    payload: {...snapshot.val(), artistId:artistId}
                });

                if (callback) callback();
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

export function cancelArtistUpdate(callback) {
    return dispatch => {
        dispatch({
            type: ARTIST_UPDATE_CANCELLED,
            payload: {}
        });

        if (callback) callback();
    }
}
