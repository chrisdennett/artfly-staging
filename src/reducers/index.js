import { combineReducers } from 'redux';

import UserReducer from '../components/User/UserReducer';
import UploadImageReducer from '../components/ControlPanel/ArtworkAdder/uploadImageReducer';
import UploadImageProgressReducer from '../components/ControlPanel/ArtworkAdder/uploadImageProgressReducer';
import GalleryReducer from '../components/Gallery/GalleryReducer';
import CommunityReducer from '../components/Home/CommunityReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    gallery: GalleryReducer,
    imageUpload: UploadImageReducer,
    imageUploadProgress: UploadImageProgressReducer,
    form: FormReducer
});

export default rootReducer;