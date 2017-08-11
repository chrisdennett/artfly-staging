import { NEW_GALLERY_COMING, FETCH_GALLERY } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case NEW_GALLERY_COMING:
            // TODO: add a message for the specific ID being updated
            return state;

        case FETCH_GALLERY:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}