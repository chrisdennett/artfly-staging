import { firestoreDb as db } from "../libs/firebaseConfig";

export const GALLERY_FETCHED = "memberRequested";

export function fetchUserGalleries(userId) {
    return (dispatch) => {
        db.collection('galleries')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        const galleryDataWithId = {...doc.data(), galleryId:doc.id};

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
export function fetchGalleryData(galleryId) {
    return dispatch => {

        db.collection('galleries').doc(galleryId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const galleryDataWithId = {...doc.data(), galleryId:doc.id};
                    dispatch({
                        type: GALLERY_FETCHED,
                        payload: { [galleryId]: galleryDataWithId }
                    });
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