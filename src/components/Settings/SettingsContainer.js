// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { updateSubscription, cancelSubscription } from '../../actions/PaddleActions';
import { getUserArtistChanges } from "../../actions/UserDataActions";
// components
import Settings from './Settings';

// helper function
// TODO: Is this needed? - could be better to simply pass through all artists and filter in render
const getUserArtists = (userId, artists) => {
    const artistArray = [];
    if (userId && artists) {
        const artistIds = Object.keys(artists);
        for (let id of artistIds) {
            if (artists[id].adminId === userId) {
                artistArray.push(artists[id]);
            }
        }
    }
    return artistArray;
};

// Created an intermediate component so can trigger the data loading outside
class SettingsHolder extends Component {

    componentDidMount() {
        this.props.getUserArtistChanges(this.props.userId);
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
        const { totalArtworks, maxArtworks, maxArtworksReached, planName, userArtists, userId, subscription, localPrice, newSubscriptionStatus } = this.props;
        if (!userId) {
            return <div>Loading...</div>;
        }

        return <Settings onCancelSubscription={this.onCancelSubscription.bind(this)}
                         onUpdateSubscription={this.onUpdateSubscription.bind(this)}
                         maxArtworksReached={maxArtworksReached}
                         maxArtworks={maxArtworks}
                         planName={planName}
                         newSubscriptionStatus={newSubscriptionStatus}
                         userArtists={userArtists}
                         totalArtworks={totalArtworks}
                         price={localPrice}
                         subscription={subscription}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        maxArtworksReached: state.user.maxArtworksReached,
        maxArtworks: state.user.maxArtworks,
        planName: state.user.planName,
        totalArtworks: state.user.totalArtworks,
        localPrice: state.paddle.localPrice,
        newSubscriptionStatus: state.paddle.newSubscriptionStatus,
        userId: state.user.uid,
        userStatus: state.user.status,
        userArtists: getUserArtists(state.user.uid, state.artists),
        userArtistData: state.user.artistIds,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { updateSubscription, cancelSubscription, getUserArtistChanges }
)(SettingsHolder);

export default SettingsContainer;