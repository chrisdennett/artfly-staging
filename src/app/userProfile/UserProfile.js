import React from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './userProfile_styles.css';
// actions
import { updateUser } from "../../actions/UserDataActions";
// selectors
import { getTotalUserArtworks } from "../../selectors/Selectors";
// helpers
import {goHome, goToAccountDelete} from "../../AppNavigation";
// comps
import AppBar from "../appBar/AppBar";
import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import LoadingThing from "../loadingThing/LoadingThing";

const UserProfile = ({ user, totalUserArtworks, updateUser }) => {

    if (user === 'pending') {
        return <LoadingThing/>
    }

    const userIsSignedIn = !!user.uid;
    const appBarTitle = userIsSignedIn ? 'Profile' : 'Sign in / up';

    return (
        <div className={'userProfilePage'}>
            <AppBar title={appBarTitle}
                    onCloseClick={goHome}
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
                    totalUserArtworks={totalUserArtworks}
                    updateUser={updateUser}
                />
                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={goToAccountDelete}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        totalUserArtworks: getTotalUserArtworks(state.user.uid, state.artworks)
    }
};

const mapActionsToProps = { updateUser };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);