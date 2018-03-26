// externals
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// styles
import './newUser_styles.css';
// components
import FormRenderField from '../global/formField/FormRenderField'
import Butt from "../global/Butt/Butt";
import GallerySign from "../global/gallerySign/GallerySign";
import StencilHeader from "../global/stencilHeader/StencilHeader";

class NewUserForm extends Component {

    render() {
        const { handleSubmit, pristine, submitting, addNewUser, signOutUser, userId } = this.props; // handleSubmit is added to props by redux-form

        return (
            <div className={'newUserForm--holder'}>
                {/*<Title/>*/}
                <form className={'newUserForm'}
                      onSubmit={handleSubmit((values) => addNewUser(userId, values))}>

                    <StencilHeader wording={'Set up your Artfly account'}/>

                    <div className={'newUserForm--signHolder'}>
                        <GallerySign>
                            <p className={'newUserForm--sectionHeader'}>Contact email:</p>
                            <Field
                                className={'inputField'}
                                name="email"
                                component={FormRenderField}
                            />

                            <p className={'newUserForm--sectionHeader'}>Artist:</p>
                            <Field
                                name="firstName"
                                label="First Name: "
                                component={FormRenderField}
                            />
                            <Field
                                name="lastName"
                                label="Last Name: "
                                component={FormRenderField}
                            />

                            <p>You can add more artists later.</p>

                        </GallerySign>
                    </div>

                    <div className={'newUserForm--butts'}>
                        <Butt type="submit" disabled={pristine || submitting}>Set up</Butt>
                        <Butt fullWidth={true} label={'Cancel'} type="button" onClick={signOutUser}/>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }

    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewUserForm = reduxForm({
    form: 'NewUserForm', // a unique identifier for this form
    validate
})(NewUserForm);

export default NewUserForm