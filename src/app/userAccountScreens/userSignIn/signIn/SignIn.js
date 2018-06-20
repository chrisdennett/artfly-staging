import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
// styles
import './signIn_styles.css';

// Configure FirebaseUI.
// https://github.com/firebase/firebaseui-web
// https://github.com/firebase/firebaseui-web-react
const SignIn = ({ providerId }) => {

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
            }
        ]
    }

    /*
    I've removed phone sign in as it costs $0.01 or $0.06 each time
    {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'GB'
    }
    */

    // signInSuccessUrl: '/',

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: signInOptions,
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // const user = authResult.user;
                // const credential = authResult.credential;
                const isNewUser = authResult.additionalUserInfo.isNewUser;
                // const providerId = authResult.additionalUserInfo.providerId;
                // const operationType = authResult.operationType;

                console.log("isNewUser: ", isNewUser);
                // Do something with the returned AuthResult.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            }
        }
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
        />
    )
};

export default SignIn;