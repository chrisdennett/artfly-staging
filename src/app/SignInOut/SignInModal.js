// externals
import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebookSquare';
// styles
import './signInModalStyles.css';
// components
import Butt from "../global/Butt/Butt";
import NewUserFormContainer from "../NewUser/NewUserFormContainer";

// font awesome doesn't have the correct logo so got it from google
const GoogleIcon = <svg width={20} height={20} viewBox="0 0 118 120">
    <g stroke="none" fill="none">
        <path
            d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z"
            fill="#4285F4"/>
        <path
            d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z"
            fill="#34A853"/>
        <path
            d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z"
            fill="#FBBC05"/>
        <path
            d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z"
            fill="#EA4335"/>
        <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z"/>
    </g>
</svg>;

const SignInModal = ({isOpen, isNewUser, loginStatus, signInWithGoogleClick, signInWithFacebookClick, closeModal}) => {

    if (isOpen === false) {
        return null;
    }

    console.log("loginStatus: ", loginStatus);

    return (
        <div className='signInModal'>

            {isNewUser &&
            <NewUserFormContainer/>
            }

            {loginStatus === 'pending' &&
            <div><h3>Signing in...</h3></div>
            }

            {(!loginStatus || loginStatus === 'loggedOut') &&
            <div style={{display: 'flex', flexDirection:'column'}}>
                <Butt svgIcon={<FontAwesomeIcon icon={faFacebook}/>}
                      facebook
                      alignLeft
                      onClick={signInWithFacebookClick}
                      label={'Sign in with Facebook'}/>


                <Butt svgIcon={GoogleIcon}
                      google
                      alignLeft
                      onClick={signInWithGoogleClick}
                      label={'Sign in with Google'}/>


                <Butt label={`Don't sign in`}
                      link
                      onClick={closeModal}/>
            </div>
            }

        </div>
    )
};

export default SignInModal;