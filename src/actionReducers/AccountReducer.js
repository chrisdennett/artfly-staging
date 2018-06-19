import { ACCOUNT_FETCHED, ACCOUNT_UPDATED } from '../actions/UserAccountActions';
import { USER_SIGNED_OUT } from "../actions/UserAuthActions";

export default function (state = {}, action) {
    switch (action.type) {

        case ACCOUNT_FETCHED:
            return { ...state, ...action.payload };

        case ACCOUNT_UPDATED:
            return { ...state, ...action.payload };

        case USER_SIGNED_OUT:
            return {};

        default:
            return state;
    }
}