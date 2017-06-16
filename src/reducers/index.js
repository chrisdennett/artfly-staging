import { combineReducers } from 'redux';

import UserReducer from '../components/User/userReducer';
import CurrentArtworksReducer from '../components/Gallery/currentArtworksReducer';
import CurrentArtworkReducer from '../components/Artwork/currentArtworkReducer';
import UploadImageReducer from '../components/ControlPanel/ArtworkAdder/uploadImageReducer';
import UploadImageProgressReducer from '../components/ControlPanel/ArtworkAdder/uploadImageProgressReducer';
import GalleryReducer from '../components/Gallery/GalleryReducer';
import FormReducer from './FormReducer';
import CommunityReducer from '../components/Home/CommunityReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    gallery: GalleryReducer,
    currentArtworks: CurrentArtworksReducer,
    currentArtwork: CurrentArtworkReducer,
    imageUpload: UploadImageReducer,
    imageUploadProgress: UploadImageProgressReducer,
    form: FormReducer
});

export default rootReducer;