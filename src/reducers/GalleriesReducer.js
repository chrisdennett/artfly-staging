import { NEW_GALLERY_COMING, FETCH_GALLERY } from '../components/ArtistGallery/ArtistGalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case NEW_GALLERY_COMING:
            // TODO: add a message for the specific ID being updated
            return state;

        case FETCH_GALLERY:
            const galleryId = action.payload.galleryId;
            return {...state, [galleryId]:action.payload};

        default:
            return state;
    }
}