import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { fetchGallery, fetchArtist, fetchArtwork } from '../../actions/ArtistGalleryActions';
import { updateArtwork, uploadImage } from '../../actions/ArtistGalleryActions';

import ArtworkEditor from './ArtworkEditor';

// store the image data from the cropper, but only update if crop data has changed.
// Created an intermediate component so can trigger the data loading outside
class ArtworkEditorHolder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cropImg: null,
            cropData: null,
            selectedArtistId: null
        };
    }

    componentDidMount() {
        console.log("ArtworkEditorContainer > DidMount");
        this.initData();
    }

    initData() {
        const { artworkId, user } = this.props;

        // only fetch if not already available
        if (!this.state.selectedArtistId && this.props.artwork && this.props.artwork.id === artworkId) {
            this.setState({ selectedArtistId: this.props.artwork.artistId });
        }
        else {
            if (!this.state.selectedArtistId && artworkId) {
                this.props.fetchArtwork(artworkId, (artworkData) => {
                    this.setState({ selectedArtistId: artworkData.artistId });
                });
            }
        }

        if (user) {
            const { artistGalleryIds } = this.props.user;
            if (artistGalleryIds) {
                for (let id of Object.keys(artistGalleryIds)) {
                    this.props.fetchArtist(id);
                }
            }
        }
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId });
    }

    hasCropDataChanged() {
        let cropDataChanged = false;

        if (this.state.cropData) {
            const { rotation, width, height } = this.state.cropData;

            let rotationChanged = rotation && rotation !== 0;
            let widthChanged = width !== this.props.artwork.imgWidth;
            let heightChanged = height !== this.props.artwork.imgHeight;
            if (rotationChanged || widthChanged || heightChanged) {
                cropDataChanged = true;
            }
        }
        return cropDataChanged;
    }

    getReturnUrl() {
        const {artworkId} = this.props;
        const artistId = this.state.selectedArtistId;

        let returnUrl = `/gallery/${artistId}/artwork/${artworkId}`;

        return returnUrl;
    }

    onCancelChanges() {
        const returnUrl = this.getReturnUrl();
        this.props.history.push(returnUrl);
    }

    onSaveChanges() {
        // if only the artist has changed, just change the artistId on the artwork
        // if the image has been cropped, need to clear the image urls on the artwork data before
        // overwriting the source image which will then create new smaller images.

        const artistChanged = this.state.selectedArtistId && (this.state.selectedArtistId !== this.props.artwork.artistId);
        const imageChanged = this.hasCropDataChanged();
        const { artworkId } = this.props;
        const oldArtworkData = this.props.artwork;
        let newArtworkData = { ...oldArtworkData };

        if (!imageChanged && !artistChanged) {
            //TODO should disable save button if nothing has changed.
            console.log("nothing has changed so don't save anything new");
            return;
        }

        // if just the artist has changed
        if (artistChanged && imageChanged === false) {
            newArtworkData.artistId = this.state.selectedArtistId;
            this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData);
        }
        // if just the image cropping has changed
        else if (imageChanged && artistChanged === false) {
            this.uploadCurrentImage(newArtworkData.artistId, artworkId);
        }
        // if both the artist and the image has changed
        else {
            newArtworkData.artistId = this.state.selectedArtistId;
            this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData, () => {
                this.uploadCurrentImage(newArtworkData.artistId, artworkId);
            });
        }
    }

    uploadCurrentImage(artistId, artworkId) {
        const { width, height } = this.state.cropData;
        this.props.uploadImage(this.state.cropImg, this.props.user.uid, artistId, width, height, artworkId)
    }

    onCropImageSave(cropImg) {
        this.setState({ cropImg: cropImg });
    }

    onCropDataConfirm(imageCropAndRotateData) {
        this.setState({ cropData: imageCropAndRotateData, cropImg: null });
    }

    render() {
        const { artwork, userStatus, artists, onArtistSelected } = this.props;

        if (userStatus === "none" || userStatus === "new") {
            return (<Redirect to="/"/>)
        }

        if (!artwork || !this.state.selectedArtistId) {
            return <div>Loading something...</div>
        }

        const url = artwork.url;
        const artistId = this.state.selectedArtistId;
        const propsForView = { artists, onArtistSelected, url, artistId };
        return <ArtworkEditor {...propsForView}
                              onSaveChanges={this.onSaveChanges.bind(this)}
                              onCancelChanges={this.onCancelChanges.bind(this)}
                              onCropDataConfirm={this.onCropDataConfirm.bind(this)}
                              onCropImageSave={this.onCropImageSave.bind(this)}
                              onArtistSelected={this.onArtistSelected.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artworkId } = ownProps.match.params;
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
        fetchGallery,
        fetchArtist,
        fetchArtwork,
        updateArtwork,
        uploadImage
    }
)(ArtworkEditorHolder);

export default ArtworkEditorContainer;