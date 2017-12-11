// externals
import React, { Component } from 'react';
import { connect } from "react-redux";
// actions
import { updateSubscription, cancelSubscription } from '../../../../actions/PaddleActions';
// components
import Butt from "../../../global/Butt/Butt";
import SubscribeButton from '../../../global/SubscribeButton';
import ArtflyAccountTypes from "../../../global/ArtflyAccountTypes";

class AccountSettings extends Component {

    onCancelSubscription() {
        const cancelUrl = this.props.subscription.cancelUrl;
        this.props.cancelSubscription(cancelUrl);
    }

    onUpdateSubscription() {
        const updateUrl = this.props.subscription.updateUrl;
        this.props.updateSubscription(updateUrl);
    }

    render() {
        const { totalArtworks, accountType, maxArtworks, subscription, price, onCancelSubscription, onUpdateSubscription } = this.props;

        let subscriptionButtons;
        const infoStyle = {
            fontSize: 16, margin: '0 0 10px 10px', opacity: 0.9
        };
        const familyPlanId = 516947;

        if (!subscription || accountType === 'free') {
            subscriptionButtons = (
                <span>
                <SubscribeButton/>
                <p style={infoStyle}>
                    (Subscribe for {price} a month to save up
                    to {ArtflyAccountTypes[familyPlanId].maxArtworks} artworks)
                </p>
            </span>
            )
        }
        else if (subscription && subscription.status === 'deleted') {
            subscriptionButtons = (
                <span>
                    <SubscribeButton label={'Resubscribe'}/>
                    <p style={infoStyle}>
                       You've cancelled your subscription, your account will be deleted unless you resubscribe.
                        <br/>Delete date: <strong>{subscription.cancellationEffectiveDate}</strong>
                    </p>
                </span>
            )
        }
        else {
            subscriptionButtons = (
                <span>
                <Butt inline={true} size={'small'} onClick={onCancelSubscription} label={`Cancel subscription`}/>
                <Butt inline={true} size={'small'} onClick={onUpdateSubscription} label={`Update subscription`}/>
                <p style={infoStyle}>
                   You're currently signed up for a monthly {accountType} subscription.
                    <br/>Next payment for {price}
                    will be taken on <strong>{subscription.cancellationEffectiveDate}</strong>.
                </p>
            </span>
            )
        }

        return (
            <div className='userHome--section'>
                <h2 className='home--subHeading'>Membership details</h2>
                <ul>
                    <li>Membership type: {accountType} {subscriptionButtons}</li>
                    <li>Total artworks added: {totalArtworks}
                        <p style={infoStyle}>
                            (Maximum for {accountType} membership is {maxArtworks})
                        </p>
                    </li>
                    <li>Remaining spaces available: {maxArtworks - totalArtworks}</li>
                </ul>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        maxArtworks: state.user.maxArtworks,
        totalArtworks: state.user.totalArtworks,
        subscription: state.user.subscription
    }
};
const mapActionsToProps = { updateSubscription, cancelSubscription };

export default connect(mapStateToProps, mapActionsToProps)(AccountSettings);