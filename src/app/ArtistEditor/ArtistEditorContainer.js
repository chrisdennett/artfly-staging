// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewArtist, updateArtist, deleteArtist } from '../../actions/UserDataActions';
// components
import ArtistEditor from './ArtistEditor';

// Created an intermediate component so can trigger the data loading outside
class ArtistEditorHolder extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);
    }

    onSubmit(values) {
        const { userId, artist, formType, addNewArtist, updateArtist, onComplete } = this.props;

        if (formType === "new") {
            addNewArtist(userId, values, () => {
                onComplete();
            });
        }
        else {
            const { firstName, lastName } = values;
            const newArtistData = { firstName: firstName, lastName: lastName };
            // update artist
            updateArtist(artist.artistId, newArtistData, () => {
                onComplete();
            });
        }
    }

    deleteArtist() {
        const { artist, deleteArtist } = this.props;
        deleteArtist(artist.artistId);
    }

    render() {
        const { initialValues, formType, onCancel, totalUserArtists } = this.props;

        // don't allow the final artist to be deleted
        let allowDelete = totalUserArtists && totalUserArtists > 1;

        return <ArtistEditor
            onCancel={onCancel}
            initialValues={initialValues}
            formType={formType}
            allowDelete={allowDelete}
            deleteArtist={this.deleteArtist}
            onSubmit={this.onSubmit}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artist } = ownProps;
    const formType = artist ? "edit" : "new";

    let initialFormValues = {
        firstName: '',
        lastName: ''
    };

    if (artist) {
        initialFormValues.firstName = artist.firstName;
        initialFormValues.lastName = artist.lastName;
    }

    return {
        userId: state.user.uid,
        formType: formType,
        initialValues: initialFormValues,
        totalUserArtists: state.user.totalArtists
    }
};

const ArtistEditorContainer = connect(
    mapStateToProps, {
        deleteArtist,
        addNewArtist,
        updateArtist
    }
)(ArtistEditorHolder);

export default ArtistEditorContainer;