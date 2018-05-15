import { firestoreDb as db, storage } from "../libs/firebaseConfig";
// constants
export const ARTWORK_DELETED = 'artworkDeleted';

export function deleteArtwork(artworkData, deleteResources = true, callback = null) {
    return dispatch => {
        const { artworkId, resources, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl } = artworkData;

        // delete artwork data
        fs_deleteArtwork(artworkId, () => {
            dispatch({
                type: ARTWORK_DELETED,
                payload: artworkId
            });
            if (callback) callback();
        });

        if (deleteResources) {
            fs_deleteResource(resources);

            // delete all the images
            for (let currUrl of [url, sourceUrl, thumbUrl, largeUrl, mediumUrl, largeImgUrl]) {
                if (currUrl && currUrl.length > 0) {
                    fs_deleteArtworkImage(currUrl, () => { })
                }
            }
        }
    }
}

// DELETE RESOURCES - this may need to be separated as users
// may want to delete the artwork without deleting the resources
function fs_deleteResource(resourceId, onCompleteCallback = null) {
    db.collection('resources')
        .doc(resourceId)
        .delete()
        .then(() => {
            if (onCompleteCallback) onCompleteCallback();
        })
        .catch(function (error) {
            console.log('delete resource failed: ', error);
        })
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