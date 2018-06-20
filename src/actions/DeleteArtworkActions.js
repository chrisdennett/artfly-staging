// import { firestoreDb as db, storage } from "../libs/firebaseConfig";
import { firestoreDb as db, storage } from "../libs/firebaseConfig";
// constants
export const ARTWORK_DELETED = 'artworkDeleted';
export const ARTWORK_DELETE_ERROR = 'artworkDeleteError';
// export const RESOURCE_DELETED = 'resourceDeleted';
// export const RESOURCE_FILE_DELETED = 'resourceFileDeleted';

/*async function _deleteArtworks(artworks) {
      console.log("artworks all deleted: ", artworks)
}*/

function deleteImages(imageUrls){
    return imageUrls.map(url => {
        return storage.refFromURL(url).delete();
    });
}

function deleteArtworkData(artworkId) {
    return db.collection('artworks').doc(artworkId).delete();
}

function markArtworkDataAsDeleted(artworkData) {
    const {largeUrl, sourceUrl, thumbUrl, adminId, artworkId} = artworkData;
    const deletedArtworkData = {largeUrl, sourceUrl, thumbUrl, oldAdminId:adminId, isDeleted:true};

    return db.collection('artworks')
        .doc(artworkId)
        .set(deletedArtworkData);
}

export function deleteArtwork(artworkData, callback = null) {
    return async dispatch => {
        // const { artworkId, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl } = artworkData;
        const { artworkId, largeUrl, sourceUrl, thumbUrl } = artworkData;

        try{
            await deleteImages([largeUrl, sourceUrl, thumbUrl]);
            await deleteArtworkData(artworkData.artworkId);

            dispatch({
                type: ARTWORK_DELETED,
                payload: artworkId
            });

            if (callback) callback();
        }
        catch (error) {
            markArtworkDataAsDeleted(artworkData)
                .then(() => {
                    dispatch({
                        type: ARTWORK_DELETED,
                        payload: artworkId
                    });
                })
                .catch(function (error) {
                    dispatch({
                        type: ARTWORK_DELETE_ERROR,
                        payload: error
                    })
                })
        }
    }
}


/*
function _deleteArtwork(dispatch, artworkData, deleteResources = true, callback = null) {
    // const { artworkId, url, sourceUrl, thumbUrl, largeUrl, largeImgUrl, mediumUrl } = artworkData;
    const { artworkId, largeUrl, sourceUrl, thumbUrl } = artworkData;


    // create an array of file delete promises
    const promises = [largeUrl, sourceUrl, thumbUrl].map(url => {
        return storage.refFromURL(url).delete();
    });

    // add the data delete promise
    promises.push(
        db.collection('artworks').doc(artworkId).delete()
    );

    // return the result of all promises
    // nb an error will prevent any of them being deleted
    Promise.all(promises);

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
}*/
