import React from "react";
import { connect } from 'react-redux';
// styles
import './accountDelete_styles.css';
// actions
import { cancelSubscription } from '../../actions/PaddleActions';
import { UpdateUrl } from "../../actions/UrlActions";
import { updateUserAccount } from '../../actions/UserAccountActions';
import { deleteUserArtworks, deleteUserData, deleteUserAuth } from '../../actions/DeleteUserActions';
// comps
import { TempScreenAppBar } from "../../components/appBar/AppBar";
import {
    getDeleteAuthError, getMembershipDetails,
    getSignInProvider,
    getTotalUserArtworks,
    getUserId
} from "../../selectors/Selectors";
import SignIn from "../userSignIn/signIn/SignIn";
import AccountDeleteStep from "./AccountDeleteStep";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import AccountDeletedMessage from './AccountDeletedMessage';

const UserAccountDelete = ({
                               userId,
                               userAccount,
                               totalArtworks,
                               userSignInMethod,
                               cancelSubscription,
                               deleteUserData,
                               deleteUserAuth,
                               deleteUserArtworks,
                               deleteAuthError,
                               UpdateUrl,
                               updateUserAccount,
                               membershipPlan
                           }) => {

    const { planName, cancelUrl, cancellationEffectiveDate } = membershipPlan;

    const paidSubscriptionCancelled = planName === 'Free' || cancellationEffectiveDate;
    const deleteArtworkdsCompleted = totalArtworks === 0;
    const userAccountSetAsDeleted = userAccount.status === 'deleted';

    const authStepEnabled = deleteArtworkdsCompleted && userAccountSetAsDeleted;
    const showSignInButton = authStepEnabled && deleteAuthError;

    return (
        <div className={'accountDeletePage'}>
            <TempScreenAppBar title={'Delete account'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/profile')}/>


            {!userAccount.status &&
            <LoadingThing/>
            }

            {userAccountSetAsDeleted &&
            <AccountDeletedMessage
                onNewAccountClick={() => updateUserAccount(userAccount.accountId, {
                    status: 'active',
                    dateJoined: Date.now()
                })}
            />
            }

            {userAccount.status &&
            <div className={'accountDelete'}>

                <AccountDeleteStep completed={paidSubscriptionCancelled}
                                   number={1}
                                   title={`Cancel paid subscription`}
                                   description={'Stop your monthly payments so you are no longer charged after deleting your account.'}
                                   actionLabel={'Cancel Subscription'}
                                   onDeleteConfirm={() => cancelSubscription(cancelUrl)}
                />

                <AccountDeleteStep completed={deleteArtworkdsCompleted}
                                   number={2}
                                   disabled={!paidSubscriptionCancelled}
                                   title={`Delete ${totalArtworks} artworks`}
                                   description={'This will permanently delete all images and other artwork data.'}
                                   onDeleteConfirm={deleteUserArtworks}
                />

                <AccountDeleteStep completed={userAccountSetAsDeleted}
                                   number={3}
                                   disabled={!deleteArtworkdsCompleted}
                                   title={'Delete all user data'}
                                   description={'This will permanently delete gallery data.'}
                                   onDeleteConfirm={() => deleteUserData(userId, userAccount.accountId)}
                />

                {showSignInButton &&
                <div className={'accountDelete--step'}>
                    <p>There was an error removing your sign in data because it needs a recent sign in. Please
                        sign in and then try again.</p>
                    <SignIn providerId={userSignInMethod.id}
                            successRedirect={'/deleteAccount'}/>
                </div>
                }

                <AccountDeleteStep number={4}
                                   disabled={!userAccountSetAsDeleted}
                                   title={`Delete ${userSignInMethod ? userSignInMethod.label : ''} sign in`}
                                   description={'This will remove your sign in authorisation.'}
                                   onDeleteConfirm={deleteUserAuth}
                />
            </div>
            }
        </div>
    );
};

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
        userSignInMethod: getSignInProvider(state),
        totalArtworks: getTotalUserArtworks(state),
        deleteAuthError: getDeleteAuthError(state),
        membershipPlan: getMembershipDetails(state)
    }
);

export default connect(mapStateToProps, { cancelSubscription, UpdateUrl, updateUserAccount, deleteUserData, deleteUserAuth, deleteUserArtworks })(UserAccountDelete);