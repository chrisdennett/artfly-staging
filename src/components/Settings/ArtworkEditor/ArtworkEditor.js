import React from "react";
import { Link } from 'react-router-dom';
import _ from 'lodash';

import ImageCropAndRotate from './ImageCropAndRotate';

const ArtworkEditor = function ({ artwork, artists, onArtistSelected, isNewArtwork, newUrl }) {
    let url, artistId;

    if (isNewArtwork) {
        url = newUrl;
        artistId = "";
    }
    else {
        url = artwork.url;
        artistId = artwork.artistId;
    }


    return (
        <div>
            <h1>ArtworkEditor</h1>

            {isNewArtwork &&
            <p>It's a new artwork y'all!</p>
            }

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

            {/*<div style={{ width: '50%' }}>
                    <img style={{ width: '100%' }} src={url} alt={altText}/>
                </div>*/}

            {url && <ImageCropAndRotate url={url}/>  }

            <hr/>
            <Link to={'/settings/'}>DONE</Link>
            <button>Cancel changes</button>
            <button>Delete Image</button>
        </div>
    );
}

export default ArtworkEditor;