import { ARTWORK_CHANGE, ARTWORK_DELETED, USER_ARTWORKS_CHANGE } from '../actions/UserDataActions';

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_DELETED:
            const newState = { ...state };
            delete newState[action.payload];

            return newState;

        case ARTWORK_CHANGE:

            return { ...state, ...action.payload };

        case USER_ARTWORKS_CHANGE:
            return {...state, ...action.payload };

        default:
            return state;
    }
}