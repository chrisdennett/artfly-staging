import React, { Component } from "react";
import { connect } from "react-redux";
// styles
import './userHomeStyles.css';
// actions
import { cancelSubscription, updateSubscription } from "../../../actions/PaddleActions";
import { getUserArtistChanges } from "../../../actions/UserDataActions";
// components
import YourGalleries from "./assets/YourGalleries";
import AccountSettings from "./assets/AccountSettings";
import AccountWarning from "./assets/AccountWarning";
import ArtistsSettings from "./assets/ArtistsSettings";

class UserHome extends Component {

    componentDidMount() {
        if (this.props.userId) {
            this.props.getUserArtistChanges(this.props.userId);
        }
    }

    render() {
        return (
            <div>
                <AccountWarning className='userHome--accountWarning'
                                maxArtworksReached={true}/>

                <YourGalleries className='userHome--section'
                               userArtists={this.props.userArtists}/>

                <ArtistsSettings userArtists={this.props.userArtists}/>

                <AccountSettings/>
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
const mapActionsToProps = { updateSubscription, cancelSubscription, getUserArtistChanges };

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