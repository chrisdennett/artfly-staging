import React, { Component } from "react";
import { connect } from 'react-redux';

import EditArtistForm from './EditArtistForm';
import { setCurrentArtist, updateArtist, cancelArtistUpdate, deleteArtist } from '../MyGalleriesActions';

class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { inEditingMode: false, showConfirmDelete: false }
    }

    onEditButtClick() {
        const galleryName = this.props.galleries[this.props.artist.artistGalleryId].name;

        this.props.setCurrentArtist(this.props.artist, this.props.artistId, galleryName, () => {
            this.setState({ inEditingMode: true })
        });
    }

    onCancelEdit() {
        this.props.cancelArtistUpdate(() => {
            this.setState({ inEditingMode: false });
        });
    }

    onDeleteButtClick() {
        this.setState({ showConfirmDelete: true });
    }

    onCancelDeleteButtClick() {
        this.setState({ showConfirmDelete: false });
    }

    onConfirmDeleteButtClick() {
        this.setState({ showConfirmDelete: false });
        this.props.deleteArtist(this.props.artistId, this.props.userId, this.props.galleryId);
    }

    onFormSubmit(newArtistData) {
        this.setState({ inEditingMode: false });
        this.props.updateArtist(this.props.artistId, newArtistData);
    }

    onOpenGalleryButtClick() {
        this.props.history.push(`/gallery/${this.props.artist.artistGalleryId}`);
    }

    render() {
        const totalArtworks = (!this.props.artist || !this.props.artist.artworkIds) ? "" : this.props.artist.artworkIds.length;
        let content;
        let editButtonStyle = {};
        if (this.props.disableEditing) {
            editButtonStyle.display = 'none';
        }

        if (!this.props.artist) {
            return <span>ARTIST BEING DELETED</span>
        }

        const artistGallery = this.props.galleries[this.props.artist.artistGalleryId];
        const galleryName = (!artistGallery) ? "" : artistGallery.name;

        const artistInfo = <div>
            <h1>{galleryName}</h1>
            <div>Artist: {this.props.artist.name}</div>
            <div>Biog: {this.props.artist.biog}</div>
            <div>Total artworks: {totalArtworks}</div>
        </div>;

        if (this.state.showConfirmDelete) {
            let deleteWarningMessage;

            if (totalArtworks === 1) {
                deleteWarningMessage = `Yes, DELETE artist and their ${totalArtworks} artwork`;
            }
            else if (totalArtworks === 0) {
                deleteWarningMessage = `Yes, DELETE artist (they have no artworks)`;
            }
            else {
                deleteWarningMessage = `Yes, DELETE artist and their ${totalArtworks} artworks`;
            }

            //TODO: Consider having artist editing taking up a full page, could trigger a function on parent component to do this
            content = (
                <div>
                    {artistInfo}
                    <hr />
                    <div>Are you want to delete this Artist and all their artworks?</div>
                    <button style={editButtonStyle} onClick={this.onCancelDeleteButtClick.bind(this)}>Cancel</button>
                    <button style={editButtonStyle}
                            onClick={this.onConfirmDeleteButtClick.bind(this)}>{deleteWarningMessage}</button>
                </div>
            );
        }
        else if (this.state.inEditingMode) {
            content = (
                <EditArtistForm artistId={this.props.artistId}
                                artistName={this.props.artist.name}
                                onFormSubmit={this.onFormSubmit.bind(this)}
                                onFormCancel={this.onCancelEdit.bind(this)}/>
            );
        }
        else {
            content = (
                <div>
                    {artistInfo}

                    <button style={editButtonStyle} onClick={this.onOpenGalleryButtClick.bind(this)}>Open Gallery
                    </button>
                    <button style={editButtonStyle} onClick={this.onEditButtClick.bind(this)}>Edit</button>
                    <button style={editButtonStyle} onClick={this.onDeleteButtClick.bind(this)}>Delete</button>
                </div>
            );
        }

        return (
            <div>
                {content}
                <hr />
            </div>
        );
    }
}

export default connect(null, {
    setCurrentArtist,
    updateArtist,
    cancelArtistUpdate,
    deleteArtist
})(ArtistInfo);
