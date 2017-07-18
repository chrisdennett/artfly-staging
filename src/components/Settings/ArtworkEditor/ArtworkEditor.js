import React from "react";
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ArtworkEditor = function({ artwork, artist, artists, onArtistSelected }) {
        const { url, artistId } = artwork;
        const altText = `Artwork by ${artist.name}`;

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
                <div style={{ width: '50%' }}>
                    <img style={{ width: '100%' }} src={url} alt={altText}/>
                </div>
                <button>Edit Image</button>
                <hr />
                <Link to={'/settings/'}>DONE</Link>
                <button>Cancel changes</button>
                <button>Delete Image</button>
            </div>
        );
}

export default ArtworkEditor;

/*
 // called when slim has initialized
 slimInit(data, slim) {
 // slim instance reference
 console.log(slim);

 // current slim data object and slim reference
 console.log(data);
 }

 // called when upload button is pressed or automatically if push is enabled
 slimService(formdata, progress, success, failure, slim) {
 // slim instance reference
 console.log(slim);

 // form data to post to server
 console.log(formdata);

 // call these methods to handle upload state
 console.log(progress, success, failure)
 }
 */

/*<Slim service={ this.slimService.bind(this) }
 didInit={ this.slimInit.bind(this) }>
 <input type="file" accept="image/*" name="artwork"/>
 </Slim>*/