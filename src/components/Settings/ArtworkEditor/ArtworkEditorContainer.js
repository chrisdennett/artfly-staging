import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGallery, fetchArtist, fetchArtwork } from '../../ArtistGallery/ArtistGalleryActions';
import { updateArtwork } from './ArtworkEditorActions';

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
    render() {
        return <ArtworkEditor {...this.props}/>;
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
        updateArtwork
    }
)(ArtworkEditorHolder);

export default ArtworkEditorContainer;