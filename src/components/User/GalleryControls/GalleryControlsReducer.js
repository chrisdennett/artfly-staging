import { SHOW_NEXT_ARTWORK, SHOW_PREV_ARTWORK } from './GalleryControlsActions';

export default function (state = null, action) {

    switch (action.type) {

        case SHOW_NEXT_ARTWORK:
            return state;

        case SHOW_PREV_ARTWORK:
            return state;

        default:
            return state;
    }
}