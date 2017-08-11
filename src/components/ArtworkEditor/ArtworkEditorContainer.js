import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchGallery, fetchArtist, fetchArtwork } from '../ArtistGallery/ArtistGalleryActions';
import { updateArtwork, uploadImage } from './ArtworkEditorActions';

import ArtworkEditor from './ArtworkEditor';

// Created an intermediate component so can trigger the data loading outside
class ArtworkEditorHolder extends Component {
    componentWillMount() {
        this.initData();
    }
    componentDidUpdate() {
        this.initData();
    }
    initData() {
        const { artworkId, user } = this.props;
        // only fetch if not already available
        if (artworkId) this.props.fetchArtwork(artworkId);

        if (user) {
            const { artistGalleryIds } = this.props.user;
            if (artistGalleryIds) {
                for (let id of Object.keys(artistGalleryIds)) {
                    this.props.fetchArtist(id);
                }
            }
        }
    }
    onArtistSelected(artistId){
        const { artworkId } = this.props;
        const oldArtworkData = this.props.artwork; // ERROR HERE
        const newArtworkData = {
            artistId: artistId
        };

        this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData);
    }
    onImageConfirm(imageCropAndRotateData){
        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)

        // const {image, height, width, crop, rotation, type} = imageCropAndRotateData;
        const {image, height, width } = imageCropAndRotateData;

        this.props.uploadImage(image, this.props.userId, this.props.artistId, width, height);
    }

    onCropImageSave(cropImg){
        console.log("cropImg: ", cropImg);
    }

    onCropDataChange(imageCropAndRotateData){
        console.log("imageCropAndRotateData: ", imageCropAndRotateData);
    }

    render() {
        const { artwork, userStatus, artist, artists, onArtistSelected } = this.props;

        if (userStatus === "none" || userStatus === "new") {
            return (<Redirect to="/"/>)
        }

        if (!artwork || !artist) {
            return <div>Loading something...</div>
        }

        const propsForView = {artwork, artists, onArtistSelected};
        return <ArtworkEditor {...propsForView}
                              onCropDataChange={this.onCropDataChange.bind(this)}
                              onCropImageSave={this.onCropImageSave.bind(this)}
                              onArtistSelected={this.onArtistSelected.bind(this)}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { artworkId } = ownProps.match.params;
    const artwork = state.artworks[artworkId];
    let artist = {};

    return {
        user: state.user,
        artworkId: artworkId,
        artwork: artwork,
        artist: artist,
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