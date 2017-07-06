import { combineReducers } from 'redux';

import CommunityReducer from '../components/Home/CommunityReducer';
import UserReducer from '../components/User/UserReducer';
import GalleryReducer from '../components/Gallery/GalleryReducer';
import ArtworkReducer from '../components/Gallery/Artwork/ArtworkReducer';
import ImageUploaderReducer from '../components/User/ArtworkAdder/ArtworkAdderReducer';
import ControlPanelReducer from '../components/MyGalleries/MyGalleriesReducer';
import ArtworkEditorReducer from '../components/ArtworkEditor/ArtworkEditorReducer';
import ArtworksReducer from './ArtworksReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    gallery: GalleryReducer,
    artworks: ArtworksReducer,
    artwork: ArtworkReducer,
    artworkToEdit: ArtworkEditorReducer,
    imageUploader: ImageUploaderReducer,
    controlPanel: ControlPanelReducer,
    form: FormReducer
});

export default rootReducer;