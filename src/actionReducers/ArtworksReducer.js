import { ARTWORK_CHANGE } from '../actions/UserDataActions';
// import { CLEAR_USER_DATA} from "../actions/UserActions";

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_CHANGE:
            return { ...state, ...action.payload };

       /* case CLEAR_USER_DATA:
            return {};*/

        default:
            return state;
    }
}