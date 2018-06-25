import { USER_ARTWORKS_FETCH_TRIGGERED, USER_ARTWORKS_FETCHED } from "../actions/GetArtworkActions";

const defaultState = {
    userArtworks:'not_called'
};

export default function (state = defaultState, action) {
    switch (action.type){
        case USER_ARTWORKS_FETCH_TRIGGERED:
            return {...state, userArtworks:'fetching'};

        case USER_ARTWORKS_FETCHED:
            return {...state, userArtworks:'fetched'};

        default:
            return state;
    }
}