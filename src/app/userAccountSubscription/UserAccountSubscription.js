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
import membershipPlans from '../userAccountSubscription/membershipPlans';
import { getMembershipDetails } from "../../selectors/Selectors";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
// import SubscribeButton from '../global/SubscribeButton';
import LoadingThing from "../loadingThing/LoadingThing";
import PaidMemberCard from './PaidMemberCard';
import FreeMemberCard from "./FreeMemberCard";
import MembershipOption from "./MembershipOption";

const UserAccountSubscription = ({ userId, membershipPlan, subscribeUser, UpdateUrl, cancelSubscription }) => {

    if (!membershipPlan) {
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
                {!userIsOnFreePlan &&
                <PaidMemberCard membershipDetails={membershipPlan}
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
                    <MembershipOption membershipPlan={membershipPlans['free']}/>
                    }

                    {userIsOnFreePlan &&
                    <MembershipOption membershipPlan={membershipPlans['516947']}
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