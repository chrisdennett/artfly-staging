import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import './artistEditor.css';

import FormRenderField from '../global/FormRenderField';
import Butt from "../global/Butt";
import LinkButt from "../global/LinkButt";
import Modal from "../global/Modal";
import Page from "../global/Page";

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
        if (this.props.formType === "edit") {
            formTitle = "Edit Artist";
        }

        // Delete confirmation content - don't allow delete if last artist.
        let modal = (
            <Modal isOpen={this.state.showDeleteConfirmation}
                   title={"Delete Artist"}>
                <p>Are you sure you want to delete this artist and all their artworks?</p>
                <Butt type={'button'} label={'Yes, delete away'} onClick={this.onDeleteConfirm.bind(this)}/>
                <Butt type={'button'} label={'No do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
            </Modal>
        );
        if (this.props.allowDelete === false) {
            modal = (
                <Modal isOpen={this.state.showDeleteConfirmation}
                       title={"Artist can't be deleted"}>
                    <p>Sorry, you you always need at least one artist - Create a new artist first if you want to get rid
                        of this one.</p>
                    <Butt label={'Close message'} type="button" onClick={this.onDeleteCancel.bind(this)}/>
                </Modal>
            );
        }

        return (
            <Page title={formTitle}>

                {modal}

                <section className={'page-main-section'}>
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

                        <Butt type="submit" label={'Done'}/>

                        <LinkButt fullWidth={true} label={`Cancel`} linkTo={`/settings/`}/>

                        {
                            this.props.formType === 'edit' &&
                            <Butt type="button"
                                  label={'Delete Artist'}
                                  backgroundColour={'#920000'}
                                  shadowColour={'#540000'}
                                  onClick={this.onDeleteClick.bind(this)}/>
                        }

                    </form>
                </section>
            </Page>
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