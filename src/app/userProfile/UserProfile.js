import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
// styles
import './userProfile_styles.css';
// actions
import { deleteArtworks, deleteResources } from "../../actions/DeleteArtworkActions";
import { updateUser } from "../../actions/UserDataActions";
// comps
import AppTopBar from "../AppTopBar/AppTopBar";

import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import UserDelete from "../userDelete/UserDelete";

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = { showDeleteAccountScreen: false };
    }

    render() {
        const { showDeleteAccountScreen } = this.state;
        const {
                  user,
                  userArtworks,
                  userResources,
                  updateUser
              } = this.props;


        const showSignInPage = !user.uid && !showDeleteAccountScreen;
        const showProfilePage = !!user.uid && !showDeleteAccountScreen;
        const appBarTitle = showProfilePage ? 'Profile' : 'Sign in / up';

        return (
            <div>
                <AppTopBar title={appBarTitle}
                           showUserMenu={showProfilePage}
                           showCloseButt={showSignInPage || showDeleteAccountScreen}/>

                {showDeleteAccountScreen &&
                <div className={'userProfile'}>
                    <UserDelete/>
                </div>
                }

                {showSignInPage &&
                <div className={'signIn-intro'}>
                    <p>Sign in or sign up to join the ArtFly club:</p>
                    <SignIn/>
                </div>
                }

                {showProfilePage &&
                <div className={'userProfile'}>
                    <UserDetails
                        user={user}
                        userArtworks={userArtworks}
                        updateUser={updateUser}
                    />
                    <Button outlined onClick={() => this.setState({ showDeleteAccountScreen: true })}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
                }
            </div>
        )
    }
}

const getUserArtworks = (userId, artworks) => {
    return Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

const getUserResources = (userId, resources) => {
    return Object.keys(resources)
        .filter(resourceId => resources[resourceId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = resources[key];
            return obj
        }, {});
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userArtworks: getUserArtworks(state.user.uid, state.artworks),
        userResources: getUserResources(state.user.uid, state.resources)
    }
};

const mapActionsToProps = { updateUser };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);