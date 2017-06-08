import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import UserAuthReducer from '../components/User/userAuthReducer';
import UserReducer from '../components/User/userReducer';
import UserArtistsReducer from '../components/User/userArtistsReducer';
import CurrentArtworkKeysReducer from '../components/Gallery/currentArtworkKeysReducer';
import CurrentArtworksReducer from '../components/Gallery/currentArtworksReducer';
import CurrentArtworkReducer from '../components/Artwork/currentArtworkReducer';
import UploadImageReducer from '../components/ArtworkAdder/uploadImageReducer';
import UploadImageProgressReducer from '../components/ArtworkAdder/uploadImageProgressReducer';
import FormReducer from './FormReducer';
// import {ADD_USER_ARTIST} from '../actions';

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
    form: FormReducer
});

export default rootReducer;
/*
 form: formReducer.plugin({
 NewArtistForm: (state, action) => {
 switch (action.type){
 case ADD_USER_ARTIST:
 return undefined;
 default:
 return state;
 }
 }
 })
 */