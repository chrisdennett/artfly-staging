import firebase from '../../firebase/firebaseConfig';

export const FETCH_GALLERY = "fetchGallery";
export const FETCH_GALLERY_ARTWORKS = "fetchGalleryArtworks";
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

function fetchArtworksFromIds(artworkIds, dispatch) {
    for (let i = 0; i < artworkIds.length; i++) {
        let artworkId = artworkIds[i];
        firebase.database()
            .ref('user-data/artworks/' + artworkId)
            .on('value', snapshot => {
                const artworkId = snapshot.key;
                const artworkData = snapshot.val();
                dispatch({
                    type: FETCH_GALLERY_ARTWORKS,
                    payload: { [artworkId]: artworkData }
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
