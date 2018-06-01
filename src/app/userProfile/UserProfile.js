import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
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
import SignIn from '../signIn/SignIn';

const UserProfile = function ({
                                  user,
                                  userArtworks,
                                  userResources,
                                  updateUser,
                                  deleteUser
                              }) {


    const userSignedIn = !!user.uid;

    // get the smaller sized image if it's google
    let photoUrl = user.providerId === 'google.com' ? user.photoURL + '?sz=80' : user.photoURL;

    const appBarTitle = userSignedIn ? 'Profile' : 'Sign in / up';

    return (
        <div>
            <AppTopBar title={appBarTitle}
                       showUserMenu={userSignedIn}
                       showCloseButt={!userSignedIn}/>

            {!userSignedIn &&
            <SignIn/>
            }

            {userSignedIn &&
            <div className={'userProfile'}>

                <div>
                    <Typography use="body1">
                        <p>
                            <strong>Welcome to your profile page.</strong>
                        </p>
                        <p>
                            Sorry this screen's such a bore-fest! It's on my list to improve. All suggestions welcome.
                        </p>
                    </Typography>
                </div>


                <div className={'userProfile--detailsList'}>
                    <div className={'userProfile--detailsList--avatarHolder'}>
                        <img src={photoUrl} alt={'user avatar'}/>
                    </div>

                    <div className={'userProfile--detail'}>
                        <div className={'userProfile--detail--type'}>Name:</div>
                        <div className={'userProfile--detail--value'}>{user.displayName}</div>
                    </div>

                    <div className={'userProfile--detail'}>
                        <div className={'userProfile--detail--type'}>Total Artworks:</div>
                        <div className={'userProfile--detail--value'}>{Object.keys(userArtworks).length}</div>
                    </div>

                    <UserEmailOptions userEmail={user.email}
                                      userId={user.uid}
                                      allowEmailUpdates={user.allowEmailUpdates}
                                      updateUser={updateUser}
                    />

                    <div className={'userProfile--detail'}>
                        <div className={'userProfile--detail--type'}>Sign in method:</div>
                        <div className={'userProfile--detail--value'}>{user.providerId}</div>
                    </div>
                </div>

                <DeleteUser deleteUser={deleteUser}
                            userResources={userResources}
                            userArtworks={userArtworks}
                />
            </div>
            }
        </div>
    )
};

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
        user: state.user,
        userArtworks: getUserArtworks(state.user.uid, state.artworks),
        userResources: getUserResources(state.user.uid, state.resources)
    }
};

const mapActionsToProps = { deleteUser, deleteUserAuth, updateUser, deleteArtworks, deleteResources };
export default connect(mapStateToProps, mapActionsToProps)(UserProfile);