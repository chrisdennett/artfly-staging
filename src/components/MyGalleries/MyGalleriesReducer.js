import { CURRENT_ARTIST_UPDATED, ARTIST_UPDATED, ARTIST_UPDATE_CANCELLED } from './MyGalleriesActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_UPDATED:
            return { ...state, currentArtist: {}, updatedArtist: action.payload };

        case CURRENT_ARTIST_UPDATED:
            return { ...state, currentArtist: action.payload };

        case ARTIST_UPDATE_CANCELLED:
            return { ...state, currentArtist: {} };

        default:
            return state;
    }
}