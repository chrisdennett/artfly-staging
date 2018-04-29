// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'rmwc/Button';
import faSignOutAlt from '@fortawesome/fontawesome-pro-solid/faSignOutAlt';
import faSignInAlt from '@fortawesome/fontawesome-pro-solid/faSignInAlt';
// actions
import { signInWithGoogle, signInWithFacebook, signOutUser } from '../../actions/UserDataActions';
// components
import SignInModal from "./SignInModal";

class SignInOut extends Component {
    constructor() {
        super();

        this.state = { isModalOpen: false };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.signInWithGoogleClick = this.signInWithGoogleClick.bind(this);
        this.signInWithFacebookClick = this.signInWithFacebookClick.bind(this);
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    signInWithGoogleClick() {
        this.props.signInWithGoogle();
    }

    signInWithFacebookClick() {
        this.props.signInWithFacebook();
    }

    render() {

        const { signOutUser, loginStatus, user } = this.props;
        const userLoggedIn = loginStatus === 'loggedIn';
        const isNewUser = userLoggedIn && user.status === 'new';
        const isModalOpen = this.state.isModalOpen || isNewUser;

        return (
            <div>
                <SignInModal closeModal={this.closeModal}
                             signInWithGoogleClick={this.signInWithGoogleClick}
                             signInWithFacebookClick={this.signInWithFacebookClick}
                             isNewUser={isNewUser}
                             loginStatus={loginStatus}
                             isOpen={isModalOpen}/>

                {userLoggedIn &&
                <Button onClick={signOutUser} style={{lineHeight:'1.6rem'}}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize:'1.2rem', marginRight: 5}}/> Sign Out
                </Button>
                }

                {!userLoggedIn &&
                <Button onClick={this.openModal} style={{lineHeight:'1.6rem'}}>
                    <FontAwesomeIcon icon={faSignInAlt} style={{fontSize:'1.2rem', marginRight: 5}}/> Sign In
                </Button>
                }
            </div>
        )
    }
}

/*<IconButt icon={'signIn'} label={'sign in'} fill={'hsl(250,98%,80%)'} onClick={this.openModal}/>*/

const mapStateToProps = (state) => {
    return {
        loginStatus: state.user.loginStatus
    }
};
const mapActionsToProps = { signInWithGoogle, signInWithFacebook, signOutUser };

export default connect(mapStateToProps, mapActionsToProps)(SignInOut);
