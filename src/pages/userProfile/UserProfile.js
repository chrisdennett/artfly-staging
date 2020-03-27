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
import UserSubscriptionCard from './UserSubscriptionCard';
import {
    getMembershipDetails,
    getSignInProvider,
    getTotalUserArtworks,
} from "../../selectors/Selectors";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import Footer from "../../components/footer/Footer";

const UserProfile = ({ user, membershipPlan, UpdateUrl, userSignInMethod, totalUserArtworks }) => {

    return (
        <div className={'userProfilePage'}>
            <AppBar title={'Profile'} />

            {!userSignInMethod &&
                <LoadingThing />
            }

            {userSignInMethod &&
                <div className={'userProfile'}>
                    <div className={'userProfile--inner'}>

                        <AuthDetails
                            user={user}
                            userSignInMethod={userSignInMethod.label}
                            totalUserArtworks={totalUserArtworks}
                        />

                        {membershipPlan.dateJoined !== '...' &&
                            <UserSubscriptionCard membershipPlan={membershipPlan}
                                totalArtworks={totalUserArtworks}
                                updateUrl={UpdateUrl} />
                        }

                        <div className={'userProfile--deleteSection'}>
                            <Button theme={'primary'} onClick={() => UpdateUrl(`/accountDelete`)}>
                                <ButtonIcon icon="delete_forever" />
                                Delete Account
                        </Button>
                        </div>
                    </div>
                </div>
            }


            <Footer />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        membershipPlan: getMembershipDetails(state),
        userSignInMethod: getSignInProvider(state),
        totalUserArtworks: getTotalUserArtworks(state),
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserProfile);