import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class EditArtistForm extends Component {

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

    onFormSubmit(values) {
        //TODO if used same names as data could just return values
        this.props.onFormSubmit({name:values.artistName, biog:values.biog});
    }

    onFormCancel() {
        this.props.onFormCancel();
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        return (
            <div>
                <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                        name="galleryName"
                        label="Gallery Name: "
                        component={this.renderField}
                    />
                    <Field
                        name="artistName"
                        label="Artist: "
                        component={this.renderField}
                    />
                    <Field
                        name="biog"
                        label="Biog: "
                        component={this.renderField}
                    />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.onFormCancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};

    if (!values.galleryName) {
        errors.galleryName = 'Required'
    }
    else if (values.galleryName.length > 42) {
        errors.galleryName = 'Must be 42 characters or less'
    }

    if (!values.artistName) {
        errors.artistName = 'Required'
    }
    else if (values.artistName.length > 42) {
        errors.artistName = 'Must be 42 characters or less'
    }

    if (!values.biog) {
        errors.biog = 'Required'
    }
    else if (values.biog.length > 242) {
        errors.biog = 'Must be 242 characters or less'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditArtistForm = reduxForm({
    form: 'EditArtistForm', // a unique identifier for this form
    validate
})(EditArtistForm);

// You have to connect() to any reducers that you wish to connect to yourself
EditArtistForm = connect(
    state => (
        {
        initialValues: {
            galleryName: state.controlPanel.currentArtist.galleryName,
            artistName: state.controlPanel.currentArtist.name,
            biog: state.controlPanel.currentArtist.biog
         }
    }),
    {
        /* actions go in here.*/
    }
)(EditArtistForm);

export default EditArtistForm;