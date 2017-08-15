import React, { Component } from "react";

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";

class ArtworkEditor extends Component {

    render() {
        const { url, artistId, artists, onArtistSelected, onCropDataConfirm, onCropImageSave, onSaveChanges } = this.props;

        return (

            <div>
                <h1>ArtworkEditor</h1>

                <ArtistSelector artists={artists}
                                selectedArtistId={artistId}
                                onArtistSelected={onArtistSelected}/>

                <hr/>

                {url &&
                <div style={{ width: '50%' }}>
                    <button onClick={() => { this.cropper.openEditScreen(); }}>Crop or Rotate picture</button>
                    <ImageCropAndRotate url={url}
                                        ref={instance => { this.cropper = instance; }}
                                        onCropDataConfirm={onCropDataConfirm}
                                        onCropImageSave={onCropImageSave}/>
                </div>}

                <hr/>
                <button onClick={onSaveChanges}>SAVE</button>
                <button>CANCEL</button>
                <button>Delete Image</button>
            </div>
        );
    }
}

export default ArtworkEditor;