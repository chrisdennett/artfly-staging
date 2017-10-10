// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// actions
import { updateSubscription, cancelSubscription } from '../../actions/PaddleActions';
import { fetchArtist, fetchArtistArtworkIds } from "../../actions/ArtistGalleryActions";
// components
import Settings from './Settings';

// helper function
const getUserArtists = (artistIdsObject, artists) => {
    const artistIds = Object.keys(artistIdsObject);
    const artistArray = [];

    for (let id of artistIds) {
        if (artists[id]) {
            artistArray.push(artists[id]);
        }
    }
    return artistArray;
};

// Created an intermediate component so can trigger the data loading outside
class SettingsHolder extends Component {

    componentDidMount() {
        const userArtistIds = Object.keys(this.props.userArtistData);

        for (let id of userArtistIds) {
            this.props.fetchArtist(id);
            this.props.fetchArtistArtworkIds(id);
        }
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
        /* if (this.props.userStatus === "none") {
             return <Redirect to={'/'}/>
         }*/

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
        userArtists: getUserArtists(state.user.artistIds, state.artists),
        userArtistData: state.user.artistIds,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { updateSubscription, cancelSubscription, fetchArtist, fetchArtistArtworkIds }
)(SettingsHolder);

export default SettingsContainer;