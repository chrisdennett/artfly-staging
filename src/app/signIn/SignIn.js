import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
// styles
import './signIn_styles.css';
// Configure FirebaseUI.
// https://github.com/firebase/firebaseui-web/#available-callbacks
const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'GB'
        }
    ]
};

const SignIn = function () {
    return (
        <div>
            <div className={'signIn-intro'}>
                <p>Sign in or sign up to join the ArtFly club:</p>
            </div>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    )
};

export default SignIn;