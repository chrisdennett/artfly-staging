import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNewArtist } from '../../actions/UserActions';
import { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds } from '../../actions/ArtistGalleryActions';
import { updateArtist, updateGallery, deleteArtist } from '../../actions/SettingsActions';

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
        this.props.fetchGallery(artistGalleryId);
        this.props.fetchArtist(artistGalleryId);
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }
    onSubmit(values) {
        const { userId, formType, match, history, addNewArtist, updateArtist, updateGallery } = this.props;
        const { artistId } = match.params;

        if (formType === "new") {
            addNewArtist(userId, values, () => {
                history.push("/settings/");
            });
        }
        else {
            const { artistName, biog, galleryName } = values;
            const newArtistData = { name: artistName, biog: biog };
            const newGalleryData = { name: galleryName };
            // update artist and gallery
            updateArtist(artistId, newArtistData);
            updateGallery(artistId, newGalleryData, () => {
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
        const { initialValues, formType, status } = this.props;

        // Form doesn't update if you render it and then update the values
        // so need to wait until they are all present and correct
        if (status === "waiting") {
            return <div>loading...</div>
        }

        return <ArtistEditor
            initialValues={initialValues}
            formType={formType}
            deleteArtist={this.deleteArtist.bind(this)}
            onSubmit={this.onSubmit.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artistId } = ownProps.match.params;
    let formType = "new";
    let status = "";

    let initialFormValues = {
        galleryName: "Mrs Galleryina",
        artistName: "Donald",
        biog: "Simply magical with felt tips."
    };

    if (artistId) {
        formType = "edit";

        if (state.artists[artistId] && state.galleries[artistId]) {
            const artist = state.artists[artistId];
            const gallery = state.galleries[artistId];

            initialFormValues.galleryName = gallery.name;
            initialFormValues.artistName = artist.name;
            initialFormValues.biog = artist.biog;
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
        initialValues: initialFormValues
    }
};

const ArtistEditorContainer = connect(
    mapStateToProps, {
        fetchGallery,
        fetchArtist,
        fetchGalleryArtistArtworkIds,
        deleteArtist,
        addNewArtist,
        updateArtist,
        updateGallery
    }
)(ArtistEditorHolder);

export default ArtistEditorContainer;