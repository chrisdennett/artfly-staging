import { ARTIST_CHANGE, ARTIST_DELETED } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_CHANGE:

            const newData = action.payload;
            const id = newData.artistId;
            let data = {...state[id], ...newData};

            return { ...state, [id]:data };

        case ARTIST_DELETED:
            const newState = {...state};
            const idToDelete = action.payload;
            delete newState[idToDelete];

            return newState;

        default:
            return state;
    }
}