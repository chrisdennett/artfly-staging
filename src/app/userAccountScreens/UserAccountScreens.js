import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { updateUserAccount } from "../../actions/UserAccountActions";
// selectors
import { getSignInProvider, getTotalUserArtworks, getUserGalleryId } from "../../selectors/Selectors";

// comps
import LoadingThing from "../loadingThing/LoadingThing";
import AccountDelete from "./accountDelete/AccountDelete";
import UserProfile from "./userProfile/UserProfile";
import UserSignIn from './userSignIn/UserSignIn';

/*
* Responsibility:
* To display the correct account screen depending on state.
* - sign in
* - user profile
* - account delete screen
* */
class UserAccountScreens extends Component {

    constructor(props) {
        super(props);

        this.state = { showAccountDelete: false };
    }

    render() {
        const { user, totalUserArtworks, userGalleryId, userSignInMethod, account } = this.props;
        const { showAccountDelete } = this.state;
        const showDeletePage = showAccountDelete || account.status === 'deleted';

        const showUserProfile = user.uid && !showDeletePage;
        const showSignIn = !showUserProfile && !showDeletePage;

        if (user === 'pending') {
            return <LoadingThing/>
        }

        return (
            <div>

                {showSignIn &&
                <UserSignIn />
                }

                {showUserProfile &&
                <UserProfile user={user}
                             onDeleteClick={() => this.setState({ showAccountDelete: true })}
                             userSignInMethod={userSignInMethod}
                             totalUserArtworks={totalUserArtworks}
                             userGalleryId={userGalleryId}
                />
                }

                {showDeletePage &&
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
export default connect(mapStateToProps, mapActionsToProps)(UserAccountScreens);