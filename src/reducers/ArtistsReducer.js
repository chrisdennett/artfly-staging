import { ARTIST_CHANGE } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_CHANGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}