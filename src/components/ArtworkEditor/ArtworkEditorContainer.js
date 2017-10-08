import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import {
    fetchArtwork,
    updateArtwork,
    uploadImage,
    deleteArtwork
} from '../../actions/ArtistGalleryActions';

import ArtworkEditor from './ArtworkEditor';

// store the image data from the cropper, but only update if crop data has changed.
// Created an intermediate component so can trigger the data loading outside
class ArtworkEditorHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropImg: null,
            cropData: null,
            savedCropData: null,
            selectedArtistId: null,
            isSaving: false
        };
    }

    componentDidMount() {
        this.initData();
    }

    componentDidUpdate() {
        this.initData();
    }

    initData() {
        const { artworkId } = this.props;

        if (artworkId) {
            this.props.fetchArtwork(artworkId);
        }
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId });
    }

    hasCropDataChanged() {
        return this.state.cropData !== this.state.savedCropData;
    }

    hasArtistChanged(){
        let selectedArtistChanged = false;
        if(this.state.selectedArtistId && (this.state.selectedArtistId !== this.props.artwork.artistId)){
            selectedArtistChanged = true;
        }
        return selectedArtistChanged;
    }

    getReturnUrl() {
        const { artworkId } = this.props;
        let artistId = this.state.selectedArtistId;
        if(!artistId) artistId = this.props.artwork.artistId;
        return `/gallery/${artistId}/artwork/${artworkId}`;
    }

    onCancelChanges() {
        const returnUrl = this.getReturnUrl();
        this.props.history.push(returnUrl);
    }

    onSaveChanges() {
        this.setState({isSaving:true});

        const artistChanged = this.hasArtistChanged();
        const imageChanged = this.hasCropDataChanged();
        const { artworkId } = this.props;
        const oldArtworkData = this.props.artwork;
        let newArtworkData = { ...oldArtworkData };
        newArtworkData.artistId = !this.state.selectedArtistId ? oldArtworkData.artistId : this.state.selectedArtistId;

        if (!imageChanged && !artistChanged) {
            //TODO should disable save button if nothing has changed.
            console.log("nothing has changed so don't save anything new");
            this.setState({isSaving:false});
            return;
        }

        // if just the artist has changed
        if (artistChanged && imageChanged === false) {
            this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData, () => {
                this.setState({isSaving:false});
            });
        }
        // if just the image cropping has changed
        else if (imageChanged && artistChanged === false) {
            this.uploadCurrentImage(newArtworkData.artistId, artworkId);
        }
        // if both the artist and the image has changed
        else {
            this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData, () => {
                this.uploadCurrentImage(newArtworkData.artistId, artworkId);
            });
        }
    }

    onConfirmDeleteArtwork() {
        const { artworkId } = this.props;
        const { artistId } = this.props.artwork;
        const { uid } = this.props.user;
        this.props.deleteArtwork(artworkId, artistId, uid, () => {
            this.props.history.push("/settings");
        });
    }

    uploadCurrentImage(artistId, artworkId) {
        const { width, height } = this.state.cropData;

        this.props.uploadImage(this.state.cropImg, this.props.user.uid, artistId, width, height, artworkId, () => {
            this.setState({isSaving:false, savedCropData:this.state.cropData});
        })
    }

    onCropImageSave(cropImg) {
        this.setState({ cropImg: cropImg });
    }

    onCropDataConfirm(imageCropAndRotateData) {
        this.setState({ cropData: imageCropAndRotateData, cropImg: null });
    }

    render() {
        const { artwork, userStatus, artists, onArtistSelected } = this.props;

        console.log("userStatus: ", userStatus);
        /*if (userStatus === "none" || userStatus === "new") {
            return (<Redirect to="/"/>)
        }*/

        if (!artwork) {
            return <div>Loading artwork...</div>
        }

        let artistId = this.state.selectedArtistId;
        if (!artistId) {
            artistId = artwork.artistId;
        }

        const url = artwork.url;
        const changesUnsaved = this.hasArtistChanged() || this.hasCropDataChanged();
        const isSaving = this.state.isSaving;
        const propsForView = { artists, onArtistSelected, url, artistId, changesUnsaved, isSaving };
        return <ArtworkEditor {...propsForView}
                              onConfirmDeleteArtwork={this.onConfirmDeleteArtwork.bind(this)}
                              onSaveChanges={this.onSaveChanges.bind(this)}
                              onCancelChanges={this.onCancelChanges.bind(this)}
                              onCropDataConfirm={this.onCropDataConfirm.bind(this)}
                              onCropImageSave={this.onCropImageSave.bind(this)}
                              onArtistSelected={this.onArtistSelected.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artworkId } = ownProps;
    const artwork = state.artworks[artworkId];

    return {
        user: state.user,
        artworkId: artworkId,
        artwork: artwork,
        artists: state.artists,
        userStatus: state.user.status
    }
};

const ArtworkEditorContainer = connect(
    mapStateToProps,
    {
        fetchArtwork,
        updateArtwork,
        uploadImage,
        deleteArtwork
    }
)(ArtworkEditorHolder);

export default ArtworkEditorContainer;