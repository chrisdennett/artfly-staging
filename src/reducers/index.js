import { combineReducers } from 'redux';

import CommunityReducer from '../components/Home/CommunityReducer';
import UserReducer from '../components/User/UserReducer';
import ArtworkReducer from '../components/Artwork/ArtworkReducer';
import ImageUploaderReducer from '../components/ArtworkAdder/ArtworkAdderReducer';
import ArtworkEditorReducer from '../components/ArtworkEditor/ArtworkEditorReducer';
import ArtworksReducer from './ArtworksReducer';
import GalleriesReducer from './GalleriesReducer';
import ArtistsReducer from './ArtistsReducer';
import ArtistArtworkIdsReducer from './ArtistArtworkIdsReducer';
import FormReducer from './FormReducer';

const rootReducer = combineReducers({
    communityData: CommunityReducer,
    user: UserReducer,
    galleries: GalleriesReducer,
    artists: ArtistsReducer,
    artworks: ArtworksReducer,
    artistsArtworkIds: ArtistArtworkIdsReducer,
    artwork: ArtworkReducer,
    artworkToEdit: ArtworkEditorReducer,
    imageUploader: ImageUploaderReducer,
    form: FormReducer
});

export default rootReducer;