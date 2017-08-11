import { combineReducers } from 'redux';

import CommunityReducer from './CommunityReducer';
import UserReducer from './UserReducer';
import ArtworksReducer from './ArtworksReducer';
import GalleriesReducer from './GalleriesReducer';
import ArtistsReducer from './ArtistsReducer';
import PhotoSelectorReducer from './PhotoSelectorReducer';
import ArtistArtworkIdsReducer from './ArtistArtworkIdsReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    galleries: GalleriesReducer,
    artists: ArtistsReducer,
    artworks: ArtworksReducer,
    artistsArtworkIds: ArtistArtworkIdsReducer,
    photoSelected: PhotoSelectorReducer,
    form: FormReducer
});

export default rootReducer;