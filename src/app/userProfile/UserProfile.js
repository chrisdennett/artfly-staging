import React from 'react';
import { connect } from 'react-redux';
// styles
import './userProfile_styles.css';
// actions
import { deleteUser, updateUser } from "../../actions/UserDataActions";
// comps
import AppTopBar from "../AppTopBar/AppTopBar";
import DeleteUser from "../deleteUser/DeleteUser";
import UserEmailOptions from "../userEmailOptions/UserEmailOptions";

const UserProfile = function ({ userSignInMethod, updateUser, totalUserArtworks, allowEmailUpdates, deleteUser, userId, userEmail, accountType, userStatus }) {
    const noLoggedInUser = userStatus === 'none' || !userStatus;

    return (
        <div>
            <AppTopBar title={'User Profile'}/>

            <div className={'userProfile'}>
                {noLoggedInUser &&
                <div>
                    User logged out
                </div>
                }

                {userStatus === 'pending' &&
                <div>
                    Getting user status...
                </div>
                }

                {(userStatus === 'complete' || userStatus === 'new') &&
                <div>
                    <div className={'userProfile--detailsList'}>
                        <div className={'userProfile--detail'}>
                            <div className={'userProfile--detail--type'}>Account type:</div>
                            <div className={'userProfile--detail--value'}>{accountType}</div>
                        </div>
                        <div className={'userProfile--detail'}>
                            <div className={'userProfile--detail--type'}>Artworks added:</div>
                            <div className={'userProfile--detail--value'}>{totalUserArtworks}</div>
                        </div>

                        <UserEmailOptions userEmail={userEmail}
                                          userId={userId}
                                          allowEmailUpdates={allowEmailUpdates}
                                          updateUser={updateUser}
                        />

                        <div className={'userProfile--detail'}>
                            <div className={'userProfile--detail--type'}>Sign in method:</div>
                            <div className={'userProfile--detail--value'}>{userSignInMethod}</div>
                        </div>
                    </div>

                    <DeleteUser deleteUser={deleteUser}
                                userId={userId}
                                totalUserArtworks={totalUserArtworks}
                    />

                </div>
                }

            </div>
        </div>
    )
};

const mapStateToProps = (state) => (
    {
        userId: state.user.uid,
        userSignInMethod: state.user.signedInWith,
        userEmail: state.user.email,
        accountType: state.user.planName,
        userStatus: state.user.status,
        allowEmailUpdates: state.user.allowEmailUpdates,
        totalUserArtworks: Object.keys(state.artworks).length
    }
);
const mapActionsToProps = { deleteUser, updateUser };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);