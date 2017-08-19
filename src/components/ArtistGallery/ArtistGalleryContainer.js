import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistGallery from './ArtistGallery';
import {
    fetchGallery,
    fetchArtist,
    fetchGalleryArtistArtworkIds,
    fetchArtwork
} from '../../actions/ArtistGalleryActions';

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {
    componentDidMount() {
        this.initData(this.props.galleryId);
    }

    initData(artistGalleryId) {
        this.props.fetchGallery(artistGalleryId);
        this.props.fetchArtist(artistGalleryId);
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }

    componentWillUpdate(nextProps) {
        if (this.props.galleryId !== nextProps.galleryId) {
            this.initData(nextProps.galleryId);
        }

        for (let id of nextProps.artworkIds) {
            this.props.fetchArtwork(id);
        }
    }

    onThumbClick(artworkId){
        this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
    }

    render() {
        const { gallery, artist, totalArtworks, artworks } = this.props;
        if (!gallery || !artist || !artist) {
            return <div>Artist Gallery Loading</div>;
        }

        return <ArtistGallery gallery={gallery} artist={artist} totalArtworks={totalArtworks} artworks={artworks} onThumbClick={this.onThumbClick.bind(this)}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps.match.params;

    let artworkIds = [];
    if (state.artistsArtworkIds && state.artistsArtworkIds[galleryId]) {
        artworkIds = Object.keys(state.artistsArtworkIds[galleryId]);
    }

    const totalArtworks = !state.artistsArtworkIds[galleryId] ? 0 : Object.keys(state.artistsArtworkIds[galleryId]).length;
    let artworks = state.artworks;

    return {
        galleryId: galleryId,
        gallery: state.galleries[galleryId],
        artist: state.artists[galleryId],
        totalArtworks: totalArtworks,
        artworkIds: artworkIds,
        artworks:artworks
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds, fetchArtwork }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

