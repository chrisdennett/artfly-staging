import React, { Component } from "react";
import { connect } from 'react-redux';

import Artwork from '../Artwork/Artwork';
import GalleryEntrance from './GalleryEntrance';

class Gallery extends Component {

    render() {
        const { artworkId } = this.props.match.params;

        if (artworkId) {

            if (this.props.artworks && this.props.artworks[artworkId]) {
                const currentArtwork = this.props.artworks[artworkId];

                return <Artwork currentArtwork={currentArtwork}/>
            }
            else {
                return <div>Loading currentArtwork...</div>
            }
        }

        if (!this.props.gallery) {
            return <div>Loading Gallery</div>
        }

        const gallery = this.props.gallery;
        const galleryArtists = [];

        if (this.props.artists && gallery.artistIds) {
            const galleryArtistIds = Object.keys(gallery.artistIds);
            for (let id of galleryArtistIds) {
                if (this.props.artists[id]) {
                    const artistData = this.props.artists[id];
                    if (this.props.artistsArtworkIds[id]) {
                        artistData.artworkIds = this.props.artistsArtworkIds[id];
                    }
                    galleryArtists.push(artistData);
                }
            }
        }

        return (
            <GalleryEntrance gallery={gallery} artists={galleryArtists}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const galleryId = ownProps.match.params.galleryId;

    return {
        gallery: state.galleries[galleryId],
        artists: state.artists,
        artistsArtworkIds: state.artistsArtworkIds,
        artworks: state.artworks
    }
}

export default connect(mapStateToProps, {})(Gallery);