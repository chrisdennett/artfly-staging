import { ARTWORK_CHANGE } from '../components/ArtistGallery/ArtistGalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_CHANGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}