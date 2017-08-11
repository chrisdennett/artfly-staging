import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchArtwork } from '../ArtistGallery/ArtistGalleryActions';

import Artwork from './Artwork';


// Intermediary component so ui component isn't required to call data
class ArtworkHolder extends Component {
    componentDidMount() {
        this.props.fetchArtwork(this.props.artworkId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.artworkId !== prevProps.artworkId) {
            this.props.fetchArtwork(this.props.artworkId);
        }
    }

    render() {
        const { artwork } = this.props;
        if(!artwork){
            return <div>Artwork Loading screen goes here...</div>
        }

        return <Artwork artwork={artwork}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { artworkId } = ownProps.match.params;
    const artwork = state.artworks[artworkId];

    return {
        artworkId: artworkId,
        artwork: artwork
    }
};

const ArtworkContainer = connect(
    mapStateToProps, { fetchArtwork }
)(ArtworkHolder);

export default ArtworkContainer;
