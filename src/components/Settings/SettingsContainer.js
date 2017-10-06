import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Settings from './Settings';
import { subscribeUser, updateSubscription, cancelSubscription } from '../../actions/PaddleActions';

const getUserArtists = (artistIdsObject, artists) => {
    const artistIds = Object.keys(artistIdsObject);
    const artistArray = [];

    for (let id of artistIds) {
        const artist = artists[id];

        if (artist) {
            const artistData = {};

            artistData.artist = artist;
            artistData.id = id;
            artistData.totalArtworks = artist.totalArtworks;

            artistArray.push(artistData);
        }
    }

    return artistArray;
};

// Created an intermediate component so can trigger the data loading outside
class SettingsHolder extends Component {

    onSubscribe() {
        const { userId } = this.props;
        this.props.subscribeUser(userId, this.props.userEmail);
    }

    onCancelSubscription() {
        const cancelUrl = this.props.user.subscription.cancelUrl;
        this.props.cancelSubscription(cancelUrl);
    }

    onUpdateSubscription() {
        const updateUrl = this.props.user.subscription.updateUrl;
        this.props.updateSubscription(updateUrl);
    }

    render() {

        if (this.props.userStatus === "none") {
            return <Redirect to={'/'}/>
        }

        const { userArtists, userId, subscription, localPrice, newSubscriptionStatus } = this.props;
        if (!userId) {
            return <div>Loading...</div>;
        }

        return <Settings onSubscribe={this.onSubscribe.bind(this)}
                         onCancelSubscription={this.onCancelSubscription.bind(this)}
                         onUpdateSubscription={this.onUpdateSubscription.bind(this)}
                         newSubscriptionStatus={newSubscriptionStatus}
                         userArtists={userArtists}
                         price={localPrice}
                         subscription={subscription}/>;
    }
}

const mapStateToProps = (state) => {
    const artistIds = !state.user.artistIds ? {} : state.user.artistIds;
    const userArtists = getUserArtists(artistIds, state.artists);

    return {
        user: state.user,
        localPrice: state.paddle.localPrice,
        newSubscriptionStatus: state.paddle.newSubscriptionStatus,
        userId: state.user.uid,
        userEmail: state.user.email,
        userStatus: state.user.status,
        artistIds: artistIds,
        userArtists: userArtists,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { subscribeUser, updateSubscription, cancelSubscription }
)(SettingsHolder);

export default SettingsContainer;