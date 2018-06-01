import {USER_DELETED_ERROR} from '../actions/DeleteUserActions';

export default function (state = {}, action) {
    switch (action.type) {

        case USER_DELETED_ERROR:
            return {...state, userDeleteError:action.payload};

        default:
            return state;
    }
}