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
import { getSignInProvider, getTotalUserArtworks, getUserGalleryId } from "../../selectors/Selectors";
import LoadingThing from "../loadingThing/LoadingThing";

const UserProfile = ({ user, UpdateUrl, userSignInMethod, totalUserArtworks, userGalleryId }) => {


    return (
        <div className={'userProfilePage'}>
            <AppBar title={'Profile'}/>

            {!userSignInMethod &&
            <LoadingThing/>
            }

            {userSignInMethod &&
            <div className={'userProfile'}>

                <div className={'userProfile--actions'}>
                    {userGalleryId &&
                    <Button raised onClick={() => UpdateUrl(`/gallery/galleryId_${userGalleryId}_galleryId`)}>
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
                            onClick={() => UpdateUrl(`/accountSubscription`)}>Upgrade</Button>
                </div>


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
        userSignInMethod: getSignInProvider(state),
        userGalleryId: getUserGalleryId(state),
        totalUserArtworks: getTotalUserArtworks(state)
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserProfile);