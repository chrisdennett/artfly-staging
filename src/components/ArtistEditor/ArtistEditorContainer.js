// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewArtist, listenForArtistChanges, updateArtist, deleteArtist } from '../../actions/UserDataActions';
// components
import history from '../global/history';
import ArtistEditor from './ArtistEditor';

// Created an intermediate component so can trigger the data loading outside
class ArtistEditorHolder extends Component {

    componentWillMount() {
        if (this.props.artistId) {
            this.props.listenForArtistChanges(this.props.artistId);
        }
    }

    onSubmit(values) {
        const { userId, artistId, formType, addNewArtist, updateArtist } = this.props;

        if (formType === "new") {
            addNewArtist(userId, values, () => {
                history.push("/settings/");
            });
        }
        else {
            const { firstName, lastName } = values;
            const newArtistData = { firstName: firstName, lastName: lastName };
            // update artist
            updateArtist(artistId, newArtistData, () => {
                history.push("/settings/");
            });
        }
    }

    deleteArtist() {
        const { userId, artistId } = this.props;
        this.props.deleteArtist(artistId, userId, () => {
            history.push(`/settings/`);
        });
    }

    render() {
        const { initialValues, formType, status } = this.props;

        // Form doesn't update if you render it and then update the values
        // so need to wait until they are all present and correct
        if (status === "waiting") {
            return <div>loading...</div>
        }

        // don't allow the final artist to be deleted
        let allowDelete = this.props.totalUserArtists && this.props.totalUserArtists > 1;

        return <ArtistEditor
            initialValues={initialValues}
            formType={formType}
            allowDelete={allowDelete}
            deleteArtist={this.deleteArtist.bind(this)}
            onSubmit={this.onSubmit.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artistId } = ownProps;
    let formType = "new";
    let status = "";

    let initialFormValues = {
        firstName: '',
        lastName: ''
    };

    if (artistId) {
        formType = "edit";

        if (state.artists[artistId]) {
            const artist = state.artists[artistId];

            initialFormValues.firstName = artist.firstName;
            initialFormValues.lastName = artist.lastName;

            status = "done";
        }
        else {
            status = "waiting";
        }
    }

    return {
        status: status,
        userId: state.user.uid,
        formType: formType,
        initialValues: initialFormValues,
        totalUserArtists: state.user.totalArtists,
    }
};

const ArtistEditorContainer = connect(
    mapStateToProps, {
        listenForArtistChanges,
        deleteArtist,
        addNewArtist,
        updateArtist
    }
)(ArtistEditorHolder);

export default ArtistEditorContainer;