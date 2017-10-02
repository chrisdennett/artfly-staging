export const SET_GALLERY_HEIGHT = "setGalleryHeight";

export function setGalleryHeight(galleryHeight) {

    return dispatch => {
        dispatch({
            type: SET_GALLERY_HEIGHT,
            payload: galleryHeight
        })
    }
}