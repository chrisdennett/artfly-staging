import { auth, firestoreDb as db, storage } from "../libs/firebaseConfig";

export const USER_DELETED = "userDeleted";

// get resources and delete
// get artworks and delete
// delete user data
export function deleteUser() {
    const { uid } = auth.currentUser;

    return async dispatch => {
        await deleteUserArtworks(uid);
        console.log("deleteUserArtworksComplete");
        await deleteUserResources(uid);
        console.log("deleteUserResourcesComplete");
        await deleteUserData(uid);
        console.log("deleteUserDataComplete");
        await deleteUserAuth();

        dispatch({
            type: USER_DELETED,
            payload: "success"
        })
    }
}

function deleteUserData(uid) {
    return db.collection('users')
            .doc(uid)
            .delete();
}

// returns a promise
// get user artworks in order to delete them
function getUserArtworks(uid) {
    return db.collection('artworks')
        .where('adminId', '==', uid)
        .get()
        .then(userArtworksSnapShot => {
            return userArtworksSnapShot.docs
        })
}

async function deleteUserArtworks(uid) {
    const userArtworkDocs = await getUserArtworks(uid);

    // return will happen when all the artworks have been deleted
    // NB if there's an error with any it will fail
    return Promise.all(userArtworkDocs.map(doc => {
        const artworkId = doc.id;
        return deleteUserArtwork(artworkId);
    }));
}

// returns a promise do be dealt with in an async function
export function deleteUserArtwork(artworkId) {
    return db.collection('artworks')
        .doc(artworkId)
        .delete()
}

// DELETE RESOURCES
function getUserResources(uid) {
    return db.collection('resources')
        .where('adminId', '==', uid)
        .get()
        .then(userResourcesSnapShot => {
            return userResourcesSnapShot.docs
        })
}

async function deleteUserResources(uid) {
    const userResourcesDocs = await getUserResources(uid);

    // return will happen when all the artworks have been deleted
    // NB if there's an error with any it will fail
    return Promise.all(userResourcesDocs.map(doc => {
        const resourceId = doc.id;
        return deleteResource(resourceId);
    }));
}

export async function deleteResource(resourceId) {
    // get resource doc
    const resourceDoc = await getResource(resourceId);
    // get resource data
    const resourceData = resourceDoc.data();
    // extract the resource urls
    const { largeUrl, sourceUrl, thumbUrl } = resourceData;

    // create an array of file delete promises
    const promises = [largeUrl, sourceUrl, thumbUrl].map(url => {
        return storage.refFromURL(url).delete();
    });

    // add the data delete promise
    promises.push(
        db.collection('resources').doc(resourceId).delete()
    );

    // return the result of all promises
    // nb an error will prevent any of them being deleted
    return Promise.all(promises);
}

export function getResource(resourceId) {
    return db.collection('resources')
        .doc(resourceId)
        .get();
}

export function deleteUserAuth() {
    const currentUser = auth.currentUser;
    return currentUser.delete();
}