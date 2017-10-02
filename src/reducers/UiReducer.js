import { SET_GALLERY_HEIGHT, GET_GALLERY_PARAMS } from '../actions/UiActions';

export default function (state = {}, action) {

    switch (action.type) {
        case GET_GALLERY_PARAMS:
            return {...state, galleryParams:action.payload};
        case SET_GALLERY_HEIGHT:
            return {...state, galleryHeight:action.payload};
        default:
            return state;
    }
}