import { auth, firestoreDb as db, storage } from "../libs/firebaseConfig";
import { ARTWORK_DELETED } from "./DeleteArtworkActions";
// import { ARTWORK_DELETE_ERROR } from "./DeleteArtworkActions";

export const USER_ARTWORKS_DELETED = "userArtworksDeleted";
export const USER_DATA_DELETED = "userDataDeleted";
export const USER_AUTH_DELETED = "userAuthDeleted";
export const USER_DELETED_ERROR = "userDeletedError";
export const USER_DATA_DELETE_ERROR = "userDataDeleteError";
export const USER_AUTH_DELETE_ERROR = "userAuthDeleteError";
export const USER_ARTWORKS_DELETE_ERROR = "userArtworksDeleteError";

// get artworks and delete
// delete user data
/*export function deleteUser() {
    const { uid } = auth.currentUser;

    return async dispatch => {

        try {
            await deleteUserArtworks(uid);
            await deleteUserData(uid);
            await deleteUserAuth();

            dispatch({
                type: USER_DELETED
            })
        }
        catch (error) {
            console.log(error);

            dispatch({
                type: USER_DELETED_ERROR,
                payload: error
            })
        }
    }
}*/

export function deleteUserData(uid, accountId, galleryId) {
    return async dispatch => {

        try {
            // store a record of the deleted account
            await db.collection('deleted-accounts').doc(accountId).set({ adminId: uid, status: 'deleted' });
            // bin the account data
            await db.collection('accounts').doc(accountId).delete();
            // bin the gallery data
            await db.collection('galleries').doc(galleryId).delete();

            dispatch({
                type: USER_DATA_DELETED
            })
        }
        catch (error) {
            console.log('USER_DATA_DELETE_ERROR: ', error);

            dispatch({
                type: USER_DATA_DELETE_ERROR,
                payload: error
            })
        }
    }
}

// DELETE ARTWORKS
function getUserArtworks(uid) {
    return db.collection('artworks')
        .where('adminId', '==', uid)
        .get()
        .then(userArtworksSnapShot => {
            return userArtworksSnapShot.docs
        })
}

export function deleteUserArtworks() {

    const { uid } = auth.currentUser;

    return async dispatch => {

        try {
            const userArtworksDocs = await getUserArtworks(uid);

            await userArtworksDocs.map(doc => {
                const artworkId = doc.id;
                deleteArtwork(artworkId)
                    .then(() => {
                        dispatch({
                            type: ARTWORK_DELETED,
                            payload: artworkId
                        })
                    });
            });

            dispatch({
                type: USER_ARTWORKS_DELETED
            })
        }
        catch (error) {
            console.log(error);

            dispatch({
                type: USER_ARTWORKS_DELETE_ERROR,
                payload: error
            })
        }
    }






    // return will happen when all the artworks have been deleted
    // NB if there's an error with any it will fail

}

export async function deleteArtwork(artworkId) {
    // get artwork doc
    const artworkDoc = await getArtwork(artworkId);
    // get artwork data
    const artworkData = artworkDoc.data();
    // extract the artwork urls
    const { largeUrl, sourceUrl, thumbUrl } = artworkData;

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
    return Promise.all(promises);
}

export function getArtwork(artworkId) {
    return db.collection('artworks')
        .doc(artworkId)
        .get();
}

export function deleteUserAuth() {
    return dispatch => {
        const currentUser = auth.currentUser;
        currentUser
            .delete()
            .then(() => {
                dispatch({
                    type: USER_AUTH_DELETED
                })
            })
            .catch(function (error) {
                console.log("deleteUserAuth Error:", error);
                dispatch({
                    type: USER_AUTH_DELETE_ERROR
                })
            });
    }
}