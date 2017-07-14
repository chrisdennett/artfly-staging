import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistGallery from './ArtistGallery';
import { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds } from './ArtistGalleryActions';

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {
    componentDidMount() {
        this.initData(this.props.galleryId);
    }

    initData(artistGalleryId){
        this.props.fetchGallery(artistGalleryId);
        this.props.fetchArtist(artistGalleryId);
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }

    componentWillUpdate(nextProps) {
        if (this.props.galleryId !== nextProps.galleryId) {
            this.initData(nextProps.galleryId);
        }
    }

    render() {
        const { gallery, artist, totalArtworks } = this.props;
        if(!gallery || !artist || !artist){
            return <div>Artist Gallery Loading</div>;
        }

        return <ArtistGallery gallery={gallery} artist={artist} totalArtworks={totalArtworks}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps.match.params;
    const totalArtworks = !state.artistsArtworkIds[galleryId] ? 0 : Object.keys(state.artistsArtworkIds[galleryId]).length;

    return {
        galleryId: galleryId,
        gallery: state.galleries[galleryId],
        artist: state.artists[galleryId],
        totalArtworks: totalArtworks
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

