import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
// comps
import UserEmailOptions from "../userEmailOptions/UserEmailOptions";

const UserDetails = function ({ user, totalUserArtworks, updateUser }) {

    // get the smaller sized image if it's google
    let photoUrl = user.providerId === 'google.com' ? user.photoURL + '?sz=80' : user.photoURL;

    return (
        <div>
            <Typography use="body1">
                Apologies this screen being such a bore-fest! It's on my list to improve.
            </Typography>

            <div className={'userProfile--detailsList'}>
                {photoUrl &&
                <div className={'userProfile--detailsList--avatarHolder'}>
                    <img src={photoUrl} alt={'user avatar'}/>
                </div>
                }

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Name:</div>
                    <div className={'userProfile--detail--value'}>{user.displayName}</div>
                </div>

                <UserEmailOptions userEmail={user.email}
                                  userId={user.uid}
                                  allowEmailUpdates={user.allowEmailUpdates}
                                  updateUser={updateUser}
                />

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Artworks:</div>
                    <div className={'userProfile--detail--value'}>{totalUserArtworks}</div>
                </div>

            </div>
        </div>
    )
};

export default UserDetails;