import { ADD_ARTWORK_COMPLETE, ADD_ARTWORK_UPLOAD_PROGRESS } from './ArtworkAdderActions';

export default function (state = {}, action) {
    let artistId, progress, artistUploadData;

    switch (action.type) {

        case ADD_ARTWORK_COMPLETE:
            artistId = action.payload.artistId;
            progress = action.payload.progress;
            artistUploadData = {progress: progress};

            return {...state, [artistId]:artistUploadData};

        case ADD_ARTWORK_UPLOAD_PROGRESS:
            artistId = action.payload.artistId;
            progress = action.payload.progress;
            artistUploadData = {progress: progress};

            return {...state, [artistId]:artistUploadData};

        default:
            return state;
    }
}