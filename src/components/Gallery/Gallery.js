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

        if (!galleryId || !this.props.galleries[galleryId]) {
            return <div>Loading Gallery</div>
        }

        const gallery = this.props.galleries[galleryId];
        const galleryArtists = [];

        if (this.props.artists) {
            const galleryArtistIds = Object.keys(gallery.artistIds);
            for (let id of galleryArtistIds) {
                if (this.props.artists[id]) {
                    galleryArtists.push(this.props.artists[id]);
                }
            }
        }

        return (
            <GalleryEntrance gallery={gallery} artists={galleryArtists}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        galleries: state.galleries,
        artists: state.artists,
        artworks: state.artworks
    }
}

export default connect(mapStateToProps, {})(Gallery);