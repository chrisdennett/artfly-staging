import React, { Component } from "react";
import { connect } from 'react-redux';

import EditArtistForm from './EditArtistForm';
import { setCurrentArtist, updateArtist, cancelArtistUpdate, deleteArtist } from '../ControlPanelActions';
import ArtworkAdder from '../ArtworkAdder/ArtworkAdder';

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

    onCancelDeleteButtClick(){
        this.setState({ showConfirmDelete: false });
    }

    onConfirmDeleteButtClick(){
        this.setState({ showConfirmDelete: false })
        this.props.deleteArtist(this.props.artistId, this.props.userId, this.props.galleryId, () => {
            console.log("delete callback");
        });
    }

    onFormSubmit(newArtistData) {
        this.props.updateArtist(this.props.artistId, newArtistData, () => {
            this.setState({ inEditingMode: false })
        });
    }

    render() {
        let content;
        let editButtonStyle = {};
        if (this.props.disableEditing) {
            editButtonStyle.display = 'none';
        }

        if(!this.props.artist){
            return <span>ARTIST BEING DELETED</span>
        }

        if (this.state.showConfirmDelete) {
            content = (
                <div>
                    <div>Artist: {this.props.artist.name}</div>
                    <div>Biog: {this.props.artist.biog}</div>
                    <hr />
                    <div>Are you want to delete this Artist and all their artworks?</div>
                    <button style={editButtonStyle} onClick={this.onCancelDeleteButtClick.bind(this)}>Cancel</button>
                    <button style={editButtonStyle} onClick={this.onConfirmDeleteButtClick.bind(this)}>Yes Delete artist and 42 artworks</button>
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
                    <ArtworkAdder userId={this.props.userId} artistId={this.props.artistId}/>
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
