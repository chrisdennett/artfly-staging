import { USER_SIGNED_OUT } from "../actions/UserAuthActions";
import {SUBSCRIPTION_FETCHED} from "../actions/UserSubscriptionActions";

export default function (state = {}, action) {
    switch (action.type) {

        case SUBSCRIPTION_FETCHED:
            return { ...state, ...action.payload };

        case USER_SIGNED_OUT:
            return {};

        default:
            return state;
    }
}