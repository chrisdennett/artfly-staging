import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNewArtist } from '../AppControls/UserControls/UserActions';
import AddOrEditArtist from './AddOrEditArtist';
import { fetchGallery } from '../ArtistGallery/ArtistGalleryActions';
import { updateArtist, updateGallery } from '../Settings/SettingsActions';


// Created an intermediate component so can trigger the data loading outside
class AddOrEditArtistHolder extends Component {
    componentDidMount() {
        // Fetch artistGallery data if artistId is in params
        if (this.props.match.params.artistId) {
            this.props.fetchGallery(this.props.match.params.artistId);
        }
    }

    componentDidUpdate() {
        if (this.props.match.params.artistId) {
            this.props.fetchGallery(this.props.match.params.artistId);
        }
    }

    onSubmit(values) {
        const {userId, formType, match, history} = this.props;
        const {artistId} = match.params;
        // TODO: Currently they can only get here from settings, but in the future I
        // imagine there'll be other locations so this should send they back there.
        this.props.onSubmit(userId, formType, values, artistId, () => {
            history.push("/settings/")
        });
    }

    render() {
        const { initialValues, formType, status } = this.props;

        // Form doesn't update if you render it and then update the values
        // so need to wait until they are all present and correct
        if (status === "waiting") {
            return <div>loading...</div>
        }

        return <AddOrEditArtist
            initialValues={initialValues}
            formType={formType}
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchGallery: (artistId) => {
            dispatch(fetchGallery(artistId));
        },
        onSubmit: (userId, formType, values, artistId, callback) => {
            if (formType === "new") {
                dispatch(addNewArtist(userId, values, callback));
            }
            else {
                const { artistName, biog, galleryName } = values;
                const newArtistData = { name: artistName, biog: biog };
                const newGalleryData = { name: galleryName };
                // update artist and gallery
                dispatch(updateArtist(artistId, newArtistData, callback));
                dispatch(updateGallery(artistId, newGalleryData, callback));
            }

        }
    }
};

const AddOrEditArtistContainer = connect(
    mapStateToProps, mapDispatchToProps
)(AddOrEditArtistHolder);

export default AddOrEditArtistContainer;