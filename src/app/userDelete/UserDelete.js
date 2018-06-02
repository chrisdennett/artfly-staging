import React, { Component } from "react";
import { connect } from 'react-redux';
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
    
    componentWillMount(){
        const {userProviderId} = this.props;
        this.setState({userProviderId});
    }

    onConfirmStep1() {
        // set delete confirmed so can redirect people
        // arriving on step 2 without confirming
        // this.setState({ deleteConfirmed: true }, () => {
        this.props.signOutUser(() => {
            history.push('/delete/2')
        });
        // })
    }

    onConfirmAccountDelete() {
        history.push('/delete/4');
        this.props.deleteUser();
    }

    render() {
        const { userProviderId } = this.state;
        const { userIsSignedIn, userDeleteError, step } = this.props;
        let currentStep = step ? step : '1';

        console.log("userProviderId: ", userProviderId);

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
                        <strong>Step 1: Begin account delete</strong>
                    </p>
                    <p>
                       To delete an account we like to double-check sure you're the account owner by asking you to sign in again.
                    </p>
                    <Button raised onClick={this.onConfirmStep1}>
                        continue
                    </Button>
                </Typography>
                }
                
                {currentStep === '2' &&
                <Typography use="body1">
                    <p>
                        <strong>Step 2: Sign in to confirm identity</strong>
                    </p>
                    
                    {!userIsSignedIn &&
                    <SignIn successRedirect={'/delete/3'}
                            providerId={userProviderId}/>
                    }
                </Typography>
                }
                
                {currentStep === '3' &&
                <div>
                    <p>
                        <strong>Step 1: Confirm delete</strong>
                    </p>

                    <Button raised onClick={this.onConfirmAccountDelete}>
                        Confirm full account delete
                    </Button>
                </div>
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
        userProviderId: state.user.providerId,
        userIsSignedIn: state.user.uid,
        userDeleteError: state.errors.userDeleteError
    }
);

export default connect(mapStateToProps, { signOutUser, deleteUser })(UserDelete);