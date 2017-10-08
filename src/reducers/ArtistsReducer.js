import { ARTIST_CHANGE, ARTIST_DELETED, ARTIST_ARTWORK_IDS_CHANGE } from '../actions/ArtistGalleryActions';

export default function (state = {}, action) {

    switch (action.type) {

        case ARTIST_CHANGE:
            return { ...state, ...action.payload };

        case ARTIST_ARTWORK_IDS_CHANGE:
            //NB The ids data value is the date added which is used for sorting
            const {artistId, artworkIds} = action.payload;
            let artistData = {...state[artistId]};
            artistData.artworkIds = artworkIds;
            artistData.totalArtworks = artworkIds ? Object.keys(artworkIds).length : 0;

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