import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import UserAuthReducer from './userAuthReducer';
import UserReducer from './userReducer';
import UserArtistsReducer from './userArtistsReducer';
import CurrentArtworkKeysReducer from './currentArtworkKeysReducer';
import CurrentArtworksReducer from './currentArtworksReducer';
import CurrentArtworkReducer from './currentArtworkReducer';
import UploadImageReducer from './uploadImageReducer';
import UploadImageProgressReducer from './uploadImageProgressReducer';
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