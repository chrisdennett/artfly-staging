import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistGallery from '../components/Gallery/ArtistGallery';
import { fetchGallery } from '../components/Gallery/GalleryActions';

const defaultGallery = { name: "", status: "loading", artistId: null };
const defaultGalleryArtist = { name: "", status: "loading", artworkIds: [] };

const getCurrentGallery = (currentGalleryId, galleries) => {
    let gallery = defaultGallery;
    let artistId = null;
    if (galleries[currentGalleryId]) {
        gallery = galleries[currentGalleryId];
        artistId = Object.keys(gallery.artistIds)[0];
    }

    gallery.artistId = artistId;
    return gallery;
};

const getGalleryArtist = (artistId, artists, artistsArtworkIds) => {
    let galleryArtist = defaultGalleryArtist;
    if (artists[artistId]) {
        galleryArtist = artists[artistId];

        if (artistsArtworkIds[artistId]) {
            galleryArtist.artworkIds = artistsArtworkIds[artistId];
        }
    }
    return galleryArtist;
};

const getArtistArtworks = (galleryArtworkIds, artworks) => {
    let galleryArtworks = [];
    if (galleryArtworkIds) {
        for (let id of Object.keys(galleryArtworkIds)) {
            if (artworks[id]) {
                galleryArtworks.push(artworks[id]);
            }
        }
    }

    return galleryArtworks;
};

class ArtistGalleryHolder extends Component {
    componentDidMount() {
        this.props.fetchGallery(this.props.galleryId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.galleryId !== prevProps.galleryId) {
            this.props.fetchGallery(this.props.galleryId);
        }
    }

    render() {
        const {gallery, artist, artworks} = this.props;
        return <ArtistGallery gallery={gallery} artist={artist} artworks={artworks} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps.match.params;
    const gallery = getCurrentGallery(galleryId, state.galleries);
    const artist = getGalleryArtist(gallery.artistId, state.artists, state.artistsArtworkIds);
    const artworks = getArtistArtworks(artist.artworkIds, state.artworks);

    return {
        galleryId: galleryId,
        gallery: gallery,
        artist: artist,
        artworks: artworks
    }
};

const CurrentArtistGallery = connect(
    mapStateToProps, { fetchGallery }
)(ArtistGalleryHolder);

export default CurrentArtistGallery;

