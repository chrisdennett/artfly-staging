import { FETCH_ARTWORK_KEYS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ARTWORK_KEYS:
            return action.payload;
        default:
            return state;
    }
}

