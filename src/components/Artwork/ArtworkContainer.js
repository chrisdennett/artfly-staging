import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import Artwork from './Artwork';

class ArtworkHolder extends Component {
   render() {
        const { artwork, windowSize } = this.props;
        if(!artwork || !windowSize){
            return <div>Artwork Loading screen goes here...</div>
        }
        else if(!artwork.url){
            // return <Redirect to="/settings/" />;
        }

        return <Artwork artwork={artwork} windowSize={windowSize}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    return {
        artwork: state.artworks[ownProps.artworkId],
        windowSize: state.ui.windowSize
    }
};

const ArtworkContainer = connect(
    mapStateToProps, {  }
)(ArtworkHolder);

export default ArtworkContainer;
