import React from 'react';
import { connect } from 'react-redux';
// styles
import './userProfile_styles.css';
// actions
import { deleteArtworks, deleteResources } from "../../actions/DeleteArtworkActions";
import { updateUser } from "../../actions/UserDataActions";
import { deleteUser, deleteUserAuth } from "../../actions/DeleteUserActions";
// comps
import AppTopBar from "../AppTopBar/AppTopBar";
import DeleteUser from "../deleteUser/DeleteUser";
import UserEmailOptions from "../userEmailOptions/UserEmailOptions";

const UserProfile = function ({ userSignInMethod, deleteResources, deleteUserAuth, userArtworks, userResources, updateUser, allowEmailUpdates, deleteUser, deleteArtworks, userId, userEmail, accountType, userStatus }) {
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
                            <div className={'userProfile--detail--value'}>{Object.keys(userArtworks).length}</div>
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
                                deleteUserAuth={deleteUserAuth}
                                userSignInMethod={userSignInMethod}
                                deleteArtworks={deleteArtworks}
                                deleteResources={deleteResources}
                                userResources={userResources}
                                userArtworks={userArtworks}
                    />

                </div>
                }

            </div>
        </div>
    )
};

// NOT RIGHT - only finds one
const getUserArtworks = (userId, artworks) => {
    return Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

const getUserResources = (userId, resources) => {
    return Object.keys(resources)
        .filter(resourceId => resources[resourceId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = resources[key];
            return obj
        }, {});
};

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid,
        userSignInMethod: state.user.signedInWith,
        userEmail: state.user.email,
        accountType: state.user.planName,
        userStatus: state.user.status,
        allowEmailUpdates: state.user.allowEmailUpdates,
        userArtworks: getUserArtworks(state.user.uid, state.artworks),
        userResources: getUserResources(state.user.uid, state.resources),
    }
};

const mapActionsToProps = { deleteUser, deleteUserAuth, updateUser, deleteArtworks, deleteResources };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);