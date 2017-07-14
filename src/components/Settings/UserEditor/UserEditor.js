import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormRenderField from '../../global/FormRenderField'

class NewUserForm extends Component {

    onNewUserFormSubmit(values) {
        this.props.createNewUser(this.props.user.uid, values);
    }

    onFormCancel(){
        this.props.deleteUser();
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form
        const { photoURL } = this.props.user;

        return (
            <div>
                <h1>New User Form</h1>
                <img src={`${photoURL}?sz=42`} alt="user"/>
                <p>Yey! Hello there. Looks like you're new to these parts. Welcome.
                    Let's set you up. Oh and don't worry you can change all this later if you need to.</p>
                <form onSubmit={handleSubmit(this.onNewUserFormSubmit.bind(this))}>
                    <Field
                        name="artistName"
                        label="Artist"
                        component={FormRenderField}
                    />
                    <Field
                        name="email"
                        label="Email"
                        component={FormRenderField}
                    />
                    <Field
                        name="galleryName"
                        label="Gallery Name"
                        component={FormRenderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" onClick={this.onFormCancel.bind(this)} className="btn btn-danger">Cancel</button>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.artistName) {
        errors.artistName = 'Required'
    } else if (values.artistName.length > 15) {
        errors.artistName = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.galleryName) {
        errors.galleryName = 'Required'
    } else if (values.galleryName.length > 64) {
        errors.galleryName = 'Must be 64 characters or less'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewUserForm = reduxForm({
    form: 'NewUserForm', // a unique identifier for this form
    validate
})(NewUserForm);

export default NewUserForm