import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
// import { SimpleDialog } from 'rmwc/Dialog'
import { Elevation } from 'rmwc/Elevation';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './userProfile_styles.css';
// actions
import { updateUserAccount } from "../../actions/UserAccountActions";
// selectors
import { getSignInProvider, getTotalUserArtworks, getUserGalleryId } from "../../selectors/Selectors";
// helpers
import { goHome, goToGallery } from "../../AppNavigation";
// comps
import AppBar from "../appBar/AppBar";
import SignIn from '../signIn/SignIn';
import UserDetails from "../userDetails/UserDetails";
import LoadingThing from "../loadingThing/LoadingThing";
import AccountDelete from "./AccountDelete";

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = { showDeleteAccountConfirmDialog: false, showAccountDelete: true };
    }

    render() {
        const { user, totalUserArtworks, userGalleryId, account, userSignInMethod } = this.props;
        const { showAccountDelete } = this.state;

        const showUserProfile = user.uid && !showAccountDelete;
        const showSignIn = !showUserProfile && !showAccountDelete;
        const waitingForAccountData = user.uid && !account.status;

        if (user === 'pending' || waitingForAccountData) {
            return <LoadingThing/>
        }

        const userIsSignedIn = !!user.uid;
        let appBarTitle = 'Sign in / up';
        if (showAccountDelete) appBarTitle = 'DELETE ACCOUNT';
        else if(userIsSignedIn) appBarTitle = 'Profile';

        const showCloseButton = showSignIn || showAccountDelete;

        return (
            <div className={'userProfilePage'}>

                <AppBar title={appBarTitle}
                        onCloseClick={goHome}
                        showUserMenu={!showCloseButton}
                        showCloseButt={showCloseButton}/>

                {showSignIn &&
                <div className={'signIn-intro'}>
                    <Typography use={'body1'}>
                        <p>Sign in OR sign up for the first time.</p>
                    </Typography>
                    <SignIn/>
                </div>
                }

                {showUserProfile &&
                <Elevation z={1} className={'userProfile'}>
                    <UserDetails
                        user={user}
                        userSignInMethod={userSignInMethod}
                        totalUserArtworks={totalUserArtworks}
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
                        <Button outlined onClick={() => this.setState({ showAccountDelete: true })}>
                            <ButtonIcon use="delete_forever"/>
                            Delete Account
                        </Button>
                    </div>
                </Elevation>
                }


                {showAccountDelete &&
                <AccountDelete totalArtworks={totalUserArtworks}
                               userSignInMethod={userSignInMethod}
                               onCancelDelete={() => this.setState({ showAccountDelete: false })}/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        account: state.account,
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        totalUserArtworks: getTotalUserArtworks(state)
    }
};

const mapActionsToProps = { updateUserAccount };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);