import { IMAGE_UPLOAD_PROGRESS, CLEAR_IMAGE_UPLOAD, ADD_ARTWORK_COMPLETE } from '../actions/UserDataActions';

export default function (state = null, action) {

    switch (action.type) {

        case IMAGE_UPLOAD_PROGRESS:
            return action.payload;

        case CLEAR_IMAGE_UPLOAD:
            return action.payload;

        case ADD_ARTWORK_COMPLETE:
            return action.payload;

        default:
            return state;
    }
}