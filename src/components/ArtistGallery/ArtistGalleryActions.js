import firebase from '../../firebase/firebaseConfig';

export const NEW_GALLERY_COMING = "newGalleryComing";
export const FETCH_GALLERY = "fetchGallery";
export const ALREADY_CACHED = "alreadyCached";
export const ARTWORK_CHANGE = "artworkChange";
export const ARTIST_CHANGE = "artistChange";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";
export const FETCH_ARTWORK_ALREADY_CACHED = "fetchArtworkAlreadyCached";

let galleryListenersRef = [];
let artistListenersRef = [];
let artworkListenersRef = [];
let artistArtworkIdsListenersRef = [];

export function fetchGallery(artistGalleryId) {
    return (dispatch) => {

        if (galleryListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        galleryListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/galleries/${artistGalleryId}`).off();

        // set up a listener for this gallery
        firebase.database()
            .ref(`user-data/galleries/${artistGalleryId}`)
            .on('value', snapshot => {
                const galleryData = snapshot.val();
                dispatch({
                    type: FETCH_GALLERY,
                    payload: { [artistGalleryId]:galleryData }
                });
            });
    }
}

export function fetchArtist(artistGalleryId) {
    return (dispatch) => {
        if (artistListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        artistListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there (shouldn't be)
        firebase.database().ref(`user-data/artists/${artistGalleryId}`).off();

        // set up a listener for this artist
        firebase.database()
            .ref(`/user-data/artists/${artistGalleryId}`)
            .on('value', (snapshot) => {
                const artistData = snapshot.val();
                
                dispatch({
                    type: ARTIST_CHANGE,
                    payload: { [artistGalleryId]: artistData }
                });
            });
    }
}

export function fetchGalleryArtistArtworkIds(artistGalleryId) {
    return (dispatch) => {
        if (artistArtworkIdsListenersRef.indexOf(artistGalleryId) >= 0) {
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        // keep track of galleryIds that have had listeners attached
        artistArtworkIdsListenersRef.push(artistGalleryId);

        // remove any listeners if there are already there
        firebase.database().ref(`user-data/artistArtworkIds/${artistGalleryId}`).off();

        firebase.database()
            .ref(`/user-data/artistArtworkIds/${artistGalleryId}`)
            .on('value', snapshot => {
                const artistArtworkIdsData = !snapshot.val() ? {} : snapshot.val();

                dispatch({
                    type: ARTIST_ARTWORK_IDS_CHANGE,
                    payload: { [artistGalleryId]: artistArtworkIdsData }
                });
            });
    }
}

export function fetchArtwork(artworkId) {
    return (dispatch) => {
        fetchArtworkInternal(artworkId, dispatch);
    }
}

export function fetchArtworkInternal(artworkId, dispatch) {
    if (artworkListenersRef.indexOf(artworkId) >= 0) {
        dispatch({
            type: FETCH_ARTWORK_ALREADY_CACHED,
            payload: {}
        });
        return;
    }

    firebase.database()
        .ref('user-data/artworks/' + artworkId)
        .on('value', snapshot => {
            const artworkId = snapshot.key;
            const artworkData = snapshot.val();
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            })
        });
}