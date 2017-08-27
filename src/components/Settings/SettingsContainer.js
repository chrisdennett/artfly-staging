import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Settings from './Settings';
import { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds } from '../../actions/ArtistGalleryActions';

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
        this.fetchAllGalleries();
    }

    fetchAllGalleries() {
        const artistGalleryIds = Object.keys(this.props.artistGalleryIds);
        for (let artistGalleryId of artistGalleryIds) {
            this.props.fetchGallery(artistGalleryId);
            this.props.fetchGallery(artistGalleryId);
            this.props.fetchArtist(artistGalleryId);
            this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
        }
    }

    componentDidUpdate(prevProps) {
        this.fetchAllGalleries();
    }

    render() {

        if (this.props.userStatus === "none") {
            return <Redirect to={'/'}/>
        }

        const { artistGalleries, userId, subscription, userEmail } = this.props;
        if(!userId){
            return <div>Loading...</div>;
        }

        return <Settings artistGalleries={artistGalleries} userId={userId} subscription={subscription} userEmail={userEmail}/>;
    }
}

const mapStateToProps = (state) => {
    const artistGalleryIds = !state.user.artistGalleryIds ? {} : state.user.artistGalleryIds;
    const artistGalleries = getUserArtistGalleries(artistGalleryIds, state.artists, state.galleries, state.artistsArtworkIds);

    return {
        userId: state.user.uid,
        userEmail: state.user.email,
        userStatus: state.user.status,
        artistGalleryIds: artistGalleryIds,
        artistGalleries: artistGalleries,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { fetchGallery, fetchArtist, fetchGalleryArtistArtworkIds }
)(SettingsHolder);

export default SettingsContainer;