// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges } from '../../actions/UserDataActions';
// components
import Artwork from './Artwork';

class ArtworkHolder extends Component {

    componentDidMount() {
        this.props.listenForArtworkChanges(this.props.artworkId);
    }

    componentWillUpdate(nextProps){
        if(this.props.artworkId !== nextProps.artworkId){
            this.props.listenForArtworkChanges(nextProps.artworkId);
        }
    }

    render() {
        const { artwork, windowSize } = this.props;
        if (!artwork || !windowSize) {
            return <div>Artwork Loading...</div>
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
    mapStateToProps, { listenForArtworkChanges}
)(ArtworkHolder);

export default ArtworkContainer;
