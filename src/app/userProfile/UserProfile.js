import React from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// styles
import './userProfile_styles.css';
// comps
import AuthDetails from "./AuthDetails";
import AppBar from "../appBar/AppBar";
import UserGalleryCard from './UserGalleryCard';
import UserSubscriptionCard from './UserSubscriptionCard';
import {
    getMembershipPlan,
    getRecentUserArtworks,
    getSignInProvider,
    getTotalUserArtworks,
    getUserGallery,
    getUserGalleryId
} from "../../selectors/Selectors";
import LoadingThing from "../loadingThing/LoadingThing";
import RecentArtworksCard from "./RecentArtworksCard";

const UserProfile = ({ user, membershipPlan, latestUserArtworks, UpdateUrl, userSignInMethod, totalUserArtworks, userGallery, account }) => {

    return (
        <div className={'userProfilePage'}>
            <AppBar title={'Profile'}/>

            {!userSignInMethod &&
            <LoadingThing/>
            }

            {userSignInMethod &&
            <div className={'userProfile'}>

                <AuthDetails
                    user={user}
                    userSignInMethod={userSignInMethod.label}
                    totalUserArtworks={totalUserArtworks}
                />

                {account &&
                <UserSubscriptionCard account={account}
                                      membershipPlan={membershipPlan}
                                      totalArtworks={totalUserArtworks}
                                      updateUrl={UpdateUrl}/>
                }

                {userGallery &&
                <UserGalleryCard userGallery={userGallery} updateUrl={UpdateUrl}/>
                }

                {latestUserArtworks &&
                <RecentArtworksCard artworks={latestUserArtworks}
                                    galleryId={userGallery.galleryId}
                                    updateUrl={UpdateUrl}/>
                }

                <div className={'userProfile--deleteSection'}>
                    <Button theme={'primary'} onClick={() => UpdateUrl(`/accountDelete`)}>
                        <ButtonIcon use="delete_forever"/>
                        Delete Account
                    </Button>
                </div>
            </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        membershipPlan: getMembershipPlan(state),
        account: state.account,
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        userGallery: getUserGallery(state),
        totalUserArtworks: getTotalUserArtworks(state),
        latestUserArtworks: getRecentUserArtworks(state)
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserProfile);