import React, { Component } from "react";

import './artworkEditor.css';
import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import SaveProgressButton from "../global/SaveProgressButton";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);
        this.state = { deleteConfirmIsShowing: false, artworkDeleted: false };
    }

    onDeleteArtwork() {
        this.setState({ deleteConfirmIsShowing: true });
    }

    onDeleteCancel() {
        this.setState({ deleteConfirmIsShowing: false });
    }

    onDeleteConfirm() {
        this.setState({ deleteConfirmIsShowing: false, artworkDeleted: true });
        this.props.onConfirmDeleteArtwork()
    }

    render() {
        const {
                  url, artistId, artists, onArtistSelected, onCropDataConfirm,
                  onCropImageSave, onSaveChanges, onCancelChanges
              } = this.props;

        if (this.state.artworkDeleted) {
            return (
                <div>
                    Artwork Deleting
                </div>);
        }

        let confirmDeleteStyle = { display: 'none' };
        let actionButtonsStyle = {};
        let cropperStyle = { maxWidth: 250 };
        let artistSelectorStyle = {};
        if (this.state.deleteConfirmIsShowing) {
            confirmDeleteStyle = {};
            actionButtonsStyle = { display: 'none' };
            cropperStyle.display = 'none';
            artistSelectorStyle = { display: 'none' };
        }

        let saveButtonLabel = "Save changes";

        if (this.props.isSaving) {
            saveButtonLabel = "Saving";
        }
        else if (this.props.changesUnsaved) {
            saveButtonLabel = "*Save changes";
        }

        return (

            <div className={'artwork-editor'}>
                <div className={'artwork-editor-contents'}>
                    <h1>Artwork Editor</h1>

                    <div className={'artwork-editor-artist-section'}>
                        <ArtistSelector artists={artists}
                                        style={artistSelectorStyle}
                                        selectedArtistId={artistId}
                                        onArtistSelected={onArtistSelected}/>
                    </div>

                    <div className={'artwork-editor-image-section'} style={cropperStyle}>
                        <ImageCropAndRotate url={url}
                                            ref={instance => { this.cropper = instance; }}
                                            onCropDataConfirm={onCropDataConfirm}
                                            onCropImageSave={onCropImageSave}/>
                        <button className={'butt'} onClick={() => { this.cropper.openEditScreen(); }}>
                            Edit Image
                        </button>
                    </div>

                    <div style={actionButtonsStyle}>
                        <SaveProgressButton className={'butt'} label={saveButtonLabel} onClick={onSaveChanges}/>
                        <button className={'butt'} onClick={onCancelChanges}>Done</button>
                        <button className={'butt'} onClick={this.onDeleteArtwork.bind(this)}>Delete Image</button>
                    </div>

                    <div style={confirmDeleteStyle}>
                        <p>Are you sure you want to delete this artwork?</p>
                        <button className={'butt'} onClick={this.onDeleteConfirm.bind(this)}>Yes, delete it</button>
                        <button className={'butt'} onClick={this.onDeleteCancel.bind(this)}>No, do not delete</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default ArtworkEditor;