import { FETCH_ARTWORK, FETCHING_ARTWORK } from './ArtworkActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCHING_ARTWORK:
            return {};

        case FETCH_ARTWORK:
            return action.payload;
        default:
            return state;
    }
}