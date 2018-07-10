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
// import membershipPlans from '../userAccountSubscription/membershipPlans';
import { getMembershipDetails } from "../../selectors/Selectors";
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
// import SubscribeButton from '../global/SubscribeButton';
import LoadingThing from "../loadingThing/LoadingThing";

const UserAccountSubscription = ({ userId, membershipPlan, subscribeUser, UpdateUrl, cancelSubscription }) => {

    if (!membershipPlan) {
        return <LoadingThing/>
    }

    const { localPrice, price, totalUserArtworks, planName, dateJoined, maxArtworks, paidUntil } = membershipPlan;

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';
    const isFreePlan = planName === 'Free';

    return (
        <div className={'accountSubscription'}>
            <TempScreenAppBar title={'Membership'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/profile')}/>


            <div className={'accountSubscription--content'}>
                <Card style={{ width: '100%', marginTop: 0 }}>
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography use="headline6" tag="h2">
                            Current Membership: {planName}
                        </Typography>

                        <Typography
                            use="subtitle2"
                            tag="h3"
                            theme="text-secondary-on-background"
                            style={{ marginTop: '-1rem' }}
                        >
                            Date joined: {isNaN(dateJoined) ? '...' : TO_DATE_TEXT(dateJoined)}
                        </Typography>

                        {membershipPlan.paidUntil &&
                        <div>
                            <Typography use="body1" tag="div" theme="text-secondary-on-background">
                                Monthly cost: {grossPrice} <Typography use={'caption'}
                                                                       tag={'span'}>{vatText}</Typography>
                            </Typography>
                            <Typography use="body1" tag="div" theme="text-secondary-on-background">
                                Next payment: {TO_DATE_TEXT(paidUntil)}
                            </Typography>
                        </div>
                        }

                        <Typography use="body1" tag="div" theme="text-secondary-on-background">
                            Total Artworks: {totalUserArtworks}
                        </Typography>
                        <Typography use="body1" tag="div" theme="text-secondary-on-background">
                            Max Artworks: {maxArtworks}
                        </Typography>
                    </div>

                    <CardActions>
                        {isFreePlan &&
                        <CardActionButtons style={{ paddingLeft: 5, paddingBottom: 5 }}
                                           onClick={() => subscribeUser()}>
                            <CardAction theme={'secondary-bg on-secondary'}>subscribe</CardAction>
                        </CardActionButtons>
                        }

                        <CardActionIcons>
                            {!isFreePlan &&
                            <div>
                                {/*<CardAction icon use="receipt"
                                            onClick={() => cancelSubscription(membershipPlan.cancelUrl)}/>*/}
                                <CardAction icon use="delete"
                                            onClick={() => cancelSubscription(membershipPlan.cancelUrl)}/>
                            </div>
                            }
                        </CardActionIcons>
                    </CardActions>
                </Card>

                <div className={'accountSubscription--allOptions'}>
                    <Typography use={'headline6'}>All membership options</Typography>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        membershipPlan: getMembershipDetails(state),
        userId: state.user.uid,
    }
};
export default connect(mapStateToProps, { UpdateUrl, subscribeUser, updateSubscription, cancelSubscription })(UserAccountSubscription);