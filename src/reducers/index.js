import { combineReducers } from 'redux';

import UserAuthReducer from '../components/User/userAuthReducer';
import UserReducer from '../components/User/userReducer';
import UserArtistsReducer from '../components/User/userArtistsReducer';
import CurrentArtworkKeysReducer from '../components/Gallery/currentArtworkKeysReducer';
import CurrentArtworksReducer from '../components/Gallery/currentArtworksReducer';
import CurrentArtworkReducer from '../components/Artwork/currentArtworkReducer';
import UploadImageReducer from '../components/ControlPanel/ArtworkAdder/uploadImageReducer';
import UploadImageProgressReducer from '../components/ControlPanel/ArtworkAdder/uploadImageProgressReducer';
import GalleryReducer from '../components/Gallery/GalleryReducer';
import GalleryArtistsReducer from '../components/Gallery/galleryArtistsReducer';
import FormReducer from './FormReducer';
import CommunityReducer from '../components/Home/CommunityReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    userAuth: UserAuthReducer,
    user: UserReducer,
    gallery: GalleryReducer,
    galleryArtists: GalleryArtistsReducer,
    userArtists: UserArtistsReducer,
    currentArtworkKeys: CurrentArtworkKeysReducer,
    currentArtworks: CurrentArtworksReducer,
    currentArtwork: CurrentArtworkReducer,
    imageUpload: UploadImageReducer,
    imageUploadProgress: UploadImageProgressReducer,
    form: FormReducer
});

export default rootReducer;