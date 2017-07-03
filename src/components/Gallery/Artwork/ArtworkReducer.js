import { SET_UP_FOR_NEW_ARTWORK, IMAGE_LOADED } from './ArtworkActions';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_UP_FOR_NEW_ARTWORK:
            return { status: "setup"};

        case IMAGE_LOADED:
            return { status: "loaded"};

        default:
            return state;
    }
}