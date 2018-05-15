import { RESOURCE_CHANGE } from '../actions/GetArtworkActions';

export default function (state = {}, action) {
    switch (action.type) {

        case RESOURCE_CHANGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}