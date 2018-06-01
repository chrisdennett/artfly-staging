import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
// styles
import './userProfile_styles.css';
// actions
import { updateUser } from "../../actions/UserDataActions";
// comps
import AppTopBar from "../AppTopBar/AppTopBar";

import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import UserDelete from "../userDelete/UserDelete";
import LoadingThing from "../loadingThing/LoadingThing";

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = { showDeleteAccountScreen: false };
    }
    
    componentWillReceiveProps(newProps){
        // ensures the delete screen is removed after deletion
        if(newProps.user === 'deleted' && this.props !== 'deleted'){
            this.setState({showDeleteAccountScreen:false});
        }
    }

    render() {
        const { showDeleteAccountScreen } = this.state;
        const {
                  user,
                  userArtworks,
                  userResources,
                  updateUser
              } = this.props;

        if (user === 'pending') {
            return <LoadingThing/>
        }

        const showSignInPage = !user.uid && !showDeleteAccountScreen;
        const showProfilePage = !!user.uid && !showDeleteAccountScreen;
        let appBarTitle = 'Profile';
        if(showSignInPage) appBarTitle = 'Sign in / up';
        if(showDeleteAccountScreen) appBarTitle = 'Delete Account';

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
                        userResources={userResources}
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

// TODO: move this to a top level component
const getUserArtworks = (userId, artworks) => {
    return Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

// TODO: move this to a top level component
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