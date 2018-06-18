import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import NotificationsReducer from "./NotificationsReducer";
import ErrorReducer from "./ErrorReducer";
import ArtworkSavingReducer from "./ArtworkSavingReducer";
import GalleryReducer from './GalleryReducer';

const rootReducer = combineReducers({
    artworkSavingProgress: ArtworkSavingReducer,
    errors: ErrorReducer,
    notifications: NotificationsReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    artworks: ArtworksReducer,
    galleries: GalleryReducer
});

export default rootReducer;