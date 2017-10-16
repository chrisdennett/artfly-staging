// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { listenForArtistArtworkIdsChanges, listenForArtistChanges, listenForArtworkChanges } from '../../actions/UserDataActions';
// components
import ArtistGallery from './ArtistGallery';
import history from '../global/history';

class ArtistGalleryHolder extends Component {

    componentDidMount() {
        this.props.fetchArtist(this.props.galleryId);
        this.props.fetchArtistArtworkIds(this.props.galleryId, (artistArtworksData) => {
            if (artistArtworksData) {

                for (let id in this.props.artistArtworkIds) {
                    this.props.fetchArtwork(id);
                }
            }
        });
    }

    onThumbClick(artworkId) {
        if (artworkId) {
            history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
        }
        else {
            console.log("ArtistGalleryContainer > onThumbClick > artworkId: ", artworkId);
        }
    }

    render() {
        const { artist, artistArtworkIds, artworks, galleryIsZoomedOut, windowSize } = this.props;

        if (!artist || !artistArtworkIds) {
            return <div>Artist Gallery Loading</div>;
        }

        const galleryParams = calculateGalleryParams(artist.totalArtworks, windowSize.inMobileMode);

        return (
            <ArtistGallery pageWidth={windowSize.windowWidth}
                           pageHeight={windowSize.windowHeight}
                           galleryIsZoomedOut={galleryIsZoomedOut}
                           galleryParams={galleryParams}
                           artist={artist}
                           artworks={artworks}
                           artistArtworkIds={artistArtworkIds}
                           onThumbClick={(id) => {this.onThumbClick(id)}}/>
        )
    }
}

// helper functions
let prevParams = null;
let prevCalcInputs = { totalArtworks: -1, inMobileMode: null };
const calculateGalleryParams = (totalArtworks = 0, inMobileMode = false) => {
    // Stop recalculation if not needed
    if (prevCalcInputs.totalArtworks === totalArtworks && prevCalcInputs.inMobileMode === inMobileMode) {
        if (prevParams) return prevParams;
    }
    prevCalcInputs = { totalArtworks, inMobileMode };
    //

    const hue = 185;
    const saturation = 34;
    const lightness = 61;

    const nameSectionHue = 290;

    const roofHeight = 364;
    const nameHeight = 422;
    const bottomHeight = 500;

    // Windows sections
    const windowsSectionPadding = { top: 60, right: 45, bottom: 60, left: 45 };

    const windowsPerFloor = inMobileMode ? 2 : 3;
    const origWindowWidth = 190;
    const origWindowHeight = 206;

    const mobileScaleUp = 1.7;
    const windowFrameWidth = inMobileMode ? origWindowWidth * mobileScaleUp : origWindowWidth;
    const windowFrameHeight = inMobileMode ? origWindowHeight * mobileScaleUp : origWindowHeight;

    let windowPadding = { top: 5, right: 23, bottom: 25, left: 23 };
    if (inMobileMode) {
        windowPadding = { top: 5, right: 15, bottom: 15, left: 15 };
    }

    const windowWidth = windowFrameWidth;
    const windowHeight = windowFrameHeight;
    const windowWidthWithPadding = windowWidth + windowPadding.left + windowPadding.right;
    const windowHeightWithPadding = windowHeight + windowPadding.top + windowPadding.bottom;

    const floors = Math.ceil(totalArtworks / windowsPerFloor);

    const windowsHeight = (floors * windowHeightWithPadding) + (windowsSectionPadding.top + windowsSectionPadding.bottom);

    const galleryPaddingTop = 25;
    const galleryPaddingBottom = 150;
    const galleryHeight = roofHeight + nameHeight + windowsHeight + bottomHeight + galleryPaddingTop + galleryPaddingBottom;
    const galleryWidth = 800;

    const windowParams = {
        windowWidth, windowsSectionPadding, windowPadding, windowHeight,
        windowWidthWithPadding, windowHeightWithPadding,
    };

    prevParams = {
        windowParams,
        hue,
        saturation,
        lightness,
        nameSectionHue,
        roofHeight,
        nameHeight,
        windowsHeight,
        bottomHeight,
        galleryWidth,
        galleryHeight,
        galleryPaddingTop
    };

    return prevParams;
};
const getArtistArtworks = (artworks, artistArtworkIds) => {
    if (artworks && artistArtworkIds) {
        const artworkIds = Object.keys(artistArtworkIds);
        let artistArtworks = {};

        for (let id of artworkIds) {
            if (artworks[id]) {
                artistArtworks[id] = artworks[id];
            }
        }
        return artistArtworks;
    }
};

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    // const artworks = getArtistArtworks(state.artworks, state.artistArtworkIds[ownProps.galleryId]);
    const artistArtworkIds = state.artistArtworkIds[ownProps.galleryId];

    return {
        artist: state.artists[ownProps.galleryId],
        artistArtworkIds: artistArtworkIds,
        artworks: state.artworks,
        galleryParams: state.ui.galleryParams,
        windowSize: state.ui.windowSize,
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { fetchArtistArtworkIds: listenForArtistArtworkIdsChanges, fetchArtist: listenForArtistChanges, fetchArtwork: listenForArtworkChanges }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

