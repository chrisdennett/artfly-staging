import { firestoreDb as db } from "../libs/firebaseConfig";

export const GALLERY_FETCHED = "galleryFetched";
export const GALLERY_ARTWORKS_FETCHED = "galleryArtworksFetched";
export const GALLERY_UPDATED = "galleryUpdated";
export const GALLERY_UPDATE_TRIGGERED = "galleryUpdateTriggers";


function addUserGallery(userId, dispatch){
    const newGalleryData = {
        type: 'user',
        adminId: userId,
        key: userId,
        title: 'My Gallery',
        subtitle: 'Of Awesome Art'
    };

    const newGalleryRef =  db.collection('galleries').doc();
    const newGalleryId = newGalleryRef.id;

    newGalleryRef.set(newGalleryData)
        .then(() => {
            const galleryDataWithId = { ...newGalleryData, galleryId: newGalleryId };

            dispatch({
                type: GALLERY_FETCHED,
                payload: { [newGalleryId]: galleryDataWithId }
            });
        })
}

export function fetchUserGallery(userId) {
    return (dispatch) => {
        db.collection('galleries')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    // If there's no user gallery yet return default data
                    if (querySnapshot.size === 0) {
                        addUserGallery(userId, dispatch);
                    }
                    // otherwise return the user gallery (may b
                    else {
                        querySnapshot.forEach(doc => {
                            const galleryDataWithId = { ...doc.data(), galleryId: doc.id };

                            dispatch({
                                type: GALLERY_FETCHED,
                                payload: { [doc.id]: galleryDataWithId }
                            });
                        });
                    }
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}

// Gets a single snapshot of the artwork data
// the callback is used to trigger the fetching of gallery artworks
export function fetchGalleryData(galleryId, callback) {
    return dispatch => {

        db.collection('galleries').doc(galleryId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const galleryDataWithId = { ...doc.data(), galleryId: doc.id };
                    dispatch({
                        type: GALLERY_FETCHED,
                        payload: { [galleryId]: galleryDataWithId }
                    });

                    if (callback) callback(galleryDataWithId);
                }
                else {
                    // doc.data() will be undefined in this case
                    console.log("Gallery data not found:", galleryId);
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
}

// A user gallery contains all the artworks that user is admin for
// Is public so the gallery key is set to the user uid so it can
// be loaded when nobody logged in if key is in url
export function fetchUserGalleryArtworks(galleryKey) {
    return (dispatch) => {
        db.collection('artworks')
            .where('adminId', '==', galleryKey)
            .get()
            .then(querySnapshot => {
                    const galleryArtworks = {};

                    querySnapshot.forEach(doc => {
                        // add id to artworkData
                        galleryArtworks[doc.id] = { ...doc.data(), artworkId: doc.id };
                    });

                    dispatch({
                        type: GALLERY_ARTWORKS_FETCHED,
                        payload: galleryArtworks
                    });
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}

export function updateGallery(galleryId, newGalleryData) {
    return dispatch => {
        const galleryDataWithId = { ...newGalleryData, galleryId: galleryId, status: 'updating' };
        dispatch({
            type: GALLERY_UPDATE_TRIGGERED,
            payload: { [galleryId]: galleryDataWithId }
        });

        db.collection('galleries').doc(galleryId)
            .set(newGalleryData)
            .then(() => {
                const galleryDataWithId = { ...newGalleryData, galleryId: galleryId, status: 'updated' };
                dispatch({
                    type: GALLERY_UPDATED,
                    payload: { [galleryId]: galleryDataWithId }
                });
            })
    }
}