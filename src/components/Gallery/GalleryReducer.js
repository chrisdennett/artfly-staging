import { FETCH_GALLERY, FETCH_GALLERY_ARTISTS, FETCH_GALLERY_ARTWORKS } from './GalleryActions';

export default function (state = {}, action) {

    let newState;

    switch (action.type) {
        case FETCH_GALLERY:
            return {...state, ...action.payload};

        case FETCH_GALLERY_ARTWORKS:
            newState = {...state};
            newState.artworks = {...state.artworks, ...action.payload}
            return newState;

        case FETCH_GALLERY_ARTISTS:
            newState = { ...state };
            newState.artists = { ...state.artists, ...action.payload };
            return newState;

        default:
            return state;
    }
}