import React, { Component } from "react";
import { Link } from 'react-router-dom';
import _ from 'lodash';

import ImageCropAndRotate from './ImageCropAndRotate';

class ArtworkEditor extends Component {

    render() {
        const { artwork, artists, onArtistSelected, onCropDataChange, onCropImageSave } = this.props;

        let url, artistId;

        url = artwork.url;
        artistId = artwork.artistId;

        return (

            <div>
                <h1>ArtworkEditor</h1>

                <label htmlFor="artistSelector">ARTIST: </label>
                <select value={artistId} onChange={(e) => {onArtistSelected(e.target.value)}}>
                    {
                        _.map(artists, (artistData, artistId) => {

                            return <option key={artistId}
                                           value={artistId}>{artistData.name}</option>;


                        })
                    }
                </select>

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