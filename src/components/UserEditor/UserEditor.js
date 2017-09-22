import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './userEditor.css';

import FormRenderField from '../global/FormRenderField'

class NewUserForm extends Component {

    onNewUserFormSubmit(values) {
        this.props.createNewUser(this.props.user.uid, values);
    }

    onFormCancel() {
        this.props.logoutUser();
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        return (
            <div className={'user-editor'}>
                <div className={'user-editor-content'}>
                    <h1>Hello!</h1>
                    <p className={'form-info'}>Welcome to ArtFly. Let's set you up.</p>
                    <p className={'aside'}>(You can change all this later if you need to.)</p>
                    <form onSubmit={handleSubmit(this.onNewUserFormSubmit.bind(this))}>
                        <Field
                            name="email"
                            label="Email: "
                            component={FormRenderField}
                        />

                        <p className={'form-info'}>Add an Artist.</p>
                        <p className={'aside'}>(You can add more artists later on the 'Settings' page)</p>
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
                        <button className={'butt'} type="submit" >Submit</button>
                        <button className={'butt'} type="button" onClick={this.onFormCancel.bind(this)}>Cancel
                        </button>
                    </form>
                </div>
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