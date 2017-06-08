import { FETCH_ARTWORKS } from './GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ARTWORKS:
            /*const artworkKey = action.payload.artworkId;
            const artworkData = action.payload.artworkData;
            return { ...state, [artworkKey]: artworkData };*/
            return action.payload;
        default:
            return state;
    }
}

