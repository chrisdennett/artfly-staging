import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        this.initData();
    }

    initData() {
        const { artworkId, user } = this.props;
        // only fetch if not already available
        if (!this.state.selectedArtistId && this.props.artwork && this.props.artwork.id === artworkId) {
            this.setState({ selectedArtistId: this.props.artwork.artistId })
        }
        else {
            if (!this.state.selectedArtistId && artworkId) {
                this.props.fetchArtwork(artworkId, (artworkData) => {
                    this.setState({ selectedArtistId: artworkData.artistId })
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

    onSaveChanges() {
        // if only the artist has changed, just change the artistId on the artwork
        // if the image has been cropped, need to clear the image urls on the artwork data before
        // overwriting the source image which will then create new smaller images.

        const artistChanged = this.state.selectedArtistId && (this.state.selectedArtistId !== this.props.artwork.artistId);
        /*let cropDataChanged = false;
        if()*/

        if (artistChanged) {
            const { artworkId } = this.props;
            const oldArtworkData = this.props.artwork; // ERROR HERE
            const newArtworkData = {
                artistId: this.state.selectedArtistId
            };
            this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData);
        }


        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)

        // const {image, height, width, crop, rotation, type} = imageCropAndRotateData;
        // const {image, height, width } = imageCropAndRotateData;

        // this.props.uploadImage(image, this.props.userId, this.props.artistId, width, height);
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