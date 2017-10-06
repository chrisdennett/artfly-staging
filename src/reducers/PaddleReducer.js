import { FETCH_LOCAL_PRICE, SUBSCRIBE_USER, UPDATE_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from '../actions/PaddleActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_LOCAL_PRICE:
            return {...state, localPrice:action.payload};
        case SUBSCRIBE_USER:
            return {...state, newSubscriptionStatus:action.payload};
        case UPDATE_SUBSCRIPTION:
            return {...state, updateSubscriptionStatus:action.payload};
        case CANCEL_SUBSCRIPTION:
            return {...state, cancelSubscriptionStatus:action.payload};
        default:
            return state;
    }
}