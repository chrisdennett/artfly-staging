import {
    FETCH_USER,
    CREATE_USER,
    SIGN_IN_USER,
    SIGN_OUT_USER,
    DELETE_USER,
    SIGN_IN_USER_TRIGGERED
} from '../actions/UserDataActions';
import ArtflyAccountTypes from '../components/global/ArtflyAccountTypes';

export default function (state = {}, action) {
    switch (action.type) {

        case SIGN_IN_USER_TRIGGERED:
            return { ...state, loginStatus: 'pending' };

        case SIGN_IN_USER:
            return state;

        case SIGN_OUT_USER:
            return action.payload;

        case DELETE_USER:
            return {};

        case FETCH_USER:
            const userData = { ...action.payload };

            const { artistIds, subscription } = userData;
            let totalArtworks = 0;
            let subscriptionId = 0;

            if (artistIds) {
                const artistIdKeys = Object.keys(artistIds);
                let artistTotal;
                for(let key of artistIdKeys){
                    artistTotal = artistIds[key].totalArtworks ? artistIds[key].totalArtworks : 0;
                    totalArtworks += artistTotal;
                }
            }

            if(subscription){
                subscriptionId = subscription.subscriptionId;
            }

            const extraSubscriptionParams = ArtflyAccountTypes[subscriptionId];
            const maxArtworksReached = totalArtworks >= extraSubscriptionParams.maxArtworks;

            return { ...state, ...action.payload, totalArtworks, maxArtworksReached, subscription, ...extraSubscriptionParams };

        case CREATE_USER:
            // Doesn't need to return anything because there is a libs listener on the user
            // that will trigger FETCH_USER
            return state;

        default:
            return state;
    }
}