import { FETCH_ARTWORKS } from './GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_ARTWORKS:
            return {...state, ...action.payload};

        default:
            return state;
    }
}

