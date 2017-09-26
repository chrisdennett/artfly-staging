import React, { Component } from "react";

import './artworkEditor.css';
import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import Butt from "../global/Butt";

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
                        <Butt label={`Crop / Rotate`} onClick={() => { this.cropper.openEditScreen(); }}/>
                            
                    </div>

                    <div style={actionButtonsStyle}>
                        <Butt label={saveButtonLabel} onClick={onSaveChanges}/>
                        
                        <Butt label={'Done'} onClick={onCancelChanges}/>
                        <Butt label={'Delete Image'} onClick={this.onDeleteArtwork.bind(this)}/>
                    </div>

                    <div style={confirmDeleteStyle}>
                        <p>Are you sure you want to delete this artwork?</p>
                        <Butt label={'Yes, delete it'} onClick={this.onDeleteConfirm.bind(this)}/>
                        <Butt label={'No, do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default ArtworkEditor;