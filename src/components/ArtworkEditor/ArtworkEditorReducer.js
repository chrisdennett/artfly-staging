import { ARTWORK_TO_EDIT_CHANGE } from './ArtworkEditorActions';
import { ADD_ARTWORK_UPLOAD_PROGRESS, ADD_ARTWORK_COMPLETE} from '../User/ArtworkAdder/ArtworkAdderActions';

export default function (state = {}, action) {
    switch (action.type) {

        case ADD_ARTWORK_UPLOAD_PROGRESS:
            return {...state, ...action.payload};

        case ADD_ARTWORK_COMPLETE:
            return {...state, ...action.payload};

        case ARTWORK_TO_EDIT_CHANGE:
            return {id:action.payload};

        default:
            return state;
    }
}