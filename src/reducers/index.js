import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserAuthReducer from './userAuthReducer';
import UserReducer from './userReducer';
import UserArtistsReducer from './userArtistsReducer';
import CurrentArtworkKeysReducer from './currentArtworkKeysReducer';
import CurrentArtworksReducer from './currentArtworksReducer';
import CurrentArtworkReducer from './currentArtworkReducer';
import UploadImageReducer from './uploadImageReducer';
import UploadImageProgressReducer from './uploadImageProgressReducer';

// formReducer has to be applied to the form property for all forms to use it.
const rootReducer = combineReducers({
    userAuth: UserAuthReducer,
    user: UserReducer,
    userArtists: UserArtistsReducer,
    currentArtworkKeys: CurrentArtworkKeysReducer,
    currentArtworks: CurrentArtworksReducer,
    currentArtwork: CurrentArtworkReducer,
    imageUpload: UploadImageReducer,
    imageUploadProgress: UploadImageProgressReducer,
    form: formReducer
});

export default rootReducer;