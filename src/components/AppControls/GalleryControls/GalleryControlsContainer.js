// Externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
// Actions
import { setGalleryZoom } from '../../../actions/UiActions';
import { listenForArtistArtworkChanges } from '../../../actions/UserDataActions';
// Components
import GalleryControls from './GalleryControls';

class GalleryControlsHolder extends Component {
    constructor(props) {
        super(props);
        this.onZoomClick = this.onZoomClick.bind(this);

        props.listenForArtistArtworkChanges(props.galleryId);
    }

    componentDidMount() {
        // this.props.listenForArtistChanges(this.props.galleryId);
        // this.props.listenForArtistArtworkChanges(this.props.galleryId);
    }

    onZoomClick() {
        this.props.setGalleryZoom(!this.props.galleryIsZoomedOut);
    }

    render() {
        const { artworkId, galleryId, galleryArtworkIds: galleryArtworkIds, galleryIsZoomedOut } = this.props;
        let prevId = null;
        let nextId = null;

        if (galleryArtworkIds && galleryArtworkIds.length > 0) {
            const currIdIndex = galleryArtworkIds.indexOf(artworkId);

            if (currIdIndex > 0) {
                prevId = galleryArtworkIds[currIdIndex - 1];
            }

            if (galleryArtworkIds.length - 1 > currIdIndex) {
                nextId = galleryArtworkIds[currIdIndex + 1];
            }
        }

        return <GalleryControls galleryIsZoomedOut={galleryIsZoomedOut}
                                onZoomClick={this.onZoomClick}
                                nextArtworkId={nextId}
                                prevArtworkId={prevId}
                                artworkIds={galleryArtworkIds}
                                galleryId={galleryId}
                                artworkId={artworkId}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const galleryArtworks = _.pickBy(state.artworks, (value) => {
        return value.artistId === ownProps.galleryId;
    });
    const galleryArtworksInDateOrder = _.orderBy(galleryArtworks, ['dateAdded'], ['desc']);
    let galleryArtworkIds = [];
    for(let artwork of galleryArtworksInDateOrder){
        galleryArtworkIds.push(artwork.artworkId);
    }

    return {
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut,
        galleryArtworks: galleryArtworks,
        galleryArtworkIds: galleryArtworkIds
    }
};

const GalleryControlsContainer = connect(
    mapStateToProps, { setGalleryZoom, listenForArtistArtworkChanges }
)(GalleryControlsHolder);

export default GalleryControlsContainer;
