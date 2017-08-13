import { ADD_ARTWORK_UPLOAD_PROGRESS, CLEAR_IMAGE_UPLOAD } from '../actions/ArtistGalleryActions';

export default function (state = null, action) {
    switch (action.type) {

        case ADD_ARTWORK_UPLOAD_PROGRESS:
            return action.payload;

        case CLEAR_IMAGE_UPLOAD:
            return action.payload;

        default:
            return state;
    }
}