import React, { Component } from "react";

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";

class ArtworkEditor extends Component {

    constructor(props){
        super(props);

        this.state = {deleteConfirmIsShowing:false};
    }


    onDeleteArtwork() {
        this.setState({deleteConfirmIsShowing:true});
    }

    onDeleteCancel(){
        this.setState({deleteConfirmIsShowing:false});
    }

    onDeleteConfirm(){
        this.props.onConfirmDeleteArtwork()
    }

    render() {
        const {
                  url, artistId, artists, onArtistSelected, onCropDataConfirm,
                  onCropImageSave, onSaveChanges, onCancelChanges, imageUploadInfo
              } = this.props;

        let isSaving = false;
        let progress = 0;

        if (imageUploadInfo && imageUploadInfo.progress) {
            progress = imageUploadInfo.progress;
            if (progress <= 100) {
                isSaving = true;
            }
        }

        return (

            <div>
                <h1>Artwork Editor</h1>

                <ArtistSelector artists={artists}
                                selectedArtistId={artistId}
                                onArtistSelected={onArtistSelected}/>

                <hr/>

                <div style={{ width: '50%' }}>
                    <button onClick={() => { this.cropper.openEditScreen(); }}>Crop or Rotate Image</button>
                    <ImageCropAndRotate url={url}
                                        ref={instance => { this.cropper = instance; }}
                                        onCropDataConfirm={onCropDataConfirm}
                                        onCropImageSave={onCropImageSave}/>
                </div>

                <hr/>

                {isSaving &&
                <div>saving: {progress}</div>
                }

                {this.state.deleteConfirmIsShowing &&
                <div>
                    <p>Are you sure you want to delete this artwork?</p>
                    <button onClick={this.onDeleteConfirm.bind(this)}>Yes, delete it</button>
                    <button onClick={this.onDeleteCancel.bind(this)}>No, do not delete</button>
                </div>
                }

                {!this.state.deleteConfirmIsShowing &&
                <div>
                    <button onClick={onSaveChanges}>SAVE</button>
                    <button onClick={onCancelChanges}>CANCEL</button>
                    <button onClick={this.onDeleteArtwork.bind(this)}>Delete Image</button>
                </div>
                }

            </div>
        );
    }
}

export default ArtworkEditor;