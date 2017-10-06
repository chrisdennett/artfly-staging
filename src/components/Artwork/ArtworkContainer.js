import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchArtwork } from '../../actions/ArtistGalleryActions';

import Artwork from './Artwork';

class ArtworkHolder extends Component {
    componentDidMount() {
        this.props.fetchArtwork(this.props.artworkId);
        document.body.classList.toggle('no-scroll-bars', true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.artworkId !== prevProps.artworkId) {
            this.props.fetchArtwork(this.props.artworkId);
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    render() {
        const { artwork } = this.props;
        if(!artwork){
            return <div>Artwork Loading screen goes here...</div>
        }
        else if(!artwork.url){
            return <Redirect to="/settings/" />;
        }

        return <Artwork artwork={artwork}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { artworkId } = ownProps;
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
