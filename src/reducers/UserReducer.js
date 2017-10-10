import {
    FETCH_USER,
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    DELETE_USER
} from '../actions/UserActions';
import ArtflyAccountTypes from '../components/global/ArtflyAccountTypes';

export default function (state = {}, action) {

    switch (action.type) {

        case LOGIN_USER:
            return state;

        case LOGOUT_USER:
            return { status: 'none' };

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

        /*case ARTIST_ARTWORK_IDS_CHANGE:
            //NB The ids data value is the date added which is used for sorting
            const {artistId, totalArtworks} = action.payload;
            const currentArtistTotals = {...state.artistArtworkTotals, [artistId]:totalArtworks};
            const artistIds = Object.keys(currentArtistTotals);
            let total = 0;
            for(let id of artistIds){
                total += currentArtistTotals[id];
            }

            let userAccountType = 'free';
            // TODO: Store subscription.planId for each subscription type as the key and put names like 'family' as a field
            if(state.subscription && state.subscription.status === 'active'){
                userAccountType = 'family'
            }

            const maxArtworksAllowed = ArtflyAccountTypes[userAccountType].maxArtworks;
            const maxArtworksReached = total >= maxArtworksAllowed;

            return { ...state, artistArtworkTotals: currentArtistTotals, totalArtworks:total, maxArtworksReached:maxArtworksReached };
*/
        default:
            return state;
    }
}