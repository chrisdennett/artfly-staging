import { IMAGE_UPLOAD_PROGRESS } from '../actions';

export default function (state = 0, action) {
    switch (action.type) {

        case IMAGE_UPLOAD_PROGRESS:
            return action.payload;

        default:
            return state;
    }
}
