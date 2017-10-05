import { FETCH_LOCAL_PRICE, SUBSCRIBE_USER } from '../actions/PaddleActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_LOCAL_PRICE:
            return {...state, localPrice:action.payload};
        case SUBSCRIBE_USER:
            return {...state, newSubscriptionStatus:action.payload};
        default:
            return state;
    }
}