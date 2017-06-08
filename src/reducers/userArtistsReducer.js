import { FETCH_ARTISTS } from '../actions';
import { ADD_NEW_ARTIST } from '../actions';

export default function (state = {}, action) {

    let artistKey, artistData;

    switch (action.type) {
        case FETCH_ARTISTS:
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];
            return { ...state, [artistKey]: artistData };

        case ADD_NEW_ARTIST:
            artistKey = Object.keys(action.payload)[0];
            artistData = action.payload[artistKey];

            return { ...state, [artistKey]: artistData };
        default:
            return state;
    }
}
