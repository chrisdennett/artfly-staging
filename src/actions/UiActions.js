export const GET_GALLERY_PARAMS = "getGalleryParams";
export const SET_GALLERY_ZOOM = "setGalleryZoom";
export const SET_WINDOW_SIZE = "setWindowSize";

const mobileMaxWidth = 500;

export function setGalleryZoom(isZoomedOut) {
    return dispatch => {
        dispatch({
            type: SET_GALLERY_ZOOM,
            payload: isZoomedOut
        })
    }
}

export function setWindowSize(w,h){
    return dispatch => {
        dispatch({
            type: SET_WINDOW_SIZE,
            payload: {windowWidth:w, windowHeight:h, inMobileMode:w<mobileMaxWidth}
        })
    }
}