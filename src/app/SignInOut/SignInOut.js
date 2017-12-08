// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { signInWithGoogle, signInWithFacebook, signOutUser } from '../../actions/UserDataActions';
// components
import SignInModal from "./SignInModal";
import Butt from "../global/Butt/Butt";
import IconSignOut from "../global/icon/icons/IconSignOut";
import IconSignIn from "../global/icon/icons/IconSignIn";

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

        const { signOutUser, loginStatus } = this.props;
        const userLoggedIn = loginStatus === 'loggedIn';

        return (
            <span>
                <SignInModal closeModal={this.closeModal}
                             signInWithGoogleClick={this.signInWithGoogleClick}
                             signInWithFacebookClick={this.signInWithFacebookClick}
                             loginStatus={this.props.loginStatus}
                             isOpen={this.state.isModalOpen}/>

                {userLoggedIn &&
                <Butt className='userHome--signOutButt'
                      svgIcon={<IconSignOut width={25} height={25} fill={'rgba(0, 0, 0, 0.8)'}/>}
                      label={'Sign out'}
                      onClick={signOutUser}/>
                }

                {!userLoggedIn &&
                <Butt className='userHome--signOutButt'
                      svgIcon={<IconSignIn width={25} height={25} fill={'rgba(0, 0, 0, 0.8)'}/>}
                      label={'Sign in (beta testers only for now)'}
                      onClick={this.openModal}/>
                }
            </span>
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
