import { UPLOAD_IMAGE, IMAGE_UPLOAD_PROGRESS } from './ArtworkAdderActions';

export default function (state = {}, action) {
    let artistId, progress, artistUploadData;

    switch (action.type) {

        case UPLOAD_IMAGE:
            artistId = action.payload.artistId;
            progress = action.payload.progress;
            artistUploadData = {progress: progress};

            return {...state, [artistId]:artistUploadData};

        case IMAGE_UPLOAD_PROGRESS:
            artistId = action.payload.artistId;
            progress = action.payload.progress;
            artistUploadData = {progress: progress};

            return {...state, [artistId]:artistUploadData};

        default:
            return state;
    }
}