import { FETCH_USER, CREATE_USER } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload;
        case CREATE_USER:
            return action.payload;
        default:
            return state;
    }
}