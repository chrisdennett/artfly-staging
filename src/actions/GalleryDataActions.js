import { firestoreDb as db } from "../libs/firebaseConfig";
import { ARTWORK_CHANGE } from "./GetArtworkActions";

export const GALLERY_FETCHED = "galleryFetched";
export const GALLERY_UPDATED = "galleryUpdated";
export const GALLERY_UPDATE_TRIGGERED = "galleryUpdateTriggers";

export function fetchUserGalleries(userId) {
    return (dispatch) => {
        db.collection('galleries')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        const galleryDataWithId = { ...doc.data(), galleryId: doc.id };

                        dispatch({
                            type: GALLERY_FETCHED,
                            payload: { [doc.id]: galleryDataWithId }
                        });
                    });
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
            .then((doc) => {
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
export function fetchUserGalleryArtworks(gallery) {
    return (dispatch) => {
        db.collection('artworks')
            .where('adminId', '==', gallery.key)
            .get()
            .then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        const artworkDataWithId = { ...doc.data(), artworkId: doc.id };

                        dispatch({
                            type: ARTWORK_CHANGE,
                            payload: { [doc.id]: artworkDataWithId }
                        });
                    });
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}


export function updateGallery(galleryId, newGalleryData) {

    return dispatch => {

        const galleryDataWithId = { ...newGalleryData, galleryId: galleryId, status:'updating' };
        dispatch({
            type: GALLERY_UPDATE_TRIGGERED,
            payload: { [galleryId]: galleryDataWithId }
        });

        db.collection('galleries').doc(galleryId)
            .set(newGalleryData)
            .then(() => {
                const galleryDataWithId = { ...newGalleryData, galleryId: galleryId, status:'updated' };
                dispatch({
                    type: GALLERY_UPDATED,
                    payload: { [galleryId]: galleryDataWithId }
                });
            })
    }
}