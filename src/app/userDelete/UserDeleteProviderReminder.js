import React from 'react';
import { Typography } from 'rmwc/Typography';
import firebase from 'firebase/app';
import SignIn from "../signIn/SignIn";

const UserDeleteProviderReminder = function ({userProviderId}) {

    let logInMessage = '';
    if (userProviderId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
        logInMessage = 'You previously signed in with Google.'
    }
    if (userProviderId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
        logInMessage = 'You previously signed in with Facebook.'
    }
    if (userProviderId === firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
        logInMessage = 'You previously signed in with Twitter.'
    }
    if (userProviderId === firebase.auth.EmailAuthProvider.PROVIDER_ID) {
        logInMessage = 'You previously signed in with Email.'
    }
    if (userProviderId === firebase.auth.PhoneAuthProvider.PROVIDER_ID) {
        logInMessage = 'You previously signed in by phone.'
    }

    return (
        <Typography use="body1">
            <p>
                <strong>Step 2: Re-sign in</strong>
            </p>

            <p>
                {logInMessage}
            </p>

            <SignIn successRedirect={'/delete/3'}/>

        </Typography>
    )
};

export default UserDeleteProviderReminder;