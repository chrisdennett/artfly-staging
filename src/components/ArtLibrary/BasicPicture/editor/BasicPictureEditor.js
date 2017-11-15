// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges, deleteArtwork } from '../../../../actions/UserDataActions';
// components
import Butt from "../../../global/Butt";
import InlineArtistUpdater from "../../../InlineArtistUpdater/InlineArtistUpdater";
import InlinePhotoUpdater from "../../../InlinePhotoUpdater/InlinePhotoUpdater";
import history from '../../../global/history';
import Modal from "../../../global/Modal";

class BasicPictureEditor extends Component {

    constructor() {
        super();

        this.onDeleteArtwork = this.onDeleteArtwork.bind(this);
        this.openArtworkInGallery = this.openArtworkInGallery.bind(this);

        this.state = { deleteConfirmIsShowing: false, artworkDeleting: false }
    }

    componentDidMount() {
        this.props.listenForArtworkChanges(this.props.artworkId);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.artist && nextProps.artwork) {
            this.props.listenForArtistChanges(nextProps.artwork.artistId);
        }
    }

    openArtworkInGallery() {
        const { artist, artworkId } = this.props;
        const { artistId } = artist;
        history.push(`/gallery/${artistId}/artwork/${artworkId}`)
    }

    onDeleteArtwork() {
        this.setState({ deleteConfirmIsShowing: true });
    }

    onDeleteCancel() {
        this.setState({ deleteConfirmIsShowing: false });
    }

    onDeleteConfirm() {
        this.setState({ deleteConfirmIsShowing: false, artworkDeleting: true });

        const { artist, artworkId } = this.props;
        const { artistId } = artist;

        this.props.deleteArtwork(artworkId, artistId, () => {
            history.push(`/gallery/${artistId}`);
        });
    }

    render() {
        if (!this.props.artwork || !this.props.artist) return null;

        const { artist, artworkId, artwork } = this.props;

        return (
            <div>
                <Modal title={'Delete Artwork?'} isOpen={this.state.deleteConfirmIsShowing}>
                    <p>Are you sure you want to delete the artwork?</p>
                    <Butt label={'Yes, delete it'} onClick={this.onDeleteConfirm.bind(this)}/>
                    <Butt label={'No, do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
                </Modal>

                <InlineArtistUpdater artist={artist} artworkId={artworkId}/>
                <InlinePhotoUpdater artistId={artist.artistId} artwork={artwork} artworkId={artworkId}/>

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

const mapActionsToProps = { listenForArtworkChanges, listenForArtistChanges, deleteArtwork };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureEditor);