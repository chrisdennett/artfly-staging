// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges } from '../../actions/UserDataActions';
// components
// import Page from "../global/Page";
// import BasicPictureMaker from "../ArtLibrary/BasicPicture/maker/BasicPictureMaker";
// import BasicPictureEditor from "../ArtLibrary/BasicPicture/editor/BasicPictureEditor";
import ArtMaker from "../ArtLibrary/ArtMaker/ArtMaker";

// displays the correct Maker and loads artwork and artist.
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

        // In the future this screen will have options for the types of artwork
        // to make. Buttons would determine the maker to load
        // as far as editing goes a property in the artwork would decide the editor to load

        // If there's an artworkId, load the artwork, find out what type it is and set up the relevant Maker.

        // const {artworkId, artwork} = this.props;

        if (isLoadingMakerData) return <p>Lovely loading animation here...</p>;

        const { artworkId, artwork, artist, userId, currentEditScreen, selectedArtistId } = this.props;

        return (
            <ArtMaker userId={userId}
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

    return {
        artwork: currentArtwork,
        artist: currentArtist,
        userId: state.user.uid
    }
};

const mapActionsToProps = { listenForArtworkChanges, listenForArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtStudio);