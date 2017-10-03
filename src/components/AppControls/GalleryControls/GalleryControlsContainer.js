import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchArtistArtworkIds } from '../../../actions/ArtistGalleryActions';
import { setGalleryZoom } from '../../../actions/UiActions';

import GalleryControls from './GalleryControls';

// Intermediary component so ui component isn't required to call data
class GalleryControlsHolder extends Component {
    constructor(props){
        super(props);
        this.onZoomClick = this.onZoomClick.bind(this);
    }

    componentDidMount() {
        this.initData(this.props.galleryId);
    }

    initData(artistGalleryId) {
        this.props.fetchArtistArtworkIds(artistGalleryId);
    }

    componentWillUpdate() {
        this.initData(this.props.galleryId);
    }

    onZoomClick(){
        this.props.setGalleryZoom(!this.props.galleryIsZoomedOut);
    }

    render() {
        const { artworkId, galleryId, artworkIds, history, galleryIsZoomedOut } = this.props;
        let prevId = null;
        let nextId = null;

        if (artworkIds) {
            // sort the ids in reverse order.
            const allIds = Object.keys(artworkIds).sort((a,b) => {
                return artworkIds[b]-artworkIds[a]
            });

            // const allIds = Object.keys(artworkIds);
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
            galleryIsZoomedOut={galleryIsZoomedOut}
            onZoomClick={this.onZoomClick}
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
        artworkIds: state.artistsArtworkIds[galleryId],
        galleryIsZoomedOut: state.ui.galleryIsZoomedOut
    }
};

const GalleryControlsContainer = connect(
    mapStateToProps, { fetchArtistArtworkIds, setGalleryZoom }
)(GalleryControlsHolder);

export default GalleryControlsContainer;
