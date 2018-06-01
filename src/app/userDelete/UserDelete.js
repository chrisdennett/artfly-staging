import React, { Component } from "react";
import { connect } from 'react-redux';
// material ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// actions
import { signOutUser } from "../../actions/UserAuthActions";
import { deleteUser } from "../../actions/DeleteUserActions";
// comps
import SignIn from '../signIn/SignIn';

/*
* Ask if they are really sure they want to delete everything
* Explain that they need to sign out and in again to confirm
* that they are the account owner.
* Then provide the big red delete everything button
* */

class UserDelete extends Component {

    constructor(props) {
        super(props);

        this.state = { currentStep: 1 };

        this.onConfirmStep1 = this.onConfirmStep1.bind(this);
        this.onConfirmAccountDelete = this.onConfirmAccountDelete.bind(this);
    }

    onConfirmStep1() {
        this.props.signOutUser(() => {
            this.setState({ currentStep: 2 })
        });
    }

    onConfirmAccountDelete(){
        this.props.deleteUser();
    }

    render() {
        const { currentStep } = this.state;
        const { user } = this.props;

        return (
            <div>
                <h1>Delete ArtFly account</h1>
                {currentStep === 1 &&
                <Typography>
                    <p>
                        To confirm you are the account owner we need you to sign in again.
                    </p>
                    <Button raised onClick={this.onConfirmStep1}>
                        Sign in again
                    </Button>
                </Typography>
                }

                {currentStep === 2 &&
                <div>
                    {!user.uid && <SignIn/>}

                    {user.uid &&
                    <Button raised onClick={this.onConfirmAccountDelete}>
                        Confirm full account delete
                    </Button>
                    }
                </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps, { signOutUser, deleteUser })(UserDelete);