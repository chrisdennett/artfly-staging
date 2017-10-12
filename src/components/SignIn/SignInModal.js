// externals
import React from "react";
// components
import Butt from "../global/Butt";
import FacebookSignInButton from "./assets/FacebookSignInButton";
import GoogleSignInButton from "./assets/GoogleSignInButton";
import Modal from "../global/Modal";

const SignInModal = ({isOpen, loginStatus, signInWithGoogleClick, signInWithFacebookClick, closeModal}) => {
    return (
        <Modal title={'Sign in to ArtFly'}
               isOpen={isOpen}>

            {loginStatus === 'pending' &&
            <div>Logging in...</div>
            }

            {loginStatus !== 'pending' &&
            <div>
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