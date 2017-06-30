import {
    FETCH_USER,
    FETCH_USER_ARTISTS,
    FETCH_USER_ARTIST_ARTWORK_IDS,
    FETCH_USER_GALLERY,
    ADD_USER_ARTIST,
    CREATE_USER,
    LOGOUT_USER
} from './UserActions';

export default function (state = {}, action) {

    let artistKey, artistData, newState;

    switch (action.type) {

        case LOGOUT_USER:
            return {};

        case FETCH_USER:
            return { ...state, ...action.payload };

        case FETCH_USER_GALLERY:
            return { ...state, gallery: action.payload };

        case FETCH_USER_ARTISTS:
            newState = { ...state };
            artistKey = Object.keys(action.payload)[0];
            artistData = {...state.artists[artistKey], ...action.payload[artistKey]};

            // artistData = action.payload[artistKey];
            newState.artists = { ...state.artists, [artistKey]: artistData };
            return newState;

        case FETCH_USER_ARTIST_ARTWORK_IDS:
            // get the artist Id
            artistKey = Object.keys(action.payload)[0];
            const artistArtworkIds = action.payload[artistKey];
            // get a copy of the current artist's data
            artistData = {...state.artists[artistKey]};
            // add in the artwork Ids
            artistData.artworkIds = artistArtworkIds;
            // get a copy of the current state
            newState = { ...state };
            // update the artists data with the updated artist data
            newState.artists = { ...state.artists, [artistKey]: artistData };
            // return the new state
            return newState;

        case ADD_USER_ARTIST:
            newState = { ...state };
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            newState.artists = { ...state.artists, [artistKey]: artistData };
            return newState;

        case CREATE_USER:
            // Doesn't need to return anything because there is a firebase listener on the user
            // that will trigger FETCH_USER
            return state;

        default:
            return state;
    }
}