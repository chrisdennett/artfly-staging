import { FETCH_COMMUNITY_DATA } from './CommunityActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_COMMUNITY_DATA:
            return action.payload;
        default:
            return state;
    }
}