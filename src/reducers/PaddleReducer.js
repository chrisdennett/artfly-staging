import { FETCH_LOCAL_PRICE } from '../actions/PaddleActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_LOCAL_PRICE:
            return {...state, localPrice:action.payload};
        default:
            return state;
    }
}