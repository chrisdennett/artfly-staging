import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT,
    USER_REQUESTED
} from '../actions/UserAuthActions';
// import ArtflyAccountTypes from '../app/global/ArtflyAccountTypes';

export default function (state = 'pending', action) {
    switch (action.type) {

        case USER_REQUESTED:
            return 'pending';

        case USER_SIGNED_IN:
            return { ...action.payload };

        case USER_SIGNED_OUT:
            return 'signed-out';

        default:
            return state;
    }
}