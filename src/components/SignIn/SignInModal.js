import React, { Component } from "react";
import FacebookSignInButton from "./assets/FacebookSignInButton";
import GoogleSignInButton from "./assets/GoogleSignInButton";
import { loginWithGoogle, loginWithFacebook } from '../../actions/UserActions';
import Butt from "../global/Butt";
import Modal from "../global/Modal";

class SignInModal extends Component {

    constructor(props) {
        super(props);

        this.onGoogleSelect = this.onGoogleSelect.bind(this);
        this.onFacebookSelect = this.onFacebookSelect.bind(this);
        ;
    }

    onGoogleSelect() {
        loginWithGoogle();
    }

    onFacebookSelect() {
        loginWithFacebook();
    }

    render() {
        return (
            <Modal title={'Sign in to ArtFly'}
                   isOpen={this.props.isOpen}>

                <GoogleSignInButton onClick={this.onGoogleSelect}/>
                <FacebookSignInButton onClick={this.onFacebookSelect}/>

                <Butt label={`Don't sign in`}
                      showAsLink={true}
                      onClick={this.props.closeModal}/>

            </Modal>
        )
    }
}

export default SignInModal;