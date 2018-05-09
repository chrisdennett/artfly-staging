import { firestoreDb as db, storage } from "../libs/firebaseConfig";
// constants
import { ARTWORK_DELETED } from "./UserDataActions";

export function deleteArtwork(artworkData, callback = null) {
    return dispatch => {
        const { artworkId, url, sourceUrl, thumbUrl, largeUrl, mediumUrl } = artworkData;

        // delete artwork data
        fs_deleteArtwork(artworkId, () => {
            dispatch({
                type: ARTWORK_DELETED,
                payload: artworkId
            });
            if (callback) callback();
        });

        // delete all the images
        for (let currUrl of [url, sourceUrl, thumbUrl, largeUrl, mediumUrl]) {
            if (currUrl && currUrl.length > 0) {
                fs_deleteArtworkImage(currUrl, () => { })
            }
        }
    }
}

// DELETE ARTWORK DATA
function fs_deleteArtwork(artworkId, onCompleteCallback = null) {
    db.collection('artworks')
        .doc(artworkId)
        .delete()
        .then(() => {
            if (onCompleteCallback) onCompleteCallback();
        })
        .catch(function (error) {
            console.log('delete artwork failed: ', error);
        })
}

// DELETE ARTWORK IMAGE
function fs_deleteArtworkImage(url, onCompleteCallback = null) {
    const imageRef = storage.refFromURL(url);
    imageRef.delete()
        .then(() => {
            onCompleteCallback();
        })
        .catch(function (error) {
            console.log('Delete image failed: ', error);
        })
}