import { ARTIST_ARTWORK_IDS_CHANGE } from '../components/AppControls/UserControls/UserActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_ARTWORK_IDS_CHANGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}