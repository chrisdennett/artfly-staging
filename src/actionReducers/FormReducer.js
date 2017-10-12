import { reducer as formReducer } from 'redux-form';

// import { ADD_NEW_ARTIST, CANCEL_ADD_ARTIST } from '../components/User/UserActions';

// formReducer has to be applied to the form property so that all forms to use it.
// each form is a named property in the form data

/*const artistProps = {
    artistName: "Secret artist",
    biog: "One of the best artists know to humankind."
};
const initialArtistFormValues = {
    initialValues: artistProps,
    values: artistProps
};*/

export default formReducer.plugin({
    AddOrEditArtistForm: (state, action) => {
        switch (action.type) {
            /*case ADD_NEW_ARTIST:
                // could return undefined to empty the fields
                return initialArtistFormValues;
            case CANCEL_ADD_ARTIST:
                return initialArtistFormValues;*/
            default:
                return state;
        }
    }
});
