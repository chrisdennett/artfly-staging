import React, { Component } from "react";
import { connect } from 'react-redux';

import Artwork from './Artwork/Artwork';
import GalleryEntrance from './GalleryEntrance';

class Gallery extends Component {

    render() {
        const { galleryId, artworkId } = this.props.match.params;

        if (artworkId) {
            if (this.props.gallery &&
                this.props.artworks &&
                this.props.artworks[artworkId]) {

                return <Artwork currentArtwork={this.props.artworks[artworkId]}/>
            }
            else {
                return <div>Loading currentArtwork...</div>
            }
        }

        // TODO: Currently the gallery will be displaying all the artworks loaded in
        // Instead pass in all the artwork Ids from the gallery.

        return (
            <GalleryEntrance galleryId={galleryId} {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return {
        gallery: state.gallery,
        artworks: state.artworks
    }
}

export default connect( mapStateToProps, {  })(Gallery);