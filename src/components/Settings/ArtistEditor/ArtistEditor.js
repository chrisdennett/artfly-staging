import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import FormRenderField from '../../global/FormRenderField';

class ArtistEditor extends Component {
    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        // I'm using the same form for editing and adding new artists
        // formType tells me which it is
        let formTitle = "Add New Artist";
        if(this.props.formType === "edit"){
            formTitle = "Edit Artist";
        }

        return (
            <div>
                <h1>{formTitle}</h1>
                <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                    <Field
                        name="galleryName"
                        label="Gallery Name: "
                        component={FormRenderField}
                    />
                    <Field
                        name="artistName"
                        label="Artist Name: "
                        component={FormRenderField}
                    />
                    <Field
                        name="biog"
                        label="Artist biog: "
                        component={FormRenderField}
                    />
                    <button type="submit">
                        Submit
                    </button>
                    <button type="button" onClick={this.props.deleteArtist.bind(this)}>
                        Delete
                    </button>
                    <Link to={`/settings/`}>Cancel</Link>
                </form>
            </div>
        )
    }
}

ArtistEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        galleryName: PropTypes.string,
        artistName: PropTypes.string,
        biog: PropTypes.string
    })
};

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
    else if (values.artistName.length > 15) {
        errors.artistName = 'Must be 15 characters or less'
    }

    if (!values.biog) {
        errors.biog = 'Required'
    }
    else if (values.biog.length > 200) {
        errors.artistName = 'Must be 200 characters or less'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ArtistEditor = reduxForm({
    form: 'AddOrEditArtistForm', // a unique identifier for this form
    validate
})(ArtistEditor);

export default ArtistEditor;