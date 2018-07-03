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
import { getSignInProvider, getTotalUserArtworks, getUserGallery, getUserGalleryId } from "../../selectors/Selectors";
import LoadingThing from "../loadingThing/LoadingThing";

const UserProfile = ({ user, UpdateUrl, userSignInMethod, totalUserArtworks, userGallery, account }) => {

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
                                      totalArtworks={totalUserArtworks}
                                      updateUrl={UpdateUrl}  />
                }

                {userGallery &&
                <UserGalleryCard userGallery={userGallery} updateUrl={UpdateUrl} />
                }

                <div className={'userProfile--deleteSection'}>
                    <Button outlined onClick={() => UpdateUrl(`/accountDelete`)}>
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
        account: state.account,
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        userGallery: getUserGallery(state),
        totalUserArtworks: getTotalUserArtworks(state)
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserProfile);