import { ARTIST_CHANGE, ARTIST_DELETED, ARTIST_ARTWORK_IDS_CHANGE } from '../actions/ArtistGalleryActions';
// import { CLEAR_USER_DATA} from "../actions/UserActions";

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_CHANGE:

            const newData = action.payload;
            const id = newData.artistId;
            let data = {...state[id], ...newData};

            return { ...state, [id]:data };

        case ARTIST_ARTWORK_IDS_CHANGE:
            //NB The ids data value is the date added which is used for sorting
            const {artistId, artworkIds} = action.payload;
            let artistData = {...state[artistId]};
            artistData.artworkIds = artworkIds

            return { ...state, [artistId]:artistData };

       /* case CLEAR_USER_DATA:
            return {};*/

        case ARTIST_DELETED:
            const newState = {...state};
            const idToDelete = action.payload;
            delete newState[idToDelete];

            return newState;

        default:
            return state;
    }
}