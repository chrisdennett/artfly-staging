import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import './artistEditor.css';

import FormRenderField from '../global/FormRenderField';
import Butt from "../global/Butt";
import LinkButt from "../global/LinkButt";

class ArtistEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { showDeleteConfirmation: false };
    }

    onDeleteClick() {
        this.setState({ showDeleteConfirmation: true });
    }

    onDeleteConfirm() {
        this.props.deleteArtist();
    }

    onDeleteCancel() {
        this.setState({ showDeleteConfirmation: false });
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        // I'm using the same form for editing and adding new artists
        // formType tells me which it is
        let formTitle = "Add New Artist";
        let deleteConfirmationStyle = { display: 'none' };
        let formButtonStyle = {};
        let submitButtonText = 'Add Artist';
        if (this.props.formType === "edit") {
            formTitle = "Edit Artist";
            submitButtonText = 'Update Artist'
        }

        if (this.state.showDeleteConfirmation) {
            deleteConfirmationStyle = {};
            formButtonStyle = { display: 'none' };
        }

        // Delete confirmation content - don't allow delete if last artist.
        let deleteConfirmationContent = (
            <div>
                <p>Are you sure you want to delete this artist and all their artworks?</p>
                <Butt type={'button'} label={'Yes, delete away'} onClick={this.onDeleteConfirm.bind(this)}/>
                <Butt type={'button'} label={'No do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
            </div>
        );
        if (this.props.allowDelete === false) {
            deleteConfirmationContent = (
                <div>
                    <p>Sorry, you you always need at least one artist - Create a new artist first if you want to get rid
                        of this one.</p>
                    <Butt label={'Close message'} type="button" onClick={this.onDeleteCancel.bind(this)} />
                </div>
            );
        }

        return (
            <div className={'artist-editor'}>
                <div className={'artist-editor-content'}>
                    <h1>{formTitle}</h1>
                    <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
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
                        <div style={formButtonStyle}>
                            <Butt type="submit" label={submitButtonText}/>
                            <Butt type="button" label={'Delete'} onClick={this.onDeleteClick.bind(this)}/>
                        </div>
                        <div style={deleteConfirmationStyle}>
                            {deleteConfirmationContent}
                        </div>

                        <LinkButt label={`Cancel`} style={formButtonStyle} linkTo={`/settings/`}/>
                    </form>
                </div>
            </div>
        )
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

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ArtistEditor = reduxForm({
    form: 'AddOrEditArtistForm', // a unique identifier for this form
    validate
})(ArtistEditor);

export default ArtistEditor;