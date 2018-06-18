import { GALLERY_FETCHED, GALLERY_UPDATE_TRIGGERED, GALLERY_UPDATED } from '../actions/GalleryDataActions';

export default function (state = {}, action) {
    switch (action.type) {

        case GALLERY_UPDATE_TRIGGERED:
            return { ...state, ...action.payload };

        case GALLERY_UPDATED:
            return { ...state, ...action.payload };

        case GALLERY_FETCHED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}