// externals
import React from "react";
// components
import Butt from "../global/Butt";
import FacebookSignInButton from "./assets/FacebookSignInButton";
import GoogleSignInButton from "./assets/GoogleSignInButton";
import Modal from "../global/Modal";

const SignInModal = ({isOpen, loginStatus, signInWithGoogleClick, signInWithFacebookClick, closeModal}) => {
    return (
        <Modal isOpen={isOpen}>

            {loginStatus === 'pending' &&
            <div>Signing in...</div>
            }

            {loginStatus !== 'pending' &&
            <div style={{display: 'flex', flexDirection:'column'}}>
                <h2>Sign in to ArtFly</h2>
                <GoogleSignInButton onClick={() => signInWithGoogleClick()}/>
                <FacebookSignInButton onClick={() => signInWithFacebookClick()}/>

                <Butt label={`Don't sign in`}
                      showAsLink={true}
                      onClick={closeModal}/>
            </div>
            }

        </Modal>
    )
};

export default SignInModal;