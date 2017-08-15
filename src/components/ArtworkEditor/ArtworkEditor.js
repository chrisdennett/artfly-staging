import React, { Component } from "react";
import { Link } from 'react-router-dom';

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";

class ArtworkEditor extends Component {

    render() {
        const { artwork, artists, onArtistSelected, onCropDataChange, onCropImageSave } = this.props;

        let url, artistId;

        url = artwork.url;
        artistId = artwork.artistId;

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
                                        onCropDataChange={onCropDataChange}
                                        onCropImageSave={onCropImageSave}/>
                </div>}

                <hr/>
                <Link to={'/settings/'}>SAVE</Link>
                <button>CANCEL</button>
                <button>Delete Image</button>
            </div>
        )
            ;
    }
}

export default ArtworkEditor;