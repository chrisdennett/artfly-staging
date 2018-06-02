import React from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './userProfile_styles.css';
// actions
import { updateUser } from "../../actions/UserDataActions";
// helpers
import history from '../global/history';
// comps
import AppTopBar from "../AppTopBar/AppTopBar";
import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import LoadingThing from "../loadingThing/LoadingThing";

const UserProfile = ({ user, userArtworks, userResources, updateUser }) => {

    if (user === 'pending') {
        return <LoadingThing/>
    }

    const userIsSignedIn = !!user.uid;
    const appBarTitle = userIsSignedIn ? 'Profile' : 'Sign in / up';

    return (
        <div>
            <AppTopBar title={appBarTitle}
                       showUserMenu={userIsSignedIn}
                       showCloseButt={!userIsSignedIn}/>

            {!userIsSignedIn &&
            <div className={'signIn-intro'}>
                <Typography use={'body1'}>
                    <p>Sign in OR sign up for the first time.</p>
                </Typography>
                <SignIn/>
            </div>
            }

            {userIsSignedIn &&
            <div className={'userProfile'}>
                <UserDetails
                    user={user}
                    userArtworks={userArtworks}
                    userResources={userResources}
                    updateUser={updateUser}
                />
                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={() => history.push('/delete')}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </div>
            }
        </div>
    )
};

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