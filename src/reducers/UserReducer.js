import {
    FETCH_USER,
    CREATE_USER,
    LOGOUT_USER,
    DELETE_USER
} from '../actions/UserActions';

import {ARTIST_ARTWORK_IDS_CHANGE} from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case LOGOUT_USER:
            return {status:'none'};

        case DELETE_USER:
            return {};

        case FETCH_USER:
            return { ...state, ...action.payload };

        case CREATE_USER:
            // Doesn't need to return anything because there is a libs listener on the user
            // that will trigger FETCH_USER
            return state;

        case ARTIST_ARTWORK_IDS_CHANGE:
            //NB The ids data value is the date added which is used for sorting
            const {artistId, totalArtworks} = action.payload;
            const currentArtistTotals = {...state.artistArtworkTotals, [artistId]:totalArtworks};
            const artistIds = Object.keys(currentArtistTotals);
            let total = 0;
            for(let id of artistIds){
                total += currentArtistTotals[id];
            }

            return { ...state, artistArtworkTotals: currentArtistTotals, totalArtworks:total };

        default:
            return state;
    }
}