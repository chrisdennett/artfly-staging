import {
    LAST_MANUAL_USER_SIGN_IN_UPDATED, USER_SIGNED_OUT
} from '../actions/UserAuthActions';
// import ArtflyAccountTypes from '../app/global/ArtflyAccountTypes';

export default function (state = -1, action) {
    switch (action.type) {

        case LAST_MANUAL_USER_SIGN_IN_UPDATED:
            return action.payload;

        case USER_SIGNED_OUT:
            return -1;

        default:
            return state;
    }
}
