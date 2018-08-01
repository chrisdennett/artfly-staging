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
import AppBar from "../../components/appBar/AppBar";
import UserGalleryCard from './UserGalleryCard';
import UserSubscriptionCard from './UserSubscriptionCard';
import {
    getMembershipDetails,
    getRecentUserArtworks,
    getSignInProvider,
    getTotalUserArtworks,
    getUserGallery,
    getUserGalleryId
} from "../../selectors/Selectors";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import RecentArtworksCard from "./RecentArtworksCard";
import Footer from "../../components/footer/Footer";

const UserProfile = ({ user, membershipPlan, latestUserArtworks, UpdateUrl, userSignInMethod, totalUserArtworks, userGallery }) => {

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

                {membershipPlan.dateJoined !== '...' &&
                <UserSubscriptionCard membershipPlan={membershipPlan}
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


            <Footer/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        membershipPlan: getMembershipDetails(state),
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        userGallery: getUserGallery(state),
        totalUserArtworks: getTotalUserArtworks(state),
        latestUserArtworks: getRecentUserArtworks(state)
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserProfile);