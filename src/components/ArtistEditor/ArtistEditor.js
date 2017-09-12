import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import FormRenderField from '../global/FormRenderField';

class ArtistEditor extends Component {
    constructor(props){
        super(props);

        this.state = {showDeleteConfirmation:false};
    }

    onDeleteClick(){
        this.setState({showDeleteConfirmation:true});
    }

    onDeleteConfirm(){
        this.props.deleteArtist();
    }

    onDeleteCancel(){
        this.setState({showDeleteConfirmation:false});
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        // I'm using the same form for editing and adding new artists
        // formType tells me which it is
        let formTitle = "Add New Artist Gallery";
        let deleteButtonStyle = {display:'none'};
        let deleteConfirmationStyle = {display:'none'};
        let formButtonStyle = {};
        if(this.props.formType === "edit"){
            formTitle = "Edit Artist Gallery";
            deleteButtonStyle = {};
        }

        if(this.state.showDeleteConfirmation){
            deleteConfirmationStyle = {};
            formButtonStyle = {display:'none'};
            deleteButtonStyle = {display:'none'};
        }

        // Delete confirmation content - don't allow delete if last artist.
        let deleteConfirmationContent = (
            <div>
                <p>Are you sure you want to delete this artist and all their artworks?</p>
                <button type="button"  onClick={this.onDeleteConfirm.bind(this)}>Yes, delete away</button>
                <button type="button"  onClick={this.onDeleteCancel.bind(this)}>No do not delete</button>
            </div>
        );
        if(this.props.allowDelete === false){
            deleteConfirmationContent = (
                <div>
                    <p>Sorry, you you always need at least one artist - Create a new artist first if you want to get rid of this one.</p>
                    <button type="button"  onClick={this.onDeleteCancel.bind(this)}>Close message</button>
                </div>
            );
        }

        return (
            <div>
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
                    <button style={formButtonStyle} type="submit">
                        Submit
                    </button>
                    <button type="button" style={deleteButtonStyle} onClick={this.onDeleteClick.bind(this)}>
                        Delete
                    </button>
                    <div style={deleteConfirmationStyle}>
                        {deleteConfirmationContent}
                    </div>

                    <Link style={formButtonStyle} to={`/settings/`}>Cancel</Link>
                </form>
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