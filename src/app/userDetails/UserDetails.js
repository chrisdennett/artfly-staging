import React from 'react';

const UserDetails = function ({ user, userSignInMethod, totalUserArtworks }) {

    // get the smaller sized image if it's google
    let photoUrl;

    if(userSignInMethod === 'GOOGLE') {
        photoUrl = user.photoURL + '?sz=80';
    }
    else if(userSignInMethod === 'EMAIL / PASSWORD'){
        photoUrl = null;
    }
    else {
        photoUrl = user.photoURL;
    }

    return (
        <div>
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

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Sign in:</div>
                    <div className={'userProfile--detail--value'}>{userSignInMethod}</div>
                </div>

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Artworks:</div>
                    <div className={'userProfile--detail--value'}>{totalUserArtworks}</div>
                </div>

            </div>
        </div>
    )
};

export default UserDetails;