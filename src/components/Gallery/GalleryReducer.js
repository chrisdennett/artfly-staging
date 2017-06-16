import { FETCH_GALLERY, FETCH_GALLERY_ARTISTS } from './GalleryActions';

export default function (state = {}, action) {

    let artistKey, artistData, newState;

    switch (action.type) {
        case FETCH_GALLERY:
            return action.payload;

        case FETCH_GALLERY_ARTISTS:
            newState = { ...state };
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            newState.artists = { ...state.artists, [artistKey]: artistData };
            return newState;

        default:
            return state;
    }
}