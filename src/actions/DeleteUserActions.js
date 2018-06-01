import firebase, { auth, firestoreDb as db, storage } from "../libs/firebaseConfig";
import { ARTWORK_DELETED, RESOURCE_DELETED, RESOURCE_FILE_DELETED } from "./DeleteArtworkActions";

export const DELETE_USER = "deleteUser";
export const DELETE_USER_AUTH = "deleteUserAuth";

// get resources and delete
// get artworks and delete
// delete user data
export function deleteUser() {
    const { uid } = auth.currentUser;
    // doesn't matter what order these happen in
    // but all must be done before auth deleted
    deleteUserArtworks(uid);
    deleteUserResources(uid);
    deleteUserData(uid);
    deleteUserAuth();
}

function deleteUserData(uid){
    return dispatch => {
        db.collection('users')
            .doc(uid)
            .delete()
            .then(() => {
                dispatch({
                    type: DELETE_USER,
                    payload: "success"
                })
            })
            .catch(function (error) {
                console.log('delete user failed: ', error);
            });
    }
}

function deleteUserArtworks(uid) {
    return db.collection('artworks')
        .where('adminId', '==', uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const artworkId = doc.id;
                deleteArtwork(artworkId);
            })
        })
}

export function deleteArtwork(artworkId) {
    return dispatch => {
        db.collection('artworks')
            .doc(artworkId)
            .delete()
            .then(() => {
                dispatch({
                    type: ARTWORK_DELETED,
                    payload: artworkId
                });
            })
            .catch(function (error) {
                console.log('delete artwork failed: ', error);
            });
    }
}

function deleteUserResources(uid) {
    return db.collection('resources')
        .where('adminId', '==', uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const resourceId = doc.id;
                deleteResource(resourceId);
            })
        })
}

export function getResource(resourceId) {
    return db.collection('resources')
        .doc(resourceId)
        .get()
        .then(doc => {
            return doc.data()
        })
        .catch(function (error) {
            console.log('Get resource failed: ', error);
        });
}

function deleteResourceFile(url) {
    const imageRef = storage.refFromURL(url);

    return dispatch => {
        imageRef.delete()
            .then(() => {
                dispatch({
                    type: RESOURCE_FILE_DELETED,
                    payload: url
                });
            })
            .catch(function (error) {
                console.log('Delete image failed: ', error);
            })
    }
}

export async function deleteResource(resourceId) {
    const resourceData = await getResource(resourceId);
    const { largeUrl, sourceUrl, thumbUrl } = resourceData;
    for (let url of [largeUrl, sourceUrl, thumbUrl]) {
        deleteResourceFile(url);
    }

    deleteResourceData(resourceId);
}

function deleteResourceData(resourceId) {
    return dispatch => {
        db.collection('resources').doc(resourceId)
            .delete()
            .then(() => {
                dispatch({
                    type: RESOURCE_DELETED,
                    payload: resourceId
                });
            })
            .catch(function (error) {
                console.log('Delete image failed: ', error);
            });
    }
}

export function deleteUserAuth() {
    // return dispatch => {

        const currentUser = auth.currentUser;

        console.log("currentUser: ", currentUser);

        // take the first one because not currently allowing multiple sign in
        // methods for the same account
        const providerId = currentUser.providerData[0].providerId;

        let provider;
        if (providerId === 'twitter.com') provider = new firebase.auth.TwitterAuthProvider();
        if (providerId === 'google.com') provider = new firebase.auth.GoogleAuthProvider();
        if (providerId === 'facebook.com') provider = new firebase.auth.FacebookAuthProvider();

        // get users to sign in again
        /*auth
            .signInWithPopup(provider)
            .then(result => {
                currentUser
                    .reauthenticateAndRetrieveDataWithCredential(result.credential)
                    .then(() => {
                        currentUser
                            .delete()
                            .then(() => {
                                dispatch({
                                    type: DELETE_USER_AUTH,
                                    payload: "success"
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                    })
            })
            .catch(error => {
                console.log("log in error: ", error);
            });*/
    // }
}