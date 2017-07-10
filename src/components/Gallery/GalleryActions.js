import firebase from '../../firebase/firebaseConfig';

export const NEW_GALLERY_COMING = "newGalleryComing";
export const FETCH_GALLERY = "fetchGallery";
export const GALLERY_ARTWORK_CHANGE = "galleryArtworkChange";
export const ARTIST_CHANGE = "artistChange";
export const ARTIST_ARTWORK_IDS_CHANGE = "artistArtworkIdsChange";

export function fetchGalleryUsingID(galleryId, dispatch) {
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

            if (galleryData && galleryData.artistIds) {
                fetchGalleryArtists(galleryId, Object.keys(galleryData.artistIds), dispatch);
            }
        })
}

// TODO: include gallery Id in the dispatch so the reducer can save it against galleryId
function fetchGalleryArtists(galleryId, artistIds, dispatch) {
    for (let i = 0; i < artistIds.length; i++) {
        firebase.database()
            .ref('/user-data/artists/' + artistIds[i])
            .on('value', (snapshot) => {
                const artistId = snapshot.key;
                const artistData = snapshot.val();

                dispatch({
                    type: ARTIST_CHANGE,
                    payload: { [artistId]: artistData }
                });

                fetchGalleryArtistArtworkIds(artistId, dispatch);
            })
    }
}

// TODO: this is separate so main function can be called here and from userActions - needs sorting
export function fetchGallery(galleryId) {
    return (dispatch) => {
        fetchGalleryUsingID(galleryId, dispatch);
    }
}
// TODO: include gallery Id in the dispatch so the reducer can save it against galleryId
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

function fetchGalleryArtworks(artworkIds, dispatch){
    for (let id of artworkIds){
    firebase.database()
        .ref('user-data/artworks/' + id)
        .on('value', snapshot => {
            const artworkId = snapshot.key;
            const artworkData = snapshot.val();
            dispatch({
                type: GALLERY_ARTWORK_CHANGE,
                payload: {[artworkId]:artworkData}
            })
        });
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
