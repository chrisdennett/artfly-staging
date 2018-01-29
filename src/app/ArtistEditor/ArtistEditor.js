import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// styles
import './artistEditor.css';
// comps
import FormRenderField from '../global/formField/FormRenderField';
import Butt from "../global/Butt/Butt";

class ArtistEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { showDeleteConfirmation: false };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);
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
        const { showDeleteConfirmation } = this.state;

        // Delete confirmation content - don't allow delete if last artist.
        let deleteMessage = (
            <div>
                <h3>Delete Artist</h3>
                <p>Are you sure you want to delete this artist and all their artworks?</p>
                <Butt type={'button'} label={'Yes, delete away'} onClick={this.onDeleteConfirm}/>
                <Butt type={'button'} label={'No do not delete'} onClick={this.onDeleteCancel}/>
            </div>
        );
        if (this.props.allowDelete === false) {
            deleteMessage = (
                <div>
                    <h3>Artist can't be deleted</h3>
                    <p>Sorry, you always need at least one artist - Create a new artist first if you want to get rid
                        of this one.</p>
                    <Butt label={'Close message'}
                          type="button"
                          onClick={this.onDeleteCancel}/>
                </div>
            );
        }

        return (
            <div>
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

                    {!showDeleteConfirmation &&
                    <div className={'artistEditor--butts'}>
                        <Butt type="submit" label={'Done'}/>

                        <Butt onClick={this.props.onCancel}>
                            Cancel
                        </Butt>
                        {
                            this.props.formType === 'edit' &&
                            <Butt type="button"
                                  label={'Delete Artist'}
                                  backgroundColour={'#920000'}
                                  shadowColour={'#540000'}
                                  onClick={this.onDeleteClick}/>
                        }
                    </div>
                    }

                    {showDeleteConfirmation &&
                    deleteMessage
                    }

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