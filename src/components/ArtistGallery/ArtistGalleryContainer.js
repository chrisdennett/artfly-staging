import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArtistGallery from './ArtistGallery';
import { fetchArtwork } from '../../actions/ArtistGalleryActions';
import { getGalleryParams } from "../../actions/UiActions";

// Intermediary component so ui component isn't required to call data
class ArtistGalleryHolder extends Component {
    constructor(props) {
        super(props);
        this.state = { pageWidth: 0, pageHeight: 0, inMobileMode: null };
    }

    componentDidMount() {

        this.getWindowSize();

        window.onresize = this.getWindowSize.bind(this);


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
        if (prevProps.totalArtworks !== this.props.totalArtworks ||
            prevState.inMobileMode !== this.state.inMobileMode) {

            this.props.getGalleryParams(this.props.totalArtworks, this.state.inMobileMode);
        }

        if (prevProps.artworkIds !== this.props.artworkIds) {
            for (let id of this.props.artworkIds) {
                this.props.fetchArtwork(id);
            }
        }

        if (prevProps.galleryIsZoomedOut !== this.props.galleryIsZoomedOut) {
            if (this.props.galleryIsZoomedOut) {
                document.body.classList.toggle('no-scroll-bars', true);
            }
            else {
                document.body.classList.remove('no-scroll-bars');
            }
        }
    }

    getWindowSize() {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        this.setState({ pageWidth, pageHeight, inMobileMode: pageWidth < 500 });
    }

    onThumbClick(artworkId) {
        this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
    }

    render() {
        const { artist, totalArtworks, artworks, artworkIds, galleryParams, galleryIsZoomedOut } = this.props;
        if (!artist || !artworks) {
            return <div>Artist Gallery Loading</div>;
        }

        return <ArtistGallery pageWidth={this.state.pageWidth}
                              pageHeight={this.state.pageHeight}
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

    let sortedArtworkIds = [];
    let totalArtworks = 0;
    if (state.artists[galleryId] && state.artists[galleryId].artworkIds && state.artists[galleryId].totalArtworks > 0) {
        // sort the ids in reverse order.
        const {artworkIds} = state.artists[galleryId];
        totalArtworks = state.artists[galleryId].totalArtworks;

        sortedArtworkIds = artworkIds.sort((a, b) => {
            return artworkIds[b] - artworkIds[a]
        });
    }

    return {
        galleryParams: state.ui.galleryParams,
        galleryId: galleryId,
        gallery: state.galleries[galleryId],
        artist: state.artists[galleryId],
        totalArtworks: totalArtworks,
        artworkIds: sortedArtworkIds,
        artworks: state.artworks,
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const ArtistGalleryContainer = connect(
    mapStateToProps, { fetchArtwork, getGalleryParams }
)(ArtistGalleryHolder);

export default ArtistGalleryContainer;

