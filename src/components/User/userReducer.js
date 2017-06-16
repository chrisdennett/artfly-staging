import {
    FETCH_USER,
    FETCH_USER_ARTISTS,
    FETCH_USER_GALLERY,
    ADD_USER_ARTIST,
    CREATE_USER,
    LOGOUT_USER
} from './UserActions';

export default function (state = null, action) {

    let artistKey, artistData, newState;

    switch (action.type) {

        case LOGOUT_USER:
            return {};

        case FETCH_USER:
            return {...state, ...action.payload};

        case FETCH_USER_GALLERY:
            return {...state, gallery:action.payload};

        case FETCH_USER_ARTISTS:
            newState = { ...state };
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            newState.artists = { ...state.artists, [artistKey]: artistData };
            return newState;

        case ADD_USER_ARTIST:
            newState = { ...state };
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            newState.artists = { ...state.artists, [artistKey]: artistData };
            return newState;

        case CREATE_USER:
            return action.payload;

        default:
            return state;
    }
}