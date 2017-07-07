import {
    FETCH_USER,
    CREATE_USER,
    LOGOUT_USER
} from './UserActions';

export default function (state = {}, action) {

    switch (action.type) {

        case LOGOUT_USER:
            return {};

        case FETCH_USER:
            return { ...state, ...action.payload };

        case CREATE_USER:
            // Doesn't need to return anything because there is a firebase listener on the user
            // that will trigger FETCH_USER
            return state;

        default:
            return state;
    }
}