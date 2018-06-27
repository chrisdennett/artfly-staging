import React from 'react';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
// styles
import './userProfile_styles.css';
// helper
import { goToAccountSubscription, goToGallery } from "../../../AppNavigation";
// comps
import AuthDetails from "./AuthDetails";
import AppBar from "../../appBar/AppBar";

const UserProfile = ({user, userSignInMethod, totalUserArtworks, userGalleryId, onDeleteClick}) => {
    return (
        <div className={'userProfilePage'}>
            <AppBar title={'Profile'}/>

            <div className={'userProfile'}>

                <div className={'userProfile--actions'}>
                    {userGalleryId &&
                    <Button raised onClick={() => goToGallery(userGalleryId)}>
                        <ButtonIcon use="dashboard"/>
                        Gallery
                    </Button>
                    }
                </div>

                <AuthDetails
                    user={user}
                    userSignInMethod={userSignInMethod.label}
                    totalUserArtworks={totalUserArtworks}
                />

                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Artworks:</div>
                    <div className={'userProfile--detail--value'}>{totalUserArtworks}</div>
                </div>

                <div>
                    Membership: free
                    <Button raised theme={'secondary-bg'}
                    onClick={() => goToAccountSubscription()}>Upgrade</Button>
                </div>


                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={onDeleteClick}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default UserProfile;