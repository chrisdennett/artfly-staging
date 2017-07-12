import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyGalleries from './Settings';
import { fetchGallery } from '../ArtistGallery/ArtistGalleryActions';

const getUserArtistGalleries = (artistGalleryIdsObject, artists, galleries, artistsArtworkIds) => {
    const artistGalleryIds = Object.keys(artistGalleryIdsObject);
    const artistGalleriesArray = [];

    for (let id of artistGalleryIds) {
        const artist = artists[id];
        const gallery = galleries[id];
        const artworkIds = artistsArtworkIds[id];

        if (artist && gallery && artworkIds) {
            const galleryData = {};

            galleryData.artist = artist;
            galleryData.gallery = gallery;
            galleryData.id = id;
            galleryData.totalArtworks = Object.keys(artworkIds).length;

            artistGalleriesArray.push(galleryData);
        }
    }

    return artistGalleriesArray;
};

// Created an intermediate component so can trigger the data loading outside
class SettingsHolder extends Component {
    componentDidMount() {
        this.fetchAllGalleries()
    }
    fetchAllGalleries(){
        const artistGalleryIds = Object.keys(this.props.artistGalleryIds);
        for(let id of artistGalleryIds){
            this.props.fetchGallery(id);
        }
    }
    componentDidUpdate(prevProps) {
        this.fetchAllGalleries()
    }
    render() {
        const { artistGalleries } = this.props;
        return <MyGalleries artistGalleries={artistGalleries}/>;
    }
}

const mapStateToProps = (state) => {
    const artistGalleryIds = !state.user.artistGalleryIds ? {} : state.user.artistGalleryIds;
    const artistGalleries = getUserArtistGalleries(artistGalleryIds, state.artists, state.galleries, state.artistsArtworkIds);

    return {
        artistGalleryIds: artistGalleryIds,
        artistGalleries: artistGalleries
    }
};

const SettingsContainer = connect(
    mapStateToProps, { fetchGallery }
)(SettingsHolder);

export default SettingsContainer;