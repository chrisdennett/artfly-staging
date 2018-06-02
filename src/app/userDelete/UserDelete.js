import React, { Component } from "react";
import { connect } from 'react-redux';
// material ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// actions
import { signOutUser } from "../../actions/UserAuthActions";
import { deleteUser } from "../../actions/DeleteUserActions";
// selectors
import { getTotalUserArtworks } from "../../selectors/Selectors";
// helpers
import history from '../global/history';
// comps
import AppTopBar from "../AppTopBar/AppTopBar";
import SignIn from '../signIn/SignIn';
import LoadingThing from '../loadingThing/LoadingThing';
import Redirect from "../global/Redirect";
import UserDeleteConfirm from "./UserDeleteConfirm";
import UserDeleteGoToSignIn from "./UserDeleteGoToSignIn";
import UserDeleteProviderReminder from "./UserDeleteProviderReminder";

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
        const { userDeleteError, userDeleted, step, userIsSignedIn, totalUserArtworks } = this.props;
        let currentStep = step ? step : '1';

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
                    <UserDeleteGoToSignIn />
                    }

                    {userIsSignedIn &&
                    <div>
                        <p>
                            To delete an account we need to double-check sure you're
                            the account owner by asking you to sign in again.
                        </p>
                        <Button raised onClick={this.onConfirmStep1}>
                            continue
                        </Button>
                    </div>
                    }
                </Typography>
                }

                {currentStep === '2' &&
                <UserDeleteProviderReminder userProviderId={userProviderId}/>
                }

                {currentStep === '3' &&
                <Typography use="body1">
                    {!userIsSignedIn &&
                    <UserDeleteGoToSignIn />
                    }

                    {userIsSignedIn &&
                    <UserDeleteConfirm totalUserArtworks={totalUserArtworks}
                                       onConfirmAccountDelete={this.onConfirmAccountDelete}/>
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
        totalUserArtworks: getTotalUserArtworks(state.user.uid, state.artworks),
        userIsSignedIn: state.user.uid,
        userDeleted: state.user === 'deleted',
        userProviderId: state.user.providerId,
        userDeleteError: state.errors.userDeleteError
    }
);

export default connect(mapStateToProps, { signOutUser, deleteUser })(UserDelete);