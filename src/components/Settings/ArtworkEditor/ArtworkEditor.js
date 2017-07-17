import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateArtwork } from './ArtworkEditorActions';
import { fetchArtwork, fetchArtist } from '../../ArtistGallery/ArtistGalleryActions';

class ArtworkEditor extends Component {

    componentWillMount() {
        this.initData();
    }

    componentDidUpdate() {
        this.initData();
    }

    initData() {
        const { artworkId } = this.props.match.params;
        // only fetch if not already available
        this.props.fetchArtwork(artworkId);
        const {artistGalleryIds} = this.props.user;
        if(artistGalleryIds){
            for(let id of Object.keys(artistGalleryIds)){
                this.props.fetchArtist(id);
            }
        }
    }

    onDone() {
        const { artworkId } = this.props.match.params;
        const oldArtworkData = this.props.artworks[artworkId];
        const newArtworkData = {
            artistId: "-KpFB1LhNM_2vdhNx9vF"
        };

        this.props.updateArtwork(artworkId, oldArtworkData, newArtworkData);
    }

    render() {
        const userStatus = this.props.user.status;
        const { artworkId } = this.props.match.params;

        let imgUrl = "";
        let altText = "";

        if (artworkId) {
            if (this.props.artworks && this.props.artworks[artworkId]) {
                // TODO: The artist here is just the id, need to get the artists list as well.
                const { url, artist } = this.props.artworks[artworkId];
                imgUrl = url;
                altText = `Artwork by ${artist}`
            }
        }

        if (userStatus === "none" || userStatus === "new") {
            return (<Redirect to="/"/>)
        }

        return (
            <div>
                <h1>ArtworkEditor</h1>
                <p>Artwork to edit: {artworkId}</p>
                <div style={{ width: '50%' }}>
                    <img style={{ width: '100%' }} src={imgUrl} alt={altText}/>
                </div>
                <button>Edit Image</button>
                <hr />
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <button onClick={this.onDone.bind(this)}>DONE</button>
                <button>Cancel changes</button>
                <button>Delete Image</button>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    // get artwork from params
    //const artworkId = ownProps.match.params.artworkId;

    return {
        user: state.user,
        galleries: state.galleries,
        artists: state.artists,
        artworks: state.artworks
    }
}

export default connect(mapStateToProps, { updateArtwork, fetchArtwork, fetchArtist })(ArtworkEditor);

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