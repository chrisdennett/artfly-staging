import { firestoreDb as db } from "../libs/firebaseConfig";
import { saveArtworkChanges } from "./SaveArtworkActions";

export const ARTWORK_CHANGE = "artworkChange";
export const USER_ARTWORKS_FETCHED = "userArtworksFetched";
export const USER_ARTWORKS_FETCH_TRIGGERED = "userArtworksFetchTriggered";

// let artworkListeners = {};
// let userArtworkListenerUnsubscriber;

/*export function listenForIndividualArtworkChanged(artworkId) {
    return (dispatch) => {
        listenForArtworkChanges(artworkId, dispatch);
    }
}*/

export function updateUserArtworks(userId){
    return (dispatch) => {

        db.collection('artworks')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        // add id to artworkData
                        const artworkId = doc.id;
                        saveArtworkChanges(artworkId, {deleteAfter:'2018-09-02'})
                    });
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}


export function fetchUserArtworks(userId) {
    return (dispatch) => {

        dispatch({
            type: USER_ARTWORKS_FETCH_TRIGGERED
        });

        db.collection('artworks')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    const userArtworks = {};

                    querySnapshot.forEach(doc => {
                        // add id to artworkData
                        userArtworks[doc.id] = { ...doc.data(), artworkId: doc.id };
                    });

                    dispatch({
                        type: USER_ARTWORKS_FETCHED,
                        payload: userArtworks
                    });
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}

/*export function listenForUserArtworkChanges(userId) {
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
}*/

/*function listenForArtworkChanges(artworkId, dispatch) {
    if (artworkListeners[artworkId]) {
        return "artwork already has listener";
    }

    artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                if (!doc.exists) {
                    return;
                }

                const artworkId = doc.id;
                let artworkData = doc.data();
                artworkData.artworkId = artworkId; // add id to data for ease of use

                // dispatch action
                dispatch({
                    type: ARTWORK_CHANGE,
                    payload: { [artworkId]: artworkData }
                });
            },
            (error) => {
                console.log("artwork changes listener error: ", error);
            });
}*/

// Gets a single snapshot of the artwork data
export function getArtworkDataOnce(artworkId) {
    return dispatch => {

        db.collection('artworks').doc(artworkId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let artworkData = doc.data();
                    artworkData.artworkId = artworkId; // add id to data for ease of use};

                    dispatch({
                        type: ARTWORK_CHANGE,
                        payload: { [artworkId]: artworkData }
                    });
                }
                else {
                    // doc.data() will be undefined in this case
                    dispatch({
                        type: ARTWORK_CHANGE,
                        payload: { [artworkId]: 'missing' }
                    });
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
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