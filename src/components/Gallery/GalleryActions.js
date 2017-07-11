import firebase from '../../firebase/firebaseConfig';

export const NEW_GALLERY_COMING = "newGalleryComing";
export const FETCH_GALLERY = "fetchGallery";
export const FETCH_GALLERY_ALREADY_CACHED = "fetchGalleryAlreadyCached";
export const GALLERY_ARTWORK_CHANGE = "galleryArtworkChange";
export const ARTIST_CHANGE = "artistChange";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";

let galleryListenersRef = [];

export function fetchGallery(galleryId) {
    return (dispatch) => {
        if (galleryListenersRef.indexOf(galleryId) >= 0) {

            dispatch({
                type: FETCH_GALLERY_ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        galleryListenersRef.push(galleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/galleries/${galleryId}`).off();

        // set up a listener for this gallery
        firebase.database()
            .ref(`user-data/galleries/${galleryId}`)
            .on('value', snapshot => {
                const galleryData = snapshot.val();
                dispatch({
                    type: FETCH_GALLERY,
                    payload: { ...galleryData, galleryId }
                });
            });

        firebase.database()
            .ref(`/user-data/artists/${galleryId}`)
            .on('value', (snapshot) => {
                const artistData = snapshot.val();

                dispatch({
                    type: ARTIST_CHANGE,
                    payload: { [galleryId]: artistData }
                });

                fetchGalleryArtistArtworkIds(galleryId, dispatch);
            })
    }
}

function fetchGalleryArtistArtworkIds(artistId, dispatch) {
    firebase.database()
        .ref(`/user-data/artistArtworkIds/${artistId}`)
        .on('value', snapshot => {
            const artistArtworkIdsData = !snapshot.val() ? {} : snapshot.val();
            let ids = [];
            if (artistArtworkIdsData) {
                ids = Object.keys(artistArtworkIdsData);
                fetchGalleryArtworks(ids, dispatch);
            }

            dispatch({
                type: ARTIST_ARTWORK_IDS_CHANGE,
                payload: { [artistId]: artistArtworkIdsData }
            });
        });
}

function fetchGalleryArtworks(artworkIds, dispatch) {
    for (let id of artworkIds) {
        firebase.database()
            .ref('user-data/artworks/' + id)
            .on('value', snapshot => {
                const artworkId = snapshot.key;
                const artworkData = snapshot.val();
                dispatch({
                    type: GALLERY_ARTWORK_CHANGE,
                    payload: { [artworkId]: artworkData }
                })
            });
    }
}