import { ARTIST_ARTWORK_IDS_CHANGE } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_ARTWORK_IDS_CHANGE:
            return action.payload;

        default:
            return state;
    }
}