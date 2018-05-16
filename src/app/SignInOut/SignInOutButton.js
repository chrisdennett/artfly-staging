import React from 'react';
import { connect } from 'react-redux';
// utils
import history from '../global/history';
// actions
import { signOutUser } from '../../actions/UserDataActions'
// comps
import { Button } from 'rmwc/Button';

const SignInOutButton = function ({ loginStatus, signOutUser }) {
    let content = <div>loading...</div>;

    if (loginStatus === 'loggedIn') {
        content =(
            <Button raised
                    theme="secondary-bg on-secondary"
                    onClick={signOutUser}
            >
                Sign out
            </Button>
        );
    }
    else if (!loginStatus || loginStatus === 'loggedOut') {
        content =(
            <Button raised
                    theme="secondary-bg on-secondary"
                    onClick={() => history.push('/signIn')}
            >
                Sign in / Sign up
            </Button>
        );
    }

    return content
};

const mapStateToProps = (state) => {
    return {
        loginStatus: state.user.loginStatus
    }
};

const mapActionsToProps = { signOutUser };
export default connect(mapStateToProps, mapActionsToProps)(SignInOutButton)