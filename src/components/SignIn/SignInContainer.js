// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { signInWithGoogle, signInWithFacebook } from '../../actions/UserDataActions';
// components
import SignInButton from "./SignInButton";
import SignInModal from "./SignInModal";

class SignInContainer extends Component {
    constructor(props) {
        super(props);
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
        this.props.loginWithGoogle();
    }

    signInWithFacebookClick() {
        this.props.loginWithFacebook();
    }

    render() {
        return (
            <div>
                <SignInModal closeModal={this.closeModal}
                             signInWithGoogleClick={this.signInWithGoogleClick}
                             signInWithFacebookClick={this.signInWithFacebookClick}
                             loginStatus={this.props.loginStatus}
                             isOpen={this.state.isModalOpen}/>

                <SignInButton onClick={this.openModal}/>
            </div>
        )
    }
};

// export default SignInContainer;

const mapStateToProps = (state) => {
    return {
        loginStatus: state.user.loginStatus
    }
};

export default connect(
    mapStateToProps, { loginWithGoogle: signInWithGoogle, loginWithFacebook: signInWithFacebook }
)(SignInContainer);
