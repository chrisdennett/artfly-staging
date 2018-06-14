import { ARTWORK_DELETED } from '../actions/DeleteArtworkActions';
import { ARTWORK_CHANGE } from '../actions/GetArtworkActions';
import { SAVING_ARTWORK_COMPLETE } from "../actions/SaveArtworkActions";

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_DELETED:
            const newState = { ...state };
            delete newState[action.payload];

            return newState;

        case ARTWORK_CHANGE:
            return { ...state, ...action.payload };

        case SAVING_ARTWORK_COMPLETE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}