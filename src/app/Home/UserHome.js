import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { cancelSubscription, updateSubscription } from "../../actions/PaddleActions";
import { getUserArtistChanges, signOutUser } from "../../actions/UserDataActions";
// components
import HomeGalleryLinks from "./assets/HomeGalleryLinks";
import AccountSettings from "./assets/AccountSettings";
import LoginSettings from "./assets/LoginSettings";
import AccountLimitWarningMessage from "./assets/AccountLimitWarningMessage";
import ArtistsSettings from "./assets/ArtistsSettings";

class UserHome extends Component {

    componentDidMount() {
        if (this.props.userId) {
            this.props.getUserArtistChanges(this.props.userId);
        }
    }

    render() {
        const {signOutUser} = this.props;

        return (
            <div>
                <LoginSettings signOutUser={signOutUser} />
                <AccountLimitWarningMessage maxArtworksReached={true}/>
                <HomeGalleryLinks userArtists={this.props.userArtists}/>
                <ArtistsSettings userArtists={this.props.userArtists}/>
                <AccountSettings />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        maxArtworksReached: state.user.maxArtworksReached,
        maxArtworks: state.user.maxArtworks,
        planName: state.user.planName,
        totalArtworks: state.user.totalArtworks,
        userId: state.user.uid,
        userStatus: state.user.status,
        userArtists: getUserArtists(state.user.uid, state.artists)
    }
};
const mapActionsToProps = {
    updateSubscription, cancelSubscription, getUserArtistChanges, signOutUser
};

export default connect(mapStateToProps, mapActionsToProps)(UserHome);

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