import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGalleryArtistArtworkIds } from '../../ArtistGallery/ArtistGalleryActions';

import GalleryControls from './GalleryControls';

// Intermediary component so ui component isn't required to call data
class GalleryControlsHolder extends Component {
    componentDidMount() {
        this.initData(this.props.galleryId);
    }

    initData(artistGalleryId) {
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }

    componentWillUpdate(nextProps) {
        this.initData(this.props.galleryId);
    }

    render() {
        const { artworkId, galleryId, artworkIds, history } = this.props;
        let prevId = null;
        let nextId = null;

        if (artworkIds) {
            const allIds = Object.keys(artworkIds);
            const currIdIndex = allIds.indexOf(artworkId);

            if (currIdIndex > 0) {
                prevId = allIds[currIdIndex - 1];
            }

            if (allIds.length - 1 > currIdIndex) {
                nextId = allIds[currIdIndex + 1];
            }
        }

        return <GalleryControls
            history={history}
            nextArtworkId={nextId}
            prevArtworkId={prevId}
            artworkIds={artworkIds}
            galleryId={galleryId}
            artworkId={artworkId}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { galleryId, artworkId } = ownProps;

    return {
        galleryId: galleryId,
        artworkId: artworkId,
        artworkIds: state.artistsArtworkIds[galleryId]
    }
};

const GalleryControlsContainer = connect(
    mapStateToProps, { fetchGalleryArtistArtworkIds }
)(GalleryControlsHolder);

export default GalleryControlsContainer;
