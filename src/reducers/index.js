import { combineReducers } from 'redux';

import CommunityReducer from './CommunityReducer';
import UiReducer from './UiReducer';
import UserReducer from './UserReducer';
import ArtworksReducer from './ArtworksReducer';
import GalleriesReducer from './GalleriesReducer';
import ArtistsReducer from './ArtistsReducer';
import ImageUploadReducer from './ImageUploadReducer';
import ArtistArtworkIdsReducer from './ArtistArtworkIdsReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    ui: UiReducer,
    user: UserReducer,
    galleries: GalleriesReducer,
    artists: ArtistsReducer,
    artworks: ArtworksReducer,
    artistsArtworkIds: ArtistArtworkIdsReducer,
    imageUploadInfo: ImageUploadReducer,
    form: FormReducer
});

export default rootReducer;