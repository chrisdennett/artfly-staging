import { FETCH_ARTWORK } from '../actions';

export default function (state = {}, action){
    switch (action.type) {
        case FETCH_ARTWORK:
            return action.payload;
        default:
            return state;
    }
}