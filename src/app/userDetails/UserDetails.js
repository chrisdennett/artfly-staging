import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
// comps
import UserEmailOptions from "../userEmailOptions/UserEmailOptions";

const UserDetails = function ({user, userArtworks, updateUser}) {

    // get the smaller sized image if it's google
    let photoUrl = user.providerId === 'google.com' ? user.photoURL + '?sz=80' : user.photoURL;

    return (
        <div>
            <div>
                <Typography use="body1">
                    <p>
                        <strong>Welcome to your profile page.</strong>
                    </p>
                    <p>
                        Apologies this screen being such a bore-fest! It's on my list to improve.
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
        </div>
    )
};

export default UserDetails;