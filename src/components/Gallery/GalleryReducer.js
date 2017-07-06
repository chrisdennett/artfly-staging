import {
    NEW_GALLERY_COMING,
    FETCH_GALLERY,
    FETCH_GALLERY_ARTISTS } from './GalleryActions';
    // ARTWORK_CHANGE } from './GalleryActions';

export default function (state = {}, action) {
    let newState;

    switch (action.type) {
        case NEW_GALLERY_COMING:
            return {};

        case FETCH_GALLERY:
            const newData = action.payload;

            if (!newData) {
                newState = {};
            }
            else if (newData.galleryId !== state.galleryId) {
                newState = newData;
            }
            else {
                newState = { ...state, ...action.payload };
            }

            return newState;

        /*case ARTWORK_CHANGE:
            /!*This only returns one artwork at a time so perhaps name should be changed*!/
            newState = { ...state };
            newState.artworks = { ...state.artworks, ...action.payload };
            return newState;*/

        case FETCH_GALLERY_ARTISTS:
            /*This only returns one artist at a time so perhaps name should be changed*/
            newState = { ...state };
            newState.artists = { ...state.artists, ...action.payload };
            return newState;

        default:
            return state;
    }
}