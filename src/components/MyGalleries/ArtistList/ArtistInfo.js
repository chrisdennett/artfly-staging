import React, { Component } from "react";
import { connect } from 'react-redux';

import EditArtistForm from './EditArtistForm';
import { setCurrentArtist, updateArtist, cancelArtistUpdate, deleteArtist } from '../MyGalleriesActions';
// import ArtworkAdder from '../ArtworkAdder/ArtworkAdder';

class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { inEditingMode: false, showConfirmDelete: false }
    }

    onEditButtClick() {
        this.props.setCurrentArtist(this.props.artistId, () => {
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
        this.props.updateArtist(this.props.artistId, newArtistData, () => {
            this.setState({ inEditingMode: false })
        });
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

            content = (
                <div>
                    <div>Artist: {this.props.artist.name}</div>
                    <div>Biog: {this.props.artist.biog}</div>
                    <div>Total artworks: {totalArtworks}</div>
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
                    <div>Artist: {this.props.artist.name}</div>
                    <div>Biog: {this.props.artist.biog}</div>
                    <div>Total artworks: {totalArtworks}</div>
                    {/*<ArtworkAdder userId={this.props.userId} artistId={this.props.artistId}/>*/}
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
