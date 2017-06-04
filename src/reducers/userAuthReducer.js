import { FETCH_USER_AUTH } from '../actions';

// FETCH_USER_AUTH is triggered when logging in and out
// so not dealt with LOGIN_USER and LOGOUT_USER actions, but could do here if needed
export default function (state = {}, action){
    switch (action.type) {
        case FETCH_USER_AUTH:
            return action.payload;
        default:
            return state;
    }
}