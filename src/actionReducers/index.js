import { combineReducers } from 'redux';

import UiReducer from './UiReducer';
import PaddleReducer from './PaddleReducer';
import UserReducer from './UserReducer';
import ArtworksReducer from './ArtworksReducer';
import ArtistsReducer from './ArtistsReducer';
import ImageUploadReducer from './ImageUploadReducer';
import FormReducer from './FormReducer';
import ArtistsArtworkIdsReducer from "./ArtistsArtworkIdsReducer";

const rootReducer = combineReducers({
    ui: UiReducer,
    paddle: PaddleReducer,
    user: UserReducer,
    artists: ArtistsReducer,
    artistArtworkIds: ArtistsArtworkIdsReducer,
    artworks: ArtworksReducer,
    imageUploadInfo: ImageUploadReducer,
    form: FormReducer
});

export default rootReducer;