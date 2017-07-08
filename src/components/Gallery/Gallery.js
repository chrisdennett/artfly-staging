import React, { Component } from "react";
import { connect } from 'react-redux';

import Artwork from './Artwork/Artwork';
import GalleryEntrance from './GalleryEntrance';

class Gallery extends Component {

    render() {
        const { galleryId, artworkId } = this.props.match.params;
        const galleryArtworks = this.props.galleryArtworks[galleryId];

        if (artworkId) {

            if (galleryArtworks && galleryArtworks[artworkId]) {
                const currentArtwork = galleryArtworks[artworkId];

                return <Artwork currentArtwork={currentArtwork}/>
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

function mapStateToProps(state) {
    return {
        galleries: state.galleries,
        artists: state.artists,
        artistsArtworkIds: state.artistsArtworkIds,
        galleryArtworks: state.galleryArtworks
    }
}

export default connect(mapStateToProps, {})(Gallery);