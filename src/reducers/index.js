import { combineReducers } from 'redux';

import CommunityReducer from '../components/Home/CommunityReducer';
import UserReducer from '../components/User/UserReducer';
import ArtworkReducer from '../components/Gallery/Artwork/ArtworkReducer';
import ImageUploaderReducer from '../components/User/ArtworkAdder/ArtworkAdderReducer';
import ControlPanelReducer from '../components/MyGalleries/MyGalleriesReducer';
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
    controlPanel: ControlPanelReducer,
    form: FormReducer
});

export default rootReducer;