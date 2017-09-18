import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNewArtist } from '../../actions/UserActions';
import { fetchArtist, fetchArtistArtworkIds } from '../../actions/ArtistGalleryActions';
import { updateArtist, deleteArtist } from '../../actions/ArtistGalleryActions';

import ArtistEditor from './ArtistEditor';

// Created an intermediate component so can trigger the data loading outside
class ArtistEditorHolder extends Component {
    componentDidMount() {
        // Fetch artistGallery data if artistId is in params
        const artistGalleryId = this.props.match.params.artistId;
        if (artistGalleryId) {
            this.initData(artistGalleryId);
        }
    }

    componentDidUpdate() {
        const artistGalleryId = this.props.match.params.artistId;
        if (artistGalleryId) {
            this.initData(artistGalleryId);
        }
    }

    initData(artistGalleryId) {
        this.props.fetchArtist(artistGalleryId);
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }

    onSubmit(values) {
        const { userId, formType, match, history, addNewArtist, updateArtist } = this.props;
        const { artistId } = match.params;

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
        const { userId, match, history } = this.props;
        const { artistId } = match.params;
        this.props.deleteArtist(artistId, userId, () => {
            history.push(`/settings/`);
        });
    }

    render() {
        const { initialValues, formType, status, userArtistGalleryIds } = this.props;

        // Form doesn't update if you render it and then update the values
        // so need to wait until they are all present and correct
        if (status === "waiting" || !userArtistGalleryIds) {
            return <div>loading...</div>
        }

        let allowDelete = true;
        if (userArtistGalleryIds && Object.keys(userArtistGalleryIds).length < 2) {
            allowDelete = false;
        }

        return <ArtistEditor
            initialValues={initialValues}
            formType={formType}
            allowDelete={allowDelete}
            deleteArtist={this.deleteArtist.bind(this)}
            onSubmit={this.onSubmit.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artistId } = ownProps.match.params;
    let formType = "new";
    let status = "";

    let initialFormValues = {
        firstName: "",
        lastName: ""
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
        userArtistGalleryIds: state.user.artistIds
    }
};

const ArtistEditorContainer = connect(
    mapStateToProps, {
        fetchArtist,
        fetchGalleryArtistArtworkIds: fetchArtistArtworkIds,
        deleteArtist,
        addNewArtist,
        updateArtist
    }
)(ArtistEditorHolder);

export default ArtistEditorContainer;