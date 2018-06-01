import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT,
    USER_REQUESTED
} from '../actions/UserAuthActions';
import { USER_DELETED } from "../actions/DeleteUserActions";
// import ArtflyAccountTypes from '../app/global/ArtflyAccountTypes';

export default function (state = 'pending', action) {
    switch (action.type) {

        case USER_REQUESTED:
            return 'pending';

        case USER_SIGNED_IN:
            return { ...action.payload };

        case USER_SIGNED_OUT:
            return 'signed-out';

        case USER_DELETED:
            return 'deleted';

        default:
            return state;
    }
}

/*
case FETCH_USER:
            const userData = { ...action.payload };
            const { subscription } = userData;
            let subscriptionId = 0;

            if (subscription) {
                subscriptionId = subscription.planId;
            }

            const extraSubscriptionParams = ArtflyAccountTypes[subscriptionId];
            let maxArtworksReached = false;

            if (userData.totalArtworks && extraSubscriptionParams) {
                maxArtworksReached = userData.totalArtworks >= extraSubscriptionParams.maxArtworks;
            }

            return { ...state, ...action.payload, maxArtworksReached, subscription, ...extraSubscriptionParams };

*/