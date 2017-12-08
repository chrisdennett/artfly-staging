// externals
import React from "react";
// styles
import './signInModalStyles.css';
// components
import Butt from "../global/Butt/Butt";
import FacebookSignInButton from "./assets/FacebookSignInButton";
import GoogleSignInButton from "./assets/GoogleSignInButton";

const SignInModal = ({isOpen, loginStatus, signInWithGoogleClick, signInWithFacebookClick, closeModal}) => {

    if (isOpen === false) {
        return null;
    }

    return (
        <div className='signInModal'>

            {loginStatus === 'pending' &&
            <div><h3>Signing in...</h3></div>
            }

            {loginStatus !== 'pending' &&
            <div style={{display: 'flex', flexDirection:'column'}}>
                <GoogleSignInButton onClick={() => signInWithGoogleClick()}/>
                <FacebookSignInButton onClick={() => signInWithFacebookClick()}/>

                <Butt label={`Don't sign in`}
                      link
                      onClick={closeModal}/>
            </div>
            }

        </div>
    )
};

export default SignInModal;