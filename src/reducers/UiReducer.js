import { SET_GALLERY_HEIGHT } from '../actions/UiActions';

export default function (state = {}, action) {

    switch (action.type) {
        case SET_GALLERY_HEIGHT:
            return {...state, galleryHeight:action.payload};
        default:
            return state;
    }
}