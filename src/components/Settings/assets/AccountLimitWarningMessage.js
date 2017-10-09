// externals
import React from 'react';
// components
import SubscribeButton from '../../global/SubscribeButton';

const AccountLimitWarningMessage = function ({maxArtworksReached}) {

    const warningStyle = {
        background: '#8f2727',
        padding: '20px 20px',
        margin: 10,
        borderRadius: 10
        // border: '1px white solid'
    };

    const paragraphStyle = {
        fontSize: 16,
        padding: 0,
        margin: 0
    };

    let warning = null;
    if(maxArtworksReached){
        warning =(
            <div style={warningStyle}>
                <p style={paragraphStyle}>Warning: It looks like you've reached the maximum number of artworks for your account.</p>
                <p style={paragraphStyle}><SubscribeButton/> to add more.</p>
            </div>
        )
    }

    /*if (subscription.status === 'past_due') {
    subscriptionContent = (
        <div>
            <p>You're a monthly subscriber, but you last payment has failed. We'll try to collect the payment again
                soon.</p>
            <Butt onClick={onCancelSubscription} label={`Cancel subscription`}/>
            <Butt onClick={onUpdateSubscription} label={`Update subscription`}/>
        </div>
    )
}
// if status is deleted
else if (subscription.status === 'deleted') {
    subscriptionContent = (
        <div>
            <p>You've cancelled your subscription - you can access your account until: {subscription.paidUntil}</p>
            <p>Re-subscribe for {price} a month to save up to 1000 artworks</p>
            <Butt label={`Subscribe`} onClick={onSubscribe}/>
        </div>
    )
}*/

    return warning
};

export default AccountLimitWarningMessage;