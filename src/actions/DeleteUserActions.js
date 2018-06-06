import { auth, firestoreDb as db, storage } from "../libs/firebaseConfig";

export const USER_DELETED = "userDeleted";
export const USER_DELETED_ERROR = "userDeletedError";

// get artworks and delete
// delete user data
export function deleteUser() {
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
}

function deleteUserData(uid) {
    return db.collection('users')
        .doc(uid)
        .delete();
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

async function deleteUserArtworks(uid) {
    const userArtworksDocs = await getUserArtworks(uid);

    // return will happen when all the artworks have been deleted
    // NB if there's an error with any it will fail
    return Promise.all(userArtworksDocs.map(doc => {
        const artworkId = doc.id;
        return deleteArtwork(artworkId);
    }));
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
    const currentUser = auth.currentUser;
    return currentUser.delete();
}