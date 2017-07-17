import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

class ArtworkEditor extends Component {

    onDone() {
        const { artworkId } = this.props;
        const oldArtworkData = this.props.artwork; // ERROR HERE
        const newArtworkData = {
            artistId: "-KpFB1LhNM_2vdhNx9vF"
        };

        this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData);
    }

    onArtistSelectChange(event){
        console.log("value: ", event.target.value);
    }

    render() {
        const { artwork, userStatus, artist } = this.props;

        if (userStatus === "none" || userStatus === "new") {
            return (<Redirect to="/"/>)
        }

        let imgUrl = "";
        let altText = "";
        let artistId = null;

        if (artwork && artist) {
            const { url } = artwork;
            imgUrl = url;
            altText = `Artwork by ${artist.name}`;
            artistId = artwork.artistId;
        }
        else{
            return <div>Loading something...</div>
        }


        return (
            <div>
                <h1>ArtworkEditor</h1>
                <p>Artwork to edit: {this.props.artworkId}</p>
                <div style={{ width: '50%' }}>
                    <img style={{ width: '100%' }} src={imgUrl} alt={altText}/>
                </div>
                <button>Edit Image</button>
                <hr />
                <select value={artistId} onChange={this.onArtistSelectChange.bind(this)}>
                    {
                        _.map(this.props.artists, (artistData, artistId) => {

                            return <option key={artistId}
                                           value={artistId}>{artistData.name}</option>;


                        })
                    }
                </select>
                <button onClick={this.onDone.bind(this)}>DONE</button>
                <button>Cancel changes</button>
                <button>Delete Image</button>
            </div>
        );
    }
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