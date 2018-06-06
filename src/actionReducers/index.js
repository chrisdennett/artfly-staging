import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import FormReducer from './FormReducer';
import NotificationsReducer from "./NotificationsReducer";
import ErrorReducer from "./ErrorReducer";
import ArtworkSavingReducer from "./ArtworkSavingReducer";

const rootReducer = combineReducers({
    artworkSavingProgress: ArtworkSavingReducer,
    errors: ErrorReducer,
    notifications: NotificationsReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    artworks: ArtworksReducer,
    form: FormReducer
});

export default rootReducer;