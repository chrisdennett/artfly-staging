import React from "react";
import { Link } from 'react-router-dom';
import _ from 'lodash';

import ImageCropAndRotate from './ImageCropAndRotate';


const ArtworkEditor = function({ artwork, artists, onArtistSelected }) {
        const { url, artistId } = artwork;

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

                {/*<div style={{ width: '50%' }}>
                    <img style={{ width: '100%' }} src={url} alt={altText}/>
                </div>*/}

                <ImageCropAndRotate url={url} />

                <hr />
                <Link to={'/settings/'}>DONE</Link>
                <button>Cancel changes</button>
                <button>Delete Image</button>
            </div>
        );
}

export default ArtworkEditor;