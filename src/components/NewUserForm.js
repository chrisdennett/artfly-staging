import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createNewUser, logoutUser } from '../actions';

class NewUserForm extends Component {

    renderField(field) {
        // pulling meta out of field.  And also pulling touched and error out of meta.
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                {/*The es6 {...field.input} links all events to reduxForm
                 It's a shortcut for dong onChange={field.input.onChange} for all events
                 */}
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : '' }
                </div>
            </div>
        );
    }

    onNewUserFormSubmit(values) {
        this.props.createNewUser(this.props.userAuth.uid, values);
    }

    onFormCancel(){
        this.props.logoutUser();
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form
        const { photoURL } = this.props.userAuth;

        return (
            <div>
                <h1>New User Form</h1>
                <img src={`${photoURL}?sz=42`} alt="user"/>
                <p>Yey! Hello there. Looks like you're new to these parts. Welcome.
                    Let's set you up. Oh and don't worry you can change all this later if you need to.</p>
                <form onSubmit={handleSubmit(this.onNewUserFormSubmit.bind(this))}>
                    <Field
                        name="username"
                        label="Curator"
                        component={this.renderField}
                    />
                    <Field
                        name="artistName"
                        label="Artist"
                        component={this.renderField}
                    />
                    <Field
                        name="email"
                        label="Email"
                        component={this.renderField}
                    />
                    <Field
                        name="galleryName"
                        label="Gallery Name"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={this.onFormCancel.bind(this)} className="btn btn-danger">Cancel</button>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }

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

// You have to connect() to any reducers that you wish to connect to yourself
NewUserForm = connect(
    state => ({
        initialValues: {
            username: state.userAuth.displayName,
            artistName: state.userAuth.displayName,
            email: state.userAuth.email,
            galleryName: `The curious gallery of ${state.userAuth.displayName}`
        }
    })
    , { createNewUser, logoutUser }
)(NewUserForm);

export default NewUserForm