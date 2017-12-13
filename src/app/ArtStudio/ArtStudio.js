// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges } from '../../actions/UserDataActions';
// components
import PictureMaker from "./ArtMakers/PictureMaker/PictureMaker";

// In the future this screen will have options for the types of artwork
// to make. Buttons would determine the maker to load
// as far as editing goes a property in the artwork would decide the editor to load
class ArtStudio extends Component {

    constructor() {
        super();

        this.loadArtworkAndArtist = this.loadArtworkAndArtist.bind(this);
    }

    componentDidMount() {
        this.loadArtworkAndArtist(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadArtworkAndArtist(nextProps);
    }

    loadArtworkAndArtist(props) {
        if (props.artworkId && !props.artwork) {
            this.props.listenForArtworkChanges(props.artworkId);
        }

        if (props.artwork && !props.artist) {
            const { artistId } = props.artwork;
            this.props.listenForArtistChanges(artistId);
        }
    }

    render() {
        let isLoadingMakerData = false;
        if (this.props.artworkId && this.props.artworkId !== 'new' && !this.props.artwork) isLoadingMakerData = true;
        if (this.props.artwork && !this.props.artist) isLoadingMakerData = true;

        // If there's an artworkId, load the artwork, find out what type it is and set up the relevant Maker.

        if (isLoadingMakerData) return <p>Lovely loading animation here...</p>;

        let { windowSize, artworkId, artwork, artist, userId, currentEditScreen, selectedArtistId } = this.props;

        if(this.props.artworkId === 'new') currentEditScreen = 'new';

        return (
            <PictureMaker userId={userId}
                          windowSize={windowSize}
                          artworkId={artworkId}
                          selectedArtistId={selectedArtistId}
                          artwork={artwork}
                          artist={artist}
                          currentEditScreen={currentEditScreen}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentArtwork = state.artworks[ownProps.artworkId];
    const currentArtist = currentArtwork ? state.artists[currentArtwork.artistId] : null;
    const windowSize = state.ui.windowSize ? state.ui.windowSize : null;

    return {
        artwork: currentArtwork,
        artist: currentArtist,
        userId: state.user.uid,
        windowSize: windowSize
    }
};

const mapActionsToProps = { listenForArtworkChanges, listenForArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtStudio);