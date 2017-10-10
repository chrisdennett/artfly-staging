// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { fetchArtistArtworkIds, fetchArtist, fetchArtwork } from '../../actions/ArtistGalleryActions';
// components
import ArtistGallery from './ArtistGallery';

// helper function
const getGalleryArtworks = (artistArtworkIds, artworks) => {
    const artworkIds = Object.keys(artistArtworkIds);
    let artistArtworks = {};

    for (let id of artworkIds) {
        if (artworks[id]) {
            artistArtworks[id] = artworks[id];
        }
    }
    return artistArtworks;
};

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {

    constructor(props) {
        super(props);
        this.state = { galleryParams: null }
    }

    componentDidMount() {
        this.fetchData();

        if(this.props.artist && this.props.windowSize){
            this.setGalleryParams(this.props.artist.totalArtworks, this.props.windowSize.inMobileMode);
        }
    }

    setGalleryParams(totalArtworks, inMobileMode){
        const galleryParams = this.calculateGalleryParams(totalArtworks, inMobileMode);
        this.setState({ galleryParams });
    }

    fetchData(){
        if (this.props.galleryId) {
            this.props.fetchArtistArtworkIds(this.props.galleryId);
            this.props.fetchArtist(this.props.galleryId);
        }

        if(this.props.artist && this.props.artist.artworkIds ){
            for(let artId of Object.keys(this.props.artist.artworkIds)){
                this.props.fetchArtwork(artId);
            }
        }
    }

    componentWillUpdate(nextProps) {
        this.fetchData();

        const { inMobileMode: oldInMobileMode } = this.props.windowSize;
        const { inMobileMode: newInMobileMode } = nextProps.windowSize;

        let updateNeeded = newInMobileMode !== oldInMobileMode;

        if (updateNeeded === false) {
            const totalCurrentArtworks = !this.props.artist ? 0 : this.props.artist.totalArtworks;
            const totalNextArtworks = !this.props.artist ? 0 : nextProps.artist.totalArtworks;

            updateNeeded = totalCurrentArtworks !== totalNextArtworks;
        }

        if (updateNeeded && nextProps.artist.totalArtworks) {
           this.setGalleryParams(nextProps.artist.totalArtworks, newInMobileMode);
        }


    }

    calculateGalleryParams(totalArtworks, inMobileMode) {

        if(!totalArtworks) {
            console.log("calculateGalleryParams > totalArtworks: ", totalArtworks);
            return
        }

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

        return {
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
    }

    onThumbClick(artworkId) {
        this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
    }

    render() {
        const { artist, artworks, galleryIsZoomedOut, windowSize } = this.props;
        if (!artist || !artworks || artworks.length === 0 || !windowSize || windowSize.windowWidth < 1 || windowSize.windowHeight < 1 || !this.state.galleryParams) {
            return <div>Artist Gallery Loading</div>;
        }

        return (
            <ArtistGallery pageWidth={windowSize.windowWidth}
                           pageHeight={windowSize.windowHeight}
                           galleryIsZoomedOut={galleryIsZoomedOut}
                           galleryParams={this.state.galleryParams}
                           artist={artist}
                           artworks={artworks}
                           onThumbClick={this.onThumbClick.bind(this)}/>

        )
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    let artworks = null;
    if(state.artists && state.artists[ownProps.galleryId] && state.artworks){
        const artworkIds = state.artists[ownProps.galleryId].artworkIds;
        artworks = getGalleryArtworks(artworkIds, state.artworks)
    }

    return {
        artist: state.artists[ownProps.galleryId],
        artworks: artworks,
        galleryParams: state.ui.galleryParams,
        windowSize: state.ui.windowSize,
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { fetchArtistArtworkIds, fetchArtist, fetchArtwork }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

