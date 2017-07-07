import { ARTIST_CHANGE } from '../components/Gallery/GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case ARTIST_CHANGE:
            return { ...state, ...action.payload };

               default:
            return state;
    }
}