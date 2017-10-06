import { ARTIST_CHANGE, ARTIST_DELETED, ARTIST_ARTWORK_IDS_CHANGE } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_CHANGE:
            return { ...state, ...action.payload };

        case ARTIST_ARTWORK_IDS_CHANGE:
            const {artistId, artworkIds} = action.payload;
            let artistData = {...state[artistId]};
            artistData.artworkIds = artworkIds;
            artistData.totalArtworks = artworkIds.length;

            return { ...state, [artistId]:artistData };

        case ARTIST_DELETED:
            const newState = {...state};
            const idToDelete = action.payload;
            delete newState[idToDelete];

            return newState;

        default:
            return state;
    }
}