import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import ImageUploadReducer from './ImageUploadReducer';
import FormReducer from './FormReducer';
import NotificationsReducer from "./NotificationsReducer";
import ResourcesReducer from "./ResourcesReducer";
import ErrorReducer from "./ErrorReducer";

const rootReducer = combineReducers({
    errors: ErrorReducer,
    notifications: NotificationsReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    artworks: ArtworksReducer,
    resources: ResourcesReducer,
    imageUploadInfo: ImageUploadReducer,
    form: FormReducer
});

export default rootReducer;