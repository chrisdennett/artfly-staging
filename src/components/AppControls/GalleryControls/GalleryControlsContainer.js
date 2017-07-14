import React, { Component } from 'react';
import { connect } from 'react-redux';

import {fetchGalleryArtistArtworkIds} from '../../ArtistGallery/ArtistGalleryActions';

import GalleryControls from './GalleryControls';

// Intermediary component so ui component isn't required to call data
class GalleryControlsHolder extends Component {
    componentDidMount() {
        this.initData(this.props.galleryId);
    }

    initData(artistGalleryId){
        this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
    }

    componentWillUpdate(nextProps) {
        this.initData(this.props.galleryId);
    }

    render() {
        const {artworkId, galleryId, artworkIds, history} = this.props;

        return <GalleryControls
                            history={history}
                            artworkIds={artworkIds}
                            galleryId={galleryId}
                            artworkId={artworkId} />;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const {galleryId, artworkId} = ownProps;

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
