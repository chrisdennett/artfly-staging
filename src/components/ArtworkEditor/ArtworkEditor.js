import React, { Component } from "react";

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
                  onCropImageSave, onSaveChanges, onCancelChanges, imageUploadInfo
              } = this.props;

        if (this.state.artworkDeleted) {
            return (
                <div>
                    Artwork Deleting
                </div>);
        }

        let confirmDeleteStyle = { display: 'none' };
        let actionButtonsStyle = {};
        let cropperStyle = {};
        let artistSelectorStyle = {};
        if (this.state.deleteConfirmIsShowing) {
            confirmDeleteStyle = {};
            actionButtonsStyle = { display: 'none' };
            cropperStyle = { display: 'none' };
            artistSelectorStyle = { display: 'none' };
        }

        let saveButtonLabel = "All Saved";

        if(this.props.isSaving) {
            saveButtonLabel = "Saving";
        }
        if(this.props.changesUnsaved){
            saveButtonLabel = "Save changes";
        }

        return (

            <div>
                <h1>Artwork Editor</h1>

                <ArtistSelector artists={artists}
                                style={artistSelectorStyle}
                                selectedArtistId={artistId}
                                onArtistSelected={onArtistSelected}/>

                <hr/>

                <div style={cropperStyle}>
                    <button onClick={() => { this.cropper.openEditScreen(); }}>Crop or Rotate Image</button>
                    <ImageCropAndRotate url={url}
                                        ref={instance => { this.cropper = instance; }}
                                        onCropDataConfirm={onCropDataConfirm}
                                        onCropImageSave={onCropImageSave}/>
                </div>

                <hr/>

                <div style={actionButtonsStyle}>
                    <SaveProgressButton label={saveButtonLabel} onClick={onSaveChanges}/>
                    <button onClick={onCancelChanges}>CANCEL</button>
                    <button onClick={this.onDeleteArtwork.bind(this)}>Delete Image</button>
                </div>

                <div style={confirmDeleteStyle}>
                    <p>Are you sure you want to delete this artwork?</p>
                    <button onClick={this.onDeleteConfirm.bind(this)}>Yes, delete it</button>
                    <button onClick={this.onDeleteCancel.bind(this)}>No, do not delete</button>
                </div>

            </div>
        );
    }
}

export default ArtworkEditor;