import { firestoreDb as db } from "../libs/firebaseConfig";

export const ARTWORK_CHANGE = "artworkChange";
export const RESOURCE_CHANGE = "resourceChange";

let artworkListeners = {};
let resourcesListeners = {};
let userArtworkListenerUnsubscriber;

/*export function listenForUserArtworkChanges(userId) {
    return (dispatch) => {
        fs_getUserArtworkChanges(userId, (artworks) => {
            dispatch({
                type: USER_ARTWORKS_CHANGE,
                payload: artworks
            });
        })
    }
}*/

export function listenForIndividualArtworkChanged(artworkId){
    return (dispatch) => {
        listenForArtworkChanges(artworkId, dispatch);
    }
}

export function listenForUserArtworkChanges(userId) {

    return (dispatch) => {

        if (!userId) {
            userArtworkListenerUnsubscriber();
            return {};
        }

        userArtworkListenerUnsubscriber = db.collection('artworks')
            .where('adminId', '==', userId)
            .onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const artworkId = doc.id;
                        listenForArtworkChanges(artworkId, dispatch);
                    });
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}

function listenForResourceChanges(resourceId, dispatch) {

    if (resourcesListeners[resourceId]) {
        return "resource already has listener";
    }

    resourcesListeners[resourceId] = db.collection('resources')
        .doc(resourceId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    console.log("Error resource doc doesn't exist doc: ", doc);
                    return;
                }

                let resourceData = doc.data();
                resourceData.resourceId = resourceId; // add id to data for ease of use
                const resourcekDataWithId = resourceData;

                dispatch({
                    type: RESOURCE_CHANGE,
                    payload: { [resourceId]: resourcekDataWithId }
                });
            },
            (error) => {
                console.log("resource changes listener error: ", error);
            });
}

function listenForArtworkChanges(artworkId, dispatch) {

    if (artworkListeners[artworkId]) {
        return "artwork already has listener";
    }

    artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    console.log("Error doc doesn't exist doc: ", doc);
                    return;
                }

                const artworkId = doc.id;
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = artworkData;

                // load resources
                if (artworkData.resources) {
                    listenForResourceChanges(artworkData.resources, dispatch);
                }

                // dispatch action
                dispatch({
                    type: ARTWORK_CHANGE,
                    payload: { [artworkId]: artworkDataWithId }
                });
            },
            (error) => {
                console.log("artwork changes listener error: ", error);
            });
}

// GET ARTWORK CHANGES
/*function fs_getArtworkChanges(artworkId, onChangeCallback = null, onErrorCallback) {
    if (unsubscribers.artworkListeners[artworkId]) {
        return "already_running";
    }

    unsubscribers.artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    if (onErrorCallback) onErrorCallback();
                    return;
                }

                const artworkId = doc.id;
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            },
            (error) => {
                if (onErrorCallback) onErrorCallback(error);
                console.log("artwork changes listener error: ", error);
            });
}*/

// GET USER ARTWORK CHANGES
/*function fs_getUserArtworkChanges(userId, callback) {
    if (!userId || unsubscribers.userArtworkListeners[userId]) {
        return "already_running";
    }

    unsubscribers.userArtworkListeners[userId] = db.collection('artworks')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {

                let userArtworks = {};

                querySnapshot.forEach(doc => {
                    const artworkId = doc.id;
                    const artworkData = doc.data();
                    const dataWithId = { ...artworkData, artworkId };
                    userArtworks[doc.id] = dataWithId;

                    /!*artworkData.resources
                        .get()
                        .then(resources => {
                            console.log("data: ", resources.data());
                        });*!/
                });

                if (callback) callback(userArtworks);
            },
            error => {
                console.log("user artworks listener error: ", error);
            })
}*/


// Gets a single snapshot of the artwork data
export function getArtworkDataOnce(artworkId, callback, noDocCallback) {
    return dispatch => {

        fs_getArtworkDataOnce(artworkId, (artworkData) => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            });
            if (callback) callback(artworkData);
        }, () => {
            if (noDocCallback) noDocCallback();
        });
    }
}

// GET ARTWORK DATA ONCE
function fs_getArtworkDataOnce(artworkId, onComplete = null, onNotFound = null) {

    console.log("artworkId: ", artworkId);

    const docRef = db.collection('artworks').doc(artworkId);

    docRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use
                const artworkDataWithId = { [artworkId]: artworkData };

                onComplete(artworkDataWithId);
            }
            else {
                // doc.data() will be undefined in this case
                if (onNotFound) onNotFound(artworkId);
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

/*export function listenForArtworkChanges(artworkId, callback, errorCallback) {
    return (dispatch) => {
        fs_getArtworkChanges(artworkId, (artworkData) => {
            dispatch({
                type: ARTWORK_CHANGE,
                payload: { [artworkId]: artworkData }
            });
            if (callback) callback(artworkData);

        }, () => {
            if (errorCallback) errorCallback(artworkId);
        })
    }
}*/