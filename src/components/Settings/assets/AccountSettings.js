// externals
import React from 'react';
// components
import Butt from "../../global/Butt";
import SubscribeButton from '../../global/SubscribeButton';

const AccountSettings = function (props) {
    const { artflyAccountTypes, totalArtworks, accountType, maxArtworks, subscription, price, onCancelSubscription, onUpdateSubscription } = props;

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
                    (Subscribe for {price} a month to save up to {artflyAccountTypes[familyPlanId].maxArtworks}
                    artworks)
                </p>
            </span>
        )
    }
    else if(subscription && subscription.status === 'deleted'){
        subscriptionButtons = (
            <span>
                {/*<Butt inline={true} size={'small'} onClick={onUpdateSubscription} label={`Update subscription`}/>*/}
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
                    <br/>Next payment for {price} will be taken on <strong>{subscription.cancellationEffectiveDate}</strong>.
                </p>
            </span>
        )
    }

    return (
        <div>
            <h2>Your account</h2>
            <ul>
                <li>Account type: {accountType} {subscriptionButtons}</li>
                <li>Total artworks added: {totalArtworks}
                    <p style={infoStyle}>
                        (the limit is {maxArtworks})
                    </p>
                </li>
                <li>Remaining spaces available: {maxArtworks - totalArtworks}</li>
            </ul>
        </div>
    )
};

export default AccountSettings;