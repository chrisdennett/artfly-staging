import { ACCOUNT_FETCHED, ACCOUNT_UPDATED } from '../actions/UserAccountActions';
import { USER_SIGNED_OUT } from "../actions/UserAuthActions";
import {USER_DATA_DELETED} from "../actions/DeleteUserActions";
import { USER_ARTWORKS_FETCHED } from "../actions/GetArtworkActions";

export default function (state = {}, action) {
    switch (action.type) {

        case ACCOUNT_FETCHED:
            return { ...state, ...action.payload };

        case USER_ARTWORKS_FETCHED:
            return { ...state, userArtworkIds:Object.keys(action.payload) };

        case ACCOUNT_UPDATED:
            return { ...state, ...action.payload };

        case USER_SIGNED_OUT:
            return {};

        case USER_DATA_DELETED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}