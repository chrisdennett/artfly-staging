import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlusSquare, faAddressCard} from '@fortawesome/fontawesome-free-solid';
// styles
import './userHomeStyles.css';
// actions
import { cancelSubscription, updateSubscription } from "../../../actions/PaddleActions";
import { getUserArtistChanges } from "../../../actions/UserDataActions";
// components
import YourArtists from "./assets/YourArtists";
import AccountSettings from "./assets/AccountSettings";
import AccountWarning from "./assets/AccountWarning";
import LinkButt from "../../global/Butt/LinkButt";
import StencilHeader from "../../global/stencilHeader/StencilHeader";

class UserHome extends Component {

    componentDidMount() {
        if (this.props.userId) {
            this.props.getUserArtistChanges(this.props.userId);
        }
    }

    render() {
        const { maxArtworksReached, userArtists } = this.props;

        return (
            <div>

                <AccountWarning className='userHome--accountWarning'
                                maxArtworksReached={maxArtworksReached}/>

                <div className={'app--section app--section--dark'}>

                    <StencilHeader wording={'Your Artists'}/>
                    <LinkButt svgIcon={<FontAwesomeIcon icon={faPlusSquare}/>}
                              linkTo={`/addOrEditArtist/`}>
                        Add New Artist
                    </LinkButt>

                    <YourArtists userArtists={userArtists}/>
                </div>

                <div className={'app--section'}>
                    <StencilHeader wording={'Membership details'}/>
                    <AccountSettings/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { uid, maxArtworksReached, maxArtworks, planName, totalArtworks, status } = state.user;

    return {
        maxArtworksReached: maxArtworksReached,
        maxArtworks: maxArtworks,
        planName: planName,
        totalArtworks: totalArtworks,
        userId: uid,
        userStatus: status,
        userArtists: getUserArtists(uid, state.artists)
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