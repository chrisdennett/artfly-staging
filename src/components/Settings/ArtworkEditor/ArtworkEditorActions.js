import firebase from '../../../firebase/firebaseConfig';

export const UPDATE_ARTWORK_COMPLETE = 'updateArtworkComplete';

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