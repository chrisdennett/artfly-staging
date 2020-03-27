import { ARTWORK_DELETED } from '../actions/DeleteArtworkActions';
import { ARTWORK_CHANGE, USER_ARTWORKS_FETCHED } from '../actions/GetArtworkActions';
import { SAVING_ARTWORK_COMPLETE } from "../actions/SaveArtworkActions";

export default function (state = {}, action) {
    switch (action.type) {

        case ARTWORK_DELETED:
            const artworkId = action.payload;
            const deletedData = {isDeleted:true, artworkId };
            return { ...state, [artworkId]:deletedData};

        case USER_ARTWORKS_FETCHED:
            return { ...state, ...action.payload };

        case ARTWORK_CHANGE:
            return { ...state, ...action.payload };

        case SAVING_ARTWORK_COMPLETE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}