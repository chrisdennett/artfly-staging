import React from 'react';

const AuthDetails = function ({ user, userSignInMethod }) {
    return (
        <div>
            <div className={'userProfile--detailsList'}>
                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Name:</div>
                    <div className={'userProfile--detail--value'}>{user.displayName}</div>
                </div>

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Sign in:</div>
                    <div className={'userProfile--detail--value'}>with {userSignInMethod}</div>
                </div>

            </div>
        </div>
    )
};

export default AuthDetails;