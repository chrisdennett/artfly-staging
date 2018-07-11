import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './accountSubscription_styles.css';
import { Card, CardAction, CardActions, CardActionButtons, CardActionIcons } from 'rmwc/Card';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { subscribeUser, updateSubscription, cancelSubscription } from "../../actions/PaddleActions";
// selectors
import membershipPlans from '../userAccountSubscription/membershipPlans';
import { getMembershipDetails } from "../../selectors/Selectors";
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
// import SubscribeButton from '../global/SubscribeButton';
import LoadingThing from "../loadingThing/LoadingThing";
import PaidMemberCard from './PaidMemberCard';
import FreeMemberCard from "./FreeMemberCard";

const UserAccountSubscription = ({ userId, membershipPlan, subscribeUser, UpdateUrl, cancelSubscription }) => {

    if (!membershipPlan) {
        return <LoadingThing/>
    }

    const { localPrice, price, totalUserArtworks, planName, dateJoined, maxArtworks, paidUntil } = membershipPlan;

    console.log("localPrice: ", localPrice);

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';
    const isFreePlan = planName === 'Free';

    return (
        <div className={'accountSubscription'}>
            <TempScreenAppBar title={'Membership'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/profile')}/>


            <div className={'accountSubscription--content'}>
                <PaidMemberCard membershipDetails={membershipPlan}
                                totalUserArtworks={totalUserArtworks}
                                cancelSubscription={cancelSubscription}
                                localPrice={localPrice} />

                <FreeMemberCard membershipDetails={membershipPlan}
                                totalUserArtworks={totalUserArtworks}/>

                <div className={'accountSubscription--allOptions'}>
                    <Typography use={'headline6'}>All membership options</Typography>
                </div>
            </div>

            <div className={'accountSubscription--plan'}>
                <h2>Membership: {membershipPlans['free'].planName}</h2>
                <p>Max Artworks: {membershipPlans['free'].maxArtworks}</p>
                <p>Price per month: 0</p>
            </div>

            <div className={'accountSubscription--plan'}>
                <h2>Membership: {membershipPlans['516947'].planName}</h2>
                <p>Max Artworks: {membershipPlans['516947'].maxArtworks}</p>
                <p>Price per month:{grossPrice} {vatText}</p>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        membershipPlan: getMembershipDetails(state),
        userId: state.user.uid
    }
};
export default connect(mapStateToProps, { UpdateUrl, subscribeUser, updateSubscription, cancelSubscription })(UserAccountSubscription);