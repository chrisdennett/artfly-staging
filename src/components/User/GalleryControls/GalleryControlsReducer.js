import { SHOW_NEXT_ARTWORK, SHOW_PREV_ARTWORK } from './GalleryControlsActions';
import { FETCH_GALLERY, FETCH_GALLERY_ARTWORKS} from '../../Gallery/GalleryActions';

export default function (state = null, action) {

    switch (action.type) {

        case FETCH_GALLERY:
            const galleryId = action.payload.galleryId;
            return {...state, galleryId};

        case FETCH_GALLERY_ARTWORKS:
            const newArtworkId = Object.keys(action.payload)[0];

            let newState = {...state};
            newState.artworkIds = {...state.artworkIds, newArtworkId};

           return newState;

        case SHOW_NEXT_ARTWORK:
            return state;

        case SHOW_PREV_ARTWORK:
            return state;

        default:
            return state;
    }
}