import { USER_AUTH_DELETE_ERROR, USER_DELETED_ERROR } from '../actions/DeleteUserActions';

export default function (state = {}, action) {
    switch (action.type) {

        case USER_DELETED_ERROR:
            return {...state, userDeleteError:action.payload};

        case USER_AUTH_DELETE_ERROR:
            return {...state, userAuthDeleteError:action.payload};

        default:
            return state;
    }
}