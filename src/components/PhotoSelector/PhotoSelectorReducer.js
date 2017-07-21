import { NEW_PHOTO_SELECTED, CLEAR_PHOTO_SELECTED } from './PhotoSelectorActions';

export default function (state = null, action) {
    switch (action.type) {

        case NEW_PHOTO_SELECTED:
            const imageFile = action.payload;

            return imageFile;

        case CLEAR_PHOTO_SELECTED:
            return null;

        default:
            return state;
    }
}