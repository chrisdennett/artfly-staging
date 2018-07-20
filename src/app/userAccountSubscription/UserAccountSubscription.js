import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './accountSubscription_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { subscribeUser, updateSubscription, cancelSubscription } from "../../actions/PaddleActions";
// selectors
import MEMBERSHIP_PLANS from '../global/MEMBERSHIP_PLANS';
import { getMembershipDetails } from "../../selectors/Selectors";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
import LoadingThing from "../loadingThing/LoadingThing";
import PaidMemberCard from './PaidMemberCard';
import FreeMemberCard from "./FreeMemberCard";
import MembershipOption from "./MembershipOption";

const UserAccountSubscription = ({ userId, membershipPlan, subscribeUser, UpdateUrl, cancelSubscription }) => {

    if (membershipPlan.totalUserArtworks === '...') {
        return <LoadingThing/>
    }

    const { localPrice, planName } = membershipPlan;
    const userIsOnFreePlan = planName === 'Free';

    return (
        <div className={'accountSubscription'}>
            <TempScreenAppBar title={'Membership'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/profile')}/>

            <div className={'accountSubscription--content'}>
                <Typography use={'overline'} tag={'div'} className={'accountSubscription--membershipOption--title'}>
                    Current membership:
                </Typography>

                {!userIsOnFreePlan &&
                <PaidMemberCard membershipDetails={membershipPlan}
                                subscribeUser={subscribeUser}
                                userId={userId}
                                freePlanMaxArtworks={MEMBERSHIP_PLANS['free'].maxArtworks}
                                cancelSubscription={cancelSubscription}/>
                }

                {userIsOnFreePlan &&
                <FreeMemberCard membershipDetails={membershipPlan}/>
                }

                <div className={'accountSubscription--membershipOptions'}>
                    <Typography use={'overline'} tag={'div'} className={'accountSubscription--membershipOption--title'}>
                        other membership options:
                    </Typography>

                    {!userIsOnFreePlan &&
                    <MembershipOption membershipPlan={MEMBERSHIP_PLANS['free']}
                                      message={"You'll automatically switch to this membership if you cancel your current subscription."}/>
                    }

                    {userIsOnFreePlan &&
                    <MembershipOption membershipPlan={MEMBERSHIP_PLANS['516947']}
                                      localPrice={localPrice}
                                      userId={userId}
                                      subscribeUser={subscribeUser}/>
                    }
                </div>
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