import { GALLERY_FETCHED, GALLERY_UPDATE_TRIGGERED, GALLERY_UPDATED } from '../actions/GalleryDataActions';
import { USER_SIGNED_OUT } from "../actions/UserAuthActions";

export default function (state = {}, action) {
    switch (action.type) {

        case GALLERY_UPDATE_TRIGGERED:
            return { ...state, ...action.payload };

        case GALLERY_UPDATED:
            return { ...state, ...action.payload };

        case GALLERY_FETCHED:
            return { ...state, ...action.payload };

        case USER_SIGNED_OUT:
            return {};

        default:
            return state;
    }
}