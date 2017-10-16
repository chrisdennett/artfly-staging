import { ARTIST_ARTWORK_IDS_CHANGE } from '../actions/UserDataActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_ARTWORK_IDS_CHANGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}