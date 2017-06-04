import { UPLOAD_IMAGE, CLEAR_IMAGE_UPLOAD, DELETE_IMAGE_UPLOAD } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {

        case UPLOAD_IMAGE:
            return action.payload;

        case CLEAR_IMAGE_UPLOAD:
            return action.payload;

        case DELETE_IMAGE_UPLOAD:
            return action.payload;

        default:
            return state;
    }
}