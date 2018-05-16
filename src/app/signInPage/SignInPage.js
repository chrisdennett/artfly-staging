import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faFacebook from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import { Button, ButtonIcon } from 'rmwc/Button';
// utils
import history from '../global/history';
// actions
import { signInWithGoogle, signInWithFacebook } from '../../actions/UserDataActions';
// comps
import GoogleIcon from "./GoogleIcon";

const SignInPage = function ({ signInWithFacebook, signInWithGoogle }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={() => signInWithFacebook()}>
                <ButtonIcon>
                    <FontAwesomeIcon icon={faFacebook}/>
                </ButtonIcon>
                Sign in with Facebook
            </Button>

            <Button onClick={() => signInWithGoogle()}>
                <ButtonIcon>
                    <GoogleIcon/>
                </ButtonIcon>
                Sign in with Google
            </Button>

            <Button onClick={() => history.push('/')}>
                Don't sign in
            </Button>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        loginStatus: state.user.loginStatus
    }
};
const mapActionsToProps = { signInWithGoogle, signInWithFacebook };

export default connect(mapStateToProps, mapActionsToProps)(SignInPage);