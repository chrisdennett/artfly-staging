import { firestoreDb as db, storage } from "../libs/firebaseConfig";
// constants
export const ARTWORK_DELETED = 'artworkDeleted';
export const RESOURCE_DELETED = 'resourceDeleted';
export const RESOURCE_FILE_DELETED = 'resourceFileDeleted';

/*async function _deleteArtworks(artworks) {
      console.log("artworks all deleted: ", artworks)
}*/

export function deleteArtwork(artworkData, deleteResources = true, callback = null) {
    return dispatch => _deleteArtwork(dispatch, artworkData, deleteResources, callback);
}


function _deleteArtwork(dispatch, artworkData, deleteResources = true, callback = null) {
    const { artworkId, resources, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl } = artworkData;

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

    if (deleteResources) {
        const reconstitutedResourceData = { resourceId: resources, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl };

        _deleteResource(dispatch, reconstitutedResourceData);
    }
}

function _deleteResource(dispatch, resourceData) {
    const { resourceId, url, sourceUrl, thumbUrl, largeUrl, mediumUrl, largeImgUrl } = resourceData;

    db.collection('resources')
        .doc(resourceId)
        .delete()
        .then(() => {
            console.log("resources deleted: ", resourceData);
        })
        .catch(function (error) {
            console.log('delete resource failed: ', error);
        });

    // delete all the images
    for (let currUrl of [url, sourceUrl, thumbUrl, largeUrl, mediumUrl, largeImgUrl]) {
        if (currUrl && currUrl.length > 0) {
            // fs_deleteArtworkImage(currUrl, () => { })
            const imageRef = storage.refFromURL(currUrl);

            if (imageRef.exists) {
                imageRef.delete()
                    .then(() => {
                        console.log("Image currUrl deleted: ", currUrl);
                    })
                    .catch(function (error) {
                        console.log('Delete image failed: ', error);
                    })
            }
        }
    }
}

export function deleteArtworks(artworks) {
    return dispatch => {
        Object.keys(artworks).map(artworkId => {
            return _deleteArtwork(dispatch, artworks[artworkId]);
        })
    }
}

export function deleteResources(resources) {
    return dispatch => {
        Object.keys(resources).map(resourceId => {
            console.log("resources[resourceId]: ", resources[resourceId]);
            return _deleteResource(dispatch, resources[resourceId]);
        })
    }
}
