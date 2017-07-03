import { combineReducers } from 'redux';

import CommunityReducer from '../components/Home/CommunityReducer';
import UserReducer from '../components/User/UserReducer';
import GalleryReducer from '../components/Gallery/GalleryReducer';
import ArtworkReducer from '../components/Gallery/Artwork/ArtworkReducer';
import ImageUploaderReducer from '../components/ControlPanel/ArtworkAdder/ImageUploaderReducer';
import ControlPanelReducer from '../components/ControlPanel/ControlPanelReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    gallery: GalleryReducer,
    artwork: ArtworkReducer,
    imageUploader: ImageUploaderReducer,
    controlPanel: ControlPanelReducer,
    form: FormReducer
});

export default rootReducer;