import firebase from '../../firebase/firebaseConfig';

export const NEW_GALLERY_COMING = "newGalleryComing";
export const FETCH_GALLERY = "fetchGallery";
export const ARTWORK_CHANGE = "artworkChange";
export const FETCH_GALLERY_ARTISTS = "fetchGalleryArtists";

export function fetchGalleryUsingID(galleryId, dispatch) {
    // remove any listeners already there
    firebase.database().ref(`user-data/galleries/${galleryId}`).off();

    firebase.database()
        .ref(`user-data/galleries/${galleryId}`)
        .on('value', snapshot => {
            const galleryData = snapshot.val();
            dispatch({
                type: FETCH_GALLERY,
                payload: { ...galleryData, galleryId }
            });
        })
}

export function fetchGallery(galleryId) {
    return (dispatch) => {
        fetchGalleryUsingID(galleryId, dispatch);
    }
}

/*function fetchGalleryArtistArtworks(artistList, dispatch) {
    const keys = Object.keys(artistList);
    for (let i = 0; i < keys.length; i++) {
        let artistId = keys[i];

        firebase.database()
            .ref('/user-data/artistArtworkIds/' + artistId)
            .on('value', (snapshot) => {
                const artistArtworkIds = snapshot.val();

                if (artistArtworkIds) {
                    const artworkIds = Object.keys(artistArtworkIds);
                    fetchArtworks(artworkIds, dispatch);
                }

            })
    }
}*/

/*function fetchArtworks(artworkIds, dispatch) {
    for (let i = 0; i < artworkIds.length; i++) {
        let artworkId = artworkIds[i];
        fetchArtwork(artworkId, dispatch);
    }
}*/

/*function fetchArtwork(artworkId, dispatch) {
    firebase.database()
        .ref('user-data/artworks/' + artworkId)
        .on('value', snapshot => {
            const artworkId = snapshot.key;
            const artworkData = snapshot.val();
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            });
        });
}*/

/*
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
*/
