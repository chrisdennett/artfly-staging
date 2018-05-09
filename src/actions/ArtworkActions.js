import { fs_deleteArtwork, fs_deleteArtworkImage } from "./FirestoreActions";
import { ARTWORK_DELETED } from "./UserDataActions";

export function deleteArtwork(artworkData, callback = null) {
    return dispatch => {
        const { artworkId, url, sourceUrl, thumbUrl, largeUrl, mediumUrl } = artworkData;
        const urlsToDelete = [url, sourceUrl, thumbUrl, largeUrl, mediumUrl];

        // delete artwork data
        fs_deleteArtwork(artworkId, () => {
            dispatch({
                type: ARTWORK_DELETED,
                payload: artworkId
            });
            if (callback) callback();
        });

        // delete all the images
        for (let currUrl of urlsToDelete) {
            if (currUrl && currUrl.length > 0) {
                fs_deleteArtworkImage(currUrl, () => {  })
            }
        }
    }
}