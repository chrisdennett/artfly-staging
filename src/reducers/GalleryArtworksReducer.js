import { ADD_ARTWORK_COMPLETE } from '../components/User/ArtworkAdder/ArtworkAdderActions';
import { GALLERY_ARTWORK_CHANGE } from '../components/Gallery/GalleryActions';

export default function (state = {}, action) {
    switch (action.type) {

        case GALLERY_ARTWORK_CHANGE:
            const { galleryId, artworkId, artworkData} = action.payload;
            const currentGalleryData = !state[galleryId] ? {} : state[galleryId];
            const newGalleryData = { ...currentGalleryData, [artworkId]:artworkData};

            return { ...state, [galleryId]:newGalleryData };

        case ADD_ARTWORK_COMPLETE:
            const { artwork } = action.payload;
            const { id } = artwork;

            return { ...state, [id]: artwork };

        default:
            return state;
    }
}