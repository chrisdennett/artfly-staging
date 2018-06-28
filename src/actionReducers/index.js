import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserAuthReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import ErrorReducer from "./ErrorReducer";
import ArtworkSavingReducer from "./ArtworkSavingReducer";
import GalleryReducer from './GalleryReducer';
import AccountReducer from "./AccountReducer";
import DataFetchingReducer from "./DataFetchingReducer";
import UrlReducer from "./UrlReducer";

const rootReducer = combineReducers({
    dataFetching: DataFetchingReducer,
    routing: UrlReducer,
    user: UserAuthReducer,
    account: AccountReducer,
    artworkSavingProgress: ArtworkSavingReducer,
    errors: ErrorReducer,
    paddle: PaddleReducer,
    artworks: ArtworksReducer,
    galleries: GalleryReducer
});

export default rootReducer;