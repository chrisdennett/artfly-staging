import { combineReducers } from 'redux';

import CommunityReducer from './CommunityReducer';
import UiReducer from './UiReducer';
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserReducer';
import ArtworksReducer from './ArtworksReducer';
import GalleriesReducer from './GalleriesReducer';
import ArtistsReducer from './ArtistsReducer';
import ImageUploadReducer from './ImageUploadReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    ui: UiReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    galleries: GalleriesReducer,
    artists: ArtistsReducer,
    artworks: ArtworksReducer,
    imageUploadInfo: ImageUploadReducer,
    form: FormReducer
});

export default rootReducer;