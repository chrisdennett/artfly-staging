import { reducer as formReducer } from 'redux-form';

import { ADD_NEW_ARTIST } from '../actions';
import { CANCEL_ADD_ARTIST } from '../actions';

const artistProps = {
    artistName: "Secret artist",
    biog: "One of the best artists know to humankind."
};
const initialArtistFormValues = {
    initialValues: artistProps,
    values: artistProps
};

export default formReducer.plugin({
    NewArtistForm: (state, action) => {

        switch (action.type) {
            case ADD_NEW_ARTIST:
                // could return undefined to empty the fields
                return initialArtistFormValues;
            case CANCEL_ADD_ARTIST:
                return initialArtistFormValues;
            default:
                return state;
        }
    }
});
