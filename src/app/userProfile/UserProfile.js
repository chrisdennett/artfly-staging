import React from 'react';
import { connect } from 'react-redux';
// material ui
import { Elevation } from 'rmwc/Elevation';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './userProfile_styles.css';
// actions
import { updateUser } from "../../actions/UserDataActions";
// selectors
import { getTotalUserArtworks, getUserGalleryId } from "../../selectors/Selectors";
// helpers
import { goHome, goToAccountDelete, goToGallery } from "../../AppNavigation";
// comps
import AppBar from "../appBar/AppBar";
import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import LoadingThing from "../loadingThing/LoadingThing";

const UserProfile = ({ user, totalUserArtworks, updateUser, userGalleryId }) => {

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
                <SignIn />
            </div>
            }

            {userIsSignedIn &&
            <Elevation z={1} className={'userProfile'}>
                <UserDetails
                    user={user}
                    totalUserArtworks={totalUserArtworks}
                    updateUser={updateUser}
                />
                <div className={'userProfile--actions'}>
                    {userGalleryId &&
                    <Button raised onClick={() => goToGallery(userGalleryId)}>
                        <ButtonIcon use="dashboard"/>
                        Your Gallery
                    </Button>
                    }
                </div>
                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={goToAccountDelete}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </Elevation>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userGalleryId: getUserGalleryId(state),
        totalUserArtworks: getTotalUserArtworks(state)
    }
};

const mapActionsToProps = { updateUser };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);