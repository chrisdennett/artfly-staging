import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistGallery from './ArtistGallery';

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {

    onThumbClick(artworkId) {
        this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
    }

    render() {
        const { artist, artworks, galleryParams, galleryIsZoomedOut, windowSize } = this.props;
        if (!artist || !artworks || windowSize.windowWidth < 1 || windowSize.windowHeight < 1 || !galleryParams) {
            return <div>Artist Gallery Loading</div>;
        }

        return <ArtistGallery pageWidth={windowSize.windowWidth}
                              pageHeight={windowSize.windowHeight}
                              galleryIsZoomedOut={galleryIsZoomedOut}
                              galleryParams={galleryParams}
                              artist={artist}
                              artworks={artworks}
                              onThumbClick={this.onThumbClick.bind(this)}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    return {
        artist: state.artists[ownProps.galleryId],
        artworks: state.artworks,
        galleryParams: state.ui.galleryParams,
        windowSize: state.ui.windowSize,
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

