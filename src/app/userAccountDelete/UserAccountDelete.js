import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './accountDelete_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { deleteUserArtworks, deleteUserData, deleteUserAuth } from '../../actions/DeleteUserActions';
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
import {
    getDeleteAuthError,
    getSignInProvider,
    getTotalUserArtworks,
    getUserGalleryId,
    getUserId
} from "../../selectors/Selectors";
import SignIn from "../userSignIn/signIn/SignIn";
import AccountDeleteStep from "./AccountDeleteStep";

const UserAccountDelete = ({
                               userId,
                               userAccount,
                               userGalleryId,
                               totalArtworks,
                               userSignInMethod,
                               deleteUserData,
                               deleteUserAuth,
                               deleteUserArtworks,
                               deleteAuthError,
                               UpdateUrl
                           }) => {

    const step1Completed = totalArtworks === 0;
    const step2Completed = userAccount.status === 'deleted';

    const authStepEnabled = step1Completed && step2Completed;
    const showSignInButton = authStepEnabled && deleteAuthError;

    return (
        <div className={'accountDeletePage'}>
            <TempScreenAppBar title={'Delete account'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/profile')}/>

            <Typography tag={'div'} use={'body1'} className={'accountDelete'}>

                <AccountDeleteStep completed={step1Completed}
                                   number={1}
                                   title={`Delete ${totalArtworks} artworks`}
                                   description={'This will permanently delete all images and other artwork data.'}
                                   onDeleteConfirm={deleteUserArtworks}
                />

                <AccountDeleteStep completed={step2Completed}
                                   number={2}
                                   disabled={!step1Completed}
                                   title={'Delete all user data'}
                                   description={'This will permanently delete gallery data.'}
                                   onDeleteConfirm={() => deleteUserData(userId, userAccount.accountId, userGalleryId)}
                />

                {showSignInButton &&
                <div className={'accountDelete--step'}>
                    <p>There was an error removing your sign in data because it needs a recent sign in. Please
                        sign in and then try again.</p>
                    <SignIn providerId={userSignInMethod.id}
                            successRedirect={'/deleteAccount'}/>
                </div>
                }

                <AccountDeleteStep number={3}
                                   disabled={!step2Completed}
                                   title={`Delete ${userSignInMethod ? userSignInMethod.label : ''} sign in`}
                                   description={'This will remove your sign in authorisation.'}
                                   onDeleteConfirm={deleteUserAuth}
                />
            </Typography>
        </div>
    );
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

export default connect(mapStateToProps, { UpdateUrl, deleteUserData, deleteUserAuth, deleteUserArtworks })(UserAccountDelete);