import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust,
    ToolbarTitle,
    ToolbarIcon
} from 'rmwc/Toolbar';
// styles
import './signIn_styles.css';
// helper
import history from '../global/history';

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
            <Toolbar fixed>
                <ToolbarRow>
                    <ToolbarSection alignStart>
                        <ToolbarTitle>Sign in / Sign up</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection alignEnd>
                        <ToolbarIcon use="close" onClick={() => history.push('/')}/>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
            <ToolbarFixedAdjust/>

            <div className={'signIn-intro'}>
                <p>Sign in or sign up to join the ArtFly club:</p>
            </div>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    )
};

export default SignIn;