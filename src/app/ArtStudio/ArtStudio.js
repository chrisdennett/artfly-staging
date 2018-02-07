
// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges } from '../../actions/UserDataActions';
// components
import history from '../global/history';
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
        if (props.artworkId === 'new') {
            // load the default artist?
        }
        else {
            // Artwork Id in params, but artwork not loaded
            if (!props.artwork) {
                this.props.listenForArtworkChanges(props.artworkId, (error) => {
                    // redirects to home paged if there's an error
                    history.push('/');
                });
            }
            // Artwork has been loaded, but not artist
            else if(!props.artist){
                const { artistId } = props.artwork;
                this.props.listenForArtistChanges(artistId);
            }
        }
    }

    render() {
        const { artworkId, artwork, artist, userId, currentEditScreen, windowSize } = this.props;
        const isNewArtwork = artworkId === 'new';
        let isLoadingMakerData = false;

        // if loading a current artwork
        if (artworkId && !isNewArtwork && !artwork) isLoadingMakerData = true;
        // or still loading the artist
        if (artwork && !artist) isLoadingMakerData = true;

        // don't mount the component until data is ready for it
        // if (isLoadingMakerData) return <LoadingOverlay/>;

        return (
            <PictureMaker userId={userId}
                          isLoadingData={isLoadingMakerData}
                          isNewArtwork={isNewArtwork}
                          windowSize={windowSize}
                          artworkId={artworkId}
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