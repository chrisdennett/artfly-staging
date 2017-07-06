import { ADD_ARTWORK_COMPLETE } from '../components/User/ArtworkAdder/ArtworkAdderActions';
import { ARTWORK_CHANGE } from '../components/Gallery/GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_CHANGE:
            return { ...state, ...action.payload };

        case ADD_ARTWORK_COMPLETE:
            const { artwork } = action.payload;
            const { id } = artwork;

            return { ...state, [id]: artwork };

        default:
            return state;
    }
}