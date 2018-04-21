import { combineReducers } from 'redux';

import UiReducer from './UiReducer';
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserReducer';
import ArtworksReducer from './ArtworksReducer';
import ImageUploadReducer from './ImageUploadReducer';
import FormReducer from './FormReducer';
import NotificationsReducer from "./NotificationsReducer";

const rootReducer = combineReducers({
    notifications: NotificationsReducer,
    ui: UiReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    artworks: ArtworksReducer,
    imageUploadInfo: ImageUploadReducer,
    form: FormReducer
});

export default rootReducer;