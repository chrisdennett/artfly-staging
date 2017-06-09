import { FETCH_GALLERY_ARTISTS } from './GalleryActions';

export default function (state = {}, action) {

    let artistKey, artistData;

    switch (action.type) {
        case FETCH_GALLERY_ARTISTS:
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            return { ...state, [artistKey]: artistData };
        default:
            return state;
    }
}
