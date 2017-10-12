import { GET_GALLERY_PARAMS, SET_GALLERY_ZOOM, SET_WINDOW_SIZE } from '../actions/UiActions';

export default function (state = {galleryIsZoomedOut:true}, action) {
    switch (action.type) {
        case GET_GALLERY_PARAMS:
            return {...state, galleryParams:action.payload};
        case SET_GALLERY_ZOOM:
            return {...state, galleryIsZoomedOut:action.payload};
        case SET_WINDOW_SIZE:
            return {...state, windowSize:action.payload};
        default:
            return state;
    }
}