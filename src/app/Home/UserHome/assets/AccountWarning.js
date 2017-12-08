// externals
import React from 'react';
// components
import SubscribeButton from '../../../global/SubscribeButton';

const AccountWarning = function ({maxArtworksReached, className}) {

    let warning = null;
    if(maxArtworksReached){
        warning =(
            <div className={className}>
                <p><strong>Warning:</strong> You've reached the maximum artworks for the free membership.</p>
                <p><SubscribeButton/> to add more. </p>
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

export default AccountWarning;