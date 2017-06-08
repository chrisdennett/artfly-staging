import { UPLOAD_IMAGE } from './ArtworkAdderActions';

export default function (state = {}, action) {
    switch (action.type) {

        case UPLOAD_IMAGE:
            return action.payload;

        default:
            return state;
    }
}