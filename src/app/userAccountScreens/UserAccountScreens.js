import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { updateUserAccount } from "../../actions/UserAccountActions";
// selectors
import { getSignInProvider, getTotalUserArtworks, getUserGalleryId } from "../../selectors/Selectors";

// comps
import LoadingThing from "../loadingThing/LoadingThing";
import UserProfile from "./userProfile/UserProfile";
import UserSignIn from './userSignIn/UserSignIn';
import { goToAccountDelete } from "../../AppNavigation";

/*
* Responsibility:
* To display the correct account screen depending on state.
* - sign in
* - user profile
* */
class UserAccountScreens extends Component {

    render() {
        const { user, totalUserArtworks, userGalleryId, userSignInMethod } = this.props;

        const showUserProfile = user.uid;
        const showSignIn = !showUserProfile;

        if (user === 'pending') {
            return <LoadingThing/>
        }

        return (
            <div>
                {showSignIn &&
                <UserSignIn/>
                }

                {showUserProfile &&
                <UserProfile user={user}
                             onDeleteClick={goToAccountDelete}
                             userSignInMethod={userSignInMethod}
                             totalUserArtworks={totalUserArtworks}
                             userGalleryId={userGalleryId}
                />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        totalUserArtworks: getTotalUserArtworks(state)
    }
};

const mapActionsToProps = { updateUserAccount };
export default connect(mapStateToProps, mapActionsToProps)(UserAccountScreens);