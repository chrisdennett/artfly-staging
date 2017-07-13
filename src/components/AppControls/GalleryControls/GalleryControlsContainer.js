import React, { Component } from 'react';
import { connect } from 'react-redux';

import GalleryControls from './GalleryControls';

// Intermediary component so ui component isn't required to call data
class GalleryControlsHolder extends Component {
    componentDidMount() {
        // this.props.fetchUserData();
    }

    componentDidUpdate(prevProps) {
        /*if (this.props.artworkId !== prevProps.artworkId) {
            this.props.fetchArtwork(this.props.artworkId);
        }*/
    }

    render() {
        // const { artwork } = this.props;
        return <GalleryControls
                            history={this.props.history}
                            artworkIds={this.props.artworkIds}
                            galleryId={this.props.galleryId}
                            artworkId={this.props.artworkId} />;
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
    mapStateToProps, {  }
)(GalleryControlsHolder);

export default GalleryControlsContainer;
