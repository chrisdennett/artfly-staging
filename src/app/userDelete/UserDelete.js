import React, { Component } from "react";
import { connect } from 'react-redux';
import firebase from 'firebase/app';
// material ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// actions
import { signOutUser } from "../../actions/UserAuthActions";
import { deleteUser } from "../../actions/DeleteUserActions";
// helpers
import history from '../global/history';
// comps
import AppTopBar from "../AppTopBar/AppTopBar";
import SignIn from '../signIn/SignIn';
import LoadingThing from '../loadingThing/LoadingThing';
import Redirect from "../global/Redirect";

/*
* Ask if they are really sure they want to delete everything
* Explain that they need to sign out and in again to confirm
* that they are the account owner.
* Then provide the big red delete everything button
* */

class UserDelete extends Component {

    constructor(props) {
        super(props);

        this.state = { userProviderId: null };

        this.onConfirmStep1 = this.onConfirmStep1.bind(this);
        this.onConfirmAccountDelete = this.onConfirmAccountDelete.bind(this);
    }

    componentWillMount() {
        const { userProviderId } = this.props;
        this.setState({ userProviderId });
    }

    onConfirmStep1() {
        this.props.signOutUser(() => {
            history.push('/delete/2')
        });
    }

    onConfirmAccountDelete() {
        history.push('/delete/4');
        this.props.deleteUser();
    }

    render() {
        const { userProviderId } = this.state;
        const { userDeleteError, userDeleted, step, userIsSignedIn } = this.props;
        let currentStep = step ? step : '1';

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

        if (userDeleted) {
            return <Redirect to={'/'}/>
        }

        return (
            <div className={'userProfile'}>
                <AppTopBar title={'Delete Account'}
                           showUserMenu={false}
                           showCloseButt={true}/>

                {userDeleteError &&
                <Typography use="body1">
                    <p>
                        Eek, there's been an error deleting your account.
                    </p>
                    <Button raised onClick={() => history.push('/delete')}>
                        Try again
                    </Button>
                </Typography>
                }

                {currentStep === '1' &&
                <Typography use="body1">
                    <p>
                        <strong>Delete account: step 1</strong>
                    </p>
                    {!userIsSignedIn &&
                    <div>
                        <p>
                            You need to be signed in to delete an account.  If you want to delete your account:
                        </p>

                        <Button raised onClick={() => history.push('/delete/2')}>
                            Sign in here first
                        </Button>
                    </div>
                    }

                    {userIsSignedIn &&
                    <div>
                        <p>
                            To delete an account we like to double-check sure you're the account owner by asking you to
                            sign
                            in again.
                        </p>
                        <Button raised onClick={this.onConfirmStep1}>
                            continue
                        </Button>
                    </div>
                    }
                </Typography>
                }

                {currentStep === '2' &&
                <Typography use="body1">
                    <p>
                        <strong>Step 2: Sign in to confirm identity</strong>
                    </p>

                    <p>
                        {logInMessage}
                    </p>

                    <SignIn successRedirect={'/delete/3'}/>

                </Typography>
                }

                {currentStep === '3' &&
                <Typography use="body1">
                    {!userIsSignedIn &&
                        <div>
                            <p>
                                You need to be signed in to delete an account.  If you want to delete your account:
                            </p>

                            <Button raised onClick={() => history.push('/delete/2')}>
                                Sign in here first
                            </Button>
                        </div>
                    }

                    {userIsSignedIn &&
                    <div>
                        <p>
                            <strong>Step 3: Confirm delete</strong>
                        </p>

                        <Button raised onClick={this.onConfirmAccountDelete}>
                            Confirm full account delete
                        </Button>
                    </div>
                    }
                </Typography>
                }

                {currentStep === '4' &&
                <div>
                    <LoadingThing label={'Deleting account data'}/>
                </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        userIsSignedIn: state.user.uid,
        userDeleted: state.user === 'deleted',
        userProviderId: state.user.providerId,
        userDeleteError: state.errors.userDeleteError
    }
);

export default connect(mapStateToProps, { signOutUser, deleteUser })(UserDelete);