import { GALLERY_FETCHED } from '../actions/GalleryDataActions';

export default function (state = {}, action) {
    switch (action.type) {

        case GALLERY_FETCHED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}