// import { firestoreDb as db, storage } from "../libs/firebaseConfig";
import { firestoreDb as db } from "../libs/firebaseConfig";
// constants
export const ARTWORK_DELETED = 'artworkDeleted';
// export const RESOURCE_DELETED = 'resourceDeleted';
// export const RESOURCE_FILE_DELETED = 'resourceFileDeleted';

/*async function _deleteArtworks(artworks) {
      console.log("artworks all deleted: ", artworks)
}*/

export function deleteArtwork(artworkData, deleteResources = true, callback = null) {
    return dispatch => _deleteArtwork(dispatch, artworkData, deleteResources, callback);
}


function _deleteArtwork(dispatch, artworkData, deleteResources = true, callback = null) {
    // const { artworkId, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl } = artworkData;
    const { artworkId } = artworkData;

    // delete artwork data
    db.collection('artworks')
        .doc(artworkId)
        .delete()
        .then(() => {
            console.log('artwork data deleted');
            dispatch({
                type: ARTWORK_DELETED,
                payload: artworkId
            });
            if (callback) callback();
        })
        .catch(function (error) {
            console.log('delete artwork failed: ', error);
        });
}

export function deleteArtworks(artworks) {
    return dispatch => {
        Object.keys(artworks).map(artworkId => {
            return _deleteArtwork(dispatch, artworks[artworkId]);
        })
    }
}