import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './accountDelete_styles.css';
// actions
import { deleteUserArtworks, deleteUserData, deleteUserAuth } from '../../../actions/DeleteUserActions';
// comps
import { TempScreenAppBar } from "../../appBar/AppBar";
import {
    getDeleteAuthError,
    getSignInProvider,
    getTotalUserArtworks,
    getUserGalleryId,
    getUserId
} from "../../../selectors/Selectors";
import SignIn from "../userSignIn/signIn/SignIn";
// import Redirect from "../../global/Redirect";
import { goHome } from "../../../AppNavigation";
import Redirect from "../../global/Redirect";

class AccountDelete extends Component {

    render() {
        const {
                  userId,
                  user,
                  userAccount,
                  userGalleryId,
                  totalArtworks,
                  userSignInMethod,
                  deleteUserData,
                  deleteUserAuth,
                  deleteUserArtworks,
                  deleteAuthError
              } = this.props;

        const step1Completed = totalArtworks === 0;
        const step2Completed = userAccount === 'deleted' || Object.keys(userAccount).length === 0;

        const authStepEnabled = step1Completed && step2Completed;
        const showAuthDeleteButton = authStepEnabled && !deleteAuthError;
        const showSignInButton = authStepEnabled && deleteAuthError;
        const completedStyle = { textDecoration: 'line-through' };

        if(user === 'signed-out') return <Redirect to={'/'}/>;

        return (
            <div className={'accountDeletePage'}>
                <TempScreenAppBar title={'Delete account'}
                                  isFixed={true}
                                  onCloseClick={goHome}/>

                <Typography tag={'div'} use={'body1'} className={'accountDelete'}>

                    <div className={'accountDelete--step--holder'}>
                        <div className={'accountDelete--step'}>
                            <div className={'accountDelete--step--label'}
                                 style={step1Completed ? completedStyle : {}}>
                                Step 1: Delete <span
                                className={'accountDelete--totalArtworks'}>{totalArtworks}</span> artworks.
                            </div>

                            {!step1Completed &&
                            <Button raised primary
                                    className={'accountDelete--step--button'}
                                    onClick={deleteUserArtworks}>
                                confirm delete
                            </Button>
                            }

                            {step1Completed &&
                            <div className={'accountDelete--step--completed'}>
                                DONE
                            </div>
                            }
                        </div>
                        <p className={'accountDelete--step--info'}>This will permanently delete
                            all <strong>images</strong> and other <strong>artwork</strong> data.</p>
                    </div>

                    <div className={'accountDelete--step--holder'}>
                        <div className={'accountDelete--step'}>
                            <div className={'accountDelete--step--label'}
                                 style={step2Completed ? completedStyle : {}}>
                                Step 2: Delete all user data.
                            </div>

                            {!step2Completed &&
                            <Button raised primary
                                    className={'accountDelete--step--button'}
                                    onClick={() => deleteUserData(userId, userAccount.accountId, userGalleryId)}>
                                confirm delete
                            </Button>
                            }

                            {step2Completed &&
                            <div className={'accountDelete--step--completed'}>
                                DONE
                            </div>
                            }
                        </div>
                        <p className={'accountDelete--step--info'}>This will permanently
                            delete <strong>gallery</strong> data.</p>
                    </div>

                    <div className={'accountDelete--step--holder'}>
                        <div className={'accountDelete--step'}>
                            <div className={'accountDelete--step--label'}>
                                Step 3: Remove {userSignInMethod ? userSignInMethod.label : ''} sign in
                            </div>

                            {showAuthDeleteButton &&
                            <Button raised primary
                                    disabled={!authStepEnabled}
                                    className={'accountDelete--step--button'}
                                    onClick={() => deleteUserAuth()}>
                                confirm
                            </Button>
                            }


                        </div>

                        {showSignInButton &&
                        <div>
                            <p>There was an error removing your sign in data because it needs a recent sign in.  Please sign in and then try again.</p>
                            <SignIn providerId={userSignInMethod.id}
                                    successRedirect={'/deleteAccount'}/>
                        </div>
                        }


                        {!authStepEnabled &&
                        <p className={'accountDelete--step--warning'}>
                            Sign in data can only be removed after all other data has been deleted.
                        </p>
                        }

                        <p className={'accountDelete--step--info'}>
                            This will remove your sign in authorisation. <br/>
                        </p>
                    </div>
                </Typography>
            </div>
        );
    }
}

/*
{authStepEnabled && showSignInButton && userSignInMethod &&
                            <SignIn providerId={userSignInMethod.id}
                                    successRedirect={'/deleteAccount/subPath_delete_subPath'}/>
                            }
*/

const mapStateToProps = (state) => (
    {
        user: state.user,
        userId: getUserId(state),
        userAccount: state.account,
        userGalleryId: getUserGalleryId(state),
        userSignInMethod: getSignInProvider(state),
        totalArtworks: getTotalUserArtworks(state),
        deleteAuthError: getDeleteAuthError(state)
    }
);

export default connect(mapStateToProps, { deleteUserData, deleteUserAuth, deleteUserArtworks })(AccountDelete);