import { combineReducers } from 'redux';
//
import PaddleReducer from './PaddleReducer';
import UserAuthReducer from './UserAuthReducer';
import ArtworksReducer from './ArtworksReducer';
import ErrorReducer from "./ErrorReducer";
import ArtworkSavingReducer from "./ArtworkSavingReducer";
import AccountReducer from "./AccountReducer";
import DataFetchingReducer from "./DataFetchingReducer";
import UrlReducer from "./UrlReducer";
import SubscriptionReducer from "./SubscriptionReducer";

const rootReducer = combineReducers({
    dataFetching: DataFetchingReducer,
    routing: UrlReducer,
    user: UserAuthReducer,
    account: AccountReducer,
    subscription: SubscriptionReducer,
    artworkSavingProgress: ArtworkSavingReducer,
    errors: ErrorReducer,
    paddle: PaddleReducer,
    artworks: ArtworksReducer,
});

export default rootReducer;