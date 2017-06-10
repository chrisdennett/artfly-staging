import { FETCH_USER, CREATE_USER } from './UserActions';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload;
        case CREATE_USER:
            return action.payload;
        default:
            return state;
    }
}