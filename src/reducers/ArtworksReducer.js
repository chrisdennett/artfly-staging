import { ADD_ARTWORK_COMPLETE } from '../components/User/ArtworkAdder/ArtworkAdderActions';
import { GALLERY_ARTWORK_CHANGE } from '../components/Gallery/GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case GALLERY_ARTWORK_CHANGE:
            return { ...state, ...action.payload };

        case ADD_ARTWORK_COMPLETE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}