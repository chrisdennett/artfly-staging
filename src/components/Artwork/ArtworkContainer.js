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

        const {windowWidth, windowHeight} = windowSize;

        return <Artwork artwork={artwork} width={windowWidth} height={windowHeight}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    return {
        artwork: state.artworks[ownProps.artworkId],
        windowSize: state.ui.windowSize
    }
};
const mapActionsToProps = { listenForArtworkChanges};

export default connect( mapStateToProps, mapActionsToProps)(ArtworkHolder);
