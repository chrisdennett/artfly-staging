import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Settings from './Settings';
import { fetchArtist, fetchArtistArtworkIds } from '../../actions/ArtistGalleryActions';

const getUserArtists = (artistIdsObject, artists, artistsArtworkIds) => {
    const artistIds = Object.keys(artistIdsObject);
    const artistArray = [];

    for (let id of artistIds) {
        const artist = artists[id];
        const artworkIds = artistsArtworkIds[id];

        if (artist && artworkIds) {
            const artistData = {};

            artistData.artist = artist;
            artistData.id = id;
            artistData.totalArtworks = Object.keys(artworkIds).length;

            artistArray.push(artistData);
        }
    }

    return artistArray;
};

// Created an intermediate component so can trigger the data loading outside
class SettingsHolder extends Component {

    constructor(props) {
        super(props);
        this.state = { price: '' }
    }

    componentDidMount() {
        this.fetchAllArtistData();
    }

    fetchAllArtistData() {
        const artistIds = Object.keys(this.props.artistIds);
        for (let artistGalleryId of artistIds) {
            this.props.fetchArtist(artistGalleryId);
            this.props.fetchGalleryArtistArtworkIds(artistGalleryId);
        }
    }

    componentDidUpdate(prevProps) {
        this.fetchAllArtistData();

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

        const { userArtists, userId, subscription } = this.props;
        if (!userId) {
            return <div>Loading...</div>;
        }

        return <Settings onSubscribe={this.onSubscribe.bind(this)}
                         onCancelSubscription={this.onCancelSubscription.bind(this)}
                         onUpdateSubscription={this.onUpdateSubscription.bind(this)}
                         userArtists={userArtists}
                         price={this.state.price}
                         subscription={subscription}/>;
    }
}

const mapStateToProps = (state) => {
    const artistIds = !state.user.artistIds ? {} : state.user.artistIds;
    const userArtists = getUserArtists(artistIds, state.artists, state.artistsArtworkIds);

    return {
        user: state.user,
        userId: state.user.uid,
        userEmail: state.user.email,
        userStatus: state.user.status,
        artistIds: artistIds,
        userArtists: userArtists,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { fetchArtist, fetchGalleryArtistArtworkIds: fetchArtistArtworkIds }
)(SettingsHolder);

export default SettingsContainer;