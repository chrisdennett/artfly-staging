import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Artwork from './Artwork/Artwork';
import GalleryEntrance from './GalleryEntrance';

class Gallery extends Component {

    render() {
        const { galleryId, artworkId } = this.props.match.params;
        /*Move this out to its own RemoteControlRedirect component*/
        const allowRemoteControl = true;

        if (allowRemoteControl && this.props.gallery.remoteControl) {

            const { galleryId, artworkId } = this.props.match.params;
            const remoteArtworkId = this.props.gallery.remoteControl.artworkId;

            if (remoteArtworkId && remoteArtworkId !== artworkId) {
                return (<Redirect to={`/gallery/${galleryId}/artwork/${remoteArtworkId}`}/>);
            }
        }

        if (artworkId) {
            if (this.props.gallery &&
                this.props.gallery.artworks &&
                this.props.gallery.artworks[artworkId]) {

                return <Artwork artwork={this.props.gallery.artworks[artworkId]}/>
            }
            else {
                return <div>Loading currentArtwork...</div>
            }
        }

        if (!this.props.gallery) {
            return (<h1>Add your first gallery</h1>)
        }

        return (
            <GalleryEntrance galleryId={galleryId} {...this.props} />
        );
    }
}

/*

 {/*<div className="responsive" key={artworkId}>
 <div className="img">
 <Link to={`/artwork/${artworkId}`}>
 <Image publicId={artworkData.url}  secure="true">
 <Transformation
 crop="fit"
 width="300"
 height="300"
 responsive_placeholder="blank"
 />
 </Image>
 </Link>
 <div className="desc">
 Artist {artistName}</div>
 <div className="desc">Created at {dateAdded}</div>
 </div>
 </div>
 */

function mapStateToProps(state) {
    return {
        gallery: state.gallery,
        remoteControls: state.remoteControls,
    }
}

export default connect(
    mapStateToProps,
    {  }
)(Gallery);