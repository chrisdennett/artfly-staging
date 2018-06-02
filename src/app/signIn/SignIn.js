import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
// styles
import './signIn_styles.css';

// Configure FirebaseUI.
// https://github.com/firebase/firebaseui-web
// https://github.com/firebase/firebaseui-web-react
const SignIn = ({ successRedirect = '/', providerId }) => {

    let signInOptions;
    if (providerId) {
        signInOptions = [providerId];
    }
    else {
        signInOptions = [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            },
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                defaultCountry: 'GB'
            }
        ]
    }

    const uiConfig = {
        signInSuccessUrl: successRedirect,
        signInFlow: 'popup',
        signInOptions: signInOptions
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    )
};

export default SignIn;