import React from 'react';
// material ui
import { Elevation } from 'rmwc/Elevation';
import { Button, ButtonIcon } from 'rmwc/Button';
// styles
import './userProfile_styles.css';
// helper
import { goToAccountSubscription, goToGallery } from "../../../AppNavigation";
// comps
import UserDetails from "./UserDetails";
import AppBar from "../../appBar/AppBar";

const UserProfile = ({user, userSignInMethod, totalUserArtworks, userGalleryId, onDeleteClick}) => {
    return (
        <div className={'userProfilePage'}>
            <AppBar title={'Profile'}/>

            <Elevation z={1} className={'userProfile'}>
                <UserDetails
                    user={user}
                    userSignInMethod={userSignInMethod.label}
                    totalUserArtworks={totalUserArtworks}
                />

                <div>
                    Membership: free
                    <Button raised theme={'secondary-bg'}
                    onClick={() => goToAccountSubscription()}>Subscription options</Button>
                </div>

                <div className={'userProfile--actions'}>
                    {userGalleryId &&
                    <Button raised onClick={() => goToGallery(userGalleryId)}>
                        <ButtonIcon use="dashboard"/>
                        Your Gallery
                    </Button>
                    }
                </div>
                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={onDeleteClick}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </Elevation>
        </div>
    )
};

export default UserProfile;