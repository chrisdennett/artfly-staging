// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges } from '../../../../actions/UserDataActions';
import Butt from "../../../global/Butt";
import InlineArtistUpdater from "../../../InlineArtistUpdater/InlineArtistUpdater";
import InlinePhotoUpdater from "../../../InlinePhotoUpdater/InlinePhotoUpdater";
import history from '../../../global/history';

class BasicPictureEditor extends Component {

    constructor() {
        super();

        this.onDeleteArtwork = this.onDeleteArtwork.bind(this);
        this.onEditArtist = this.onEditArtist.bind(this);
        this.onEditPhoto = this.onEditPhoto.bind(this);
        this.openArtworkInGallery = this.openArtworkInGallery.bind(this);

        this.state = { editingPhoto: false, editingArtist: false }
    }

    componentDidMount() {
        this.props.listenForArtworkChanges(this.props.artworkId);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.artist && nextProps.artwork) {
            this.props.listenForArtistChanges(nextProps.artwork.artistId);
        }
    }

    onEditPhoto() {
        this.setState({ editingPhoto: true });
    }

    onEditArtist() {
        this.setState({ editingArtist: true });
    }

    openArtworkInGallery() {
        const { artist, artworkId } = this.props;
        const { artistId } = artist;
        history.push(`/gallery/${artistId}/artwork/${artworkId}`)
    }

    onDeleteArtwork() {

    }

    render() {
        if (!this.props.artwork || !this.props.artist) return null;

        const { artist, artworkId, artwork } = this.props;

        return (
            <div>
                <h3>Basic Picture Editor</h3>
                <InlineArtistUpdater artist={artist} artworkId={artworkId}/>
                <InlinePhotoUpdater artistId={artist.artistId} artwork={artwork} artworkId={artworkId}/>

                <hr/>
                <Butt label={'Delete Artwork'}
                      backgroundColour={'#920000'}
                      shadowColour={'#540000'}
                      onClick={this.onDeleteArtwork}/>

                <Butt label={'View in Gallery'}
                      onClick={this.openArtworkInGallery}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentArtwork = state.artworks[ownProps.artworkId];
    let artist;
    if (currentArtwork) {
        artist = state.artists[currentArtwork.artistId]
    }

    return {
        artwork: currentArtwork,
        artist: artist
    }
};

const mapActionsToProps = { listenForArtworkChanges, listenForArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureEditor);