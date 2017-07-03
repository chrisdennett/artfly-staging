import { SET_UP_FOR_NEW_ARTWORK, IMAGE_LOADED } from './ArtworkActions';

export default function (state = {}, action) {
    switch (action.type) {

        case SET_UP_FOR_NEW_ARTWORK:
            return {...state, status: "setup"};

        case IMAGE_LOADED:
            return {...state, status: "loaded"};

       /* case SET_ARTWORK_ID:
            return {...state, artworkId:action.payload};*/

        default:
            return state;
    }
}