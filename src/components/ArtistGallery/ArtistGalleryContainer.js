import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistGallery from './ArtistGallery';
// import { getGalleryParams } from "../../actions/UiActions";

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {

    componentDidMount() {
        if (this.props.galleryIsZoomedOut) {
            document.body.classList.toggle('no-scroll-bars', true);
        }
        else {
            document.body.classList.remove('no-scroll-bars');
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.galleryIsZoomedOut !== this.props.galleryIsZoomedOut) {
            if (this.props.galleryIsZoomedOut) {
                document.body.classList.toggle('no-scroll-bars', true);
            }
            else {
                document.body.classList.remove('no-scroll-bars');
            }
        }
    }

    onThumbClick(artworkId) {
        this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
    }

    render() {
        const { artist, totalArtworks, artworks, artworkIds, galleryParams, galleryIsZoomedOut } = this.props;
        if (!artist || !artworks || !galleryParams) {
            return <div>Artist Gallery Loading</div>;
        }

        return <ArtistGallery pageWidth={this.props.windowSize.windowWidth}
                              pageHeight={this.props.windowSize.windowHeight}
                              galleryIsZoomedOut={galleryIsZoomedOut}
                              galleryParams={galleryParams}
                              artist={artist}
                              totalArtworks={totalArtworks}
                              artworkIds={artworkIds}
                              artworks={artworks}
                              onThumbClick={this.onThumbClick.bind(this)}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps;
    const totalArtworks = 21;
    const artist = state.artists[galleryId];
    const artworkIds = artist ? artist.artworkIds : [];

   /* let sortedArtworkIds = [];
    let totalArtworks = 0;
    if (state.artists[galleryId] && state.artists[galleryId].artworkIds && state.artists[galleryId].totalArtworks > 0) {
        // sort the ids in reverse order.
        const {artworkIds} = state.artists[galleryId];
        totalArtworks = state.artists[galleryId].totalArtworks;

        sortedArtworkIds = artworkIds.sort((a, b) => {
            return artworkIds[b] - artworkIds[a]
        });
    }*/

    return {
        galleryParams: state.ui.galleryParams,
        galleryId: galleryId,
        artist: artist,
        totalArtworks: totalArtworks,
        artworkIds: artworkIds,
        artworks: state.artworks,
        windowSize: state.ui.windowSize,
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

