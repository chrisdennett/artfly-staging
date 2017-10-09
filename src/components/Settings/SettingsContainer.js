// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// actions
import { updateSubscription, cancelSubscription } from '../../actions/PaddleActions';
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

        const { totalArtworks, userArtists, userId, subscription, localPrice, newSubscriptionStatus } = this.props;
        if (!userId) {
            return <div>Loading...</div>;
        }

        return <Settings onCancelSubscription={this.onCancelSubscription.bind(this)}
                         onUpdateSubscription={this.onUpdateSubscription.bind(this)}
                         newSubscriptionStatus={newSubscriptionStatus}
                         userArtists={userArtists}
                         totalArtworks={totalArtworks}
                         price={localPrice}
                         subscription={subscription}/>;
    }
}

const mapStateToProps = (state) => {
    const artistIds = !state.user.artistIds ? {} : state.user.artistIds;
    const userArtists = getUserArtists(artistIds, state.artists);

    return {
        totalArtworks: state.user.totalArtworks,
        localPrice: state.paddle.localPrice,
        newSubscriptionStatus: state.paddle.newSubscriptionStatus,
        userId: state.user.uid,
        userStatus: state.user.status,
        artistIds: artistIds,
        userArtists: userArtists,
        subscription: state.user.subscription
    }
};

const SettingsContainer = connect(
    mapStateToProps, { updateSubscription, cancelSubscription }
)(SettingsHolder);

export default SettingsContainer;