import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import ErrorReducer from "./ErrorReducer";
import ArtworkSavingReducer from "./ArtworkSavingReducer";
import GalleryReducer from './GalleryReducer';
import AccountReducer from "./AccountReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    account: AccountReducer,
    artworkSavingProgress: ArtworkSavingReducer,
    errors: ErrorReducer,
    paddle: PaddleReducer,
    artworks: ArtworksReducer,
    galleries: GalleryReducer
});

export default rootReducer;