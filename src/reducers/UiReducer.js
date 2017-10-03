import { GET_GALLERY_PARAMS, SET_GALLERY_ZOOM } from '../actions/UiActions';

export default function (state = {}, action) {

    switch (action.type) {
        case GET_GALLERY_PARAMS:
            return {...state, galleryParams:action.payload};
        case SET_GALLERY_ZOOM:
            return {...state, galleryIsZoomedOut:action.payload};
        default:
            return state;
    }
}