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

    constructor(props) {
        super(props);
        this.state = { price: '' }
    }

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

        /*if (this.state.price === '') {
            const Paddle = window.Paddle;
            Paddle.Product.Prices(516947, function (prices) {
                const localPrice = prices.price.gross;
                this.setState({price: localPrice})
            }.bind(this));
        }*/
    }

    onSubscribe() {
        const Paddle = window.Paddle;
        const { userId } = this.props;
        const productId = "516947";

        let checkoutSetupData = {};
        checkoutSetupData.product = productId;
        checkoutSetupData.passthrough = userId;

        if (this.props.user.email) {
            checkoutSetupData.email = this.props.user.email;
        }

        Paddle.Checkout.open(checkoutSetupData);
    }

    onCancelSubscription() {
        const Paddle = window.Paddle;
        const cancelUrl = this.props.user.subscription.cancelUrl;
        Paddle.Checkout.open({
            override: cancelUrl
        });
    }

    onUpdateSubscription() {
        const Paddle = window.Paddle;
        const updateUrl = this.props.user.subscription.updateUrl;
        Paddle.Checkout.open({
            override: updateUrl
        });
    }

    render() {

        if (this.props.userStatus === "none") {
            return <Redirect to={'/'}/>
        }

        const { artistGalleries, userId, subscription } = this.props;
        if (!userId) {
            return <div>Loading...</div>;
        }

        return <Settings onSubscribe={this.onSubscribe.bind(this)}
                         onCancelSubscription={this.onCancelSubscription.bind(this)}
                         onUpdateSubscription={this.onUpdateSubscription.bind(this)}
                         artistGalleries={artistGalleries}
                         price={this.state.price}
                         subscription={subscription}/>;
    }
}

const mapStateToProps = (state) => {
    const artistGalleryIds = !state.user.artistGalleryIds ? {} : state.user.artistGalleryIds;
    const artistGalleries = getUserArtistGalleries(artistGalleryIds, state.artists, state.galleries, state.artistsArtworkIds);

    return {
        user: state.user,
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