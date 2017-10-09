// externals
import React from 'react';
// components
import Butt from "../../global/Butt";
import SubscribeButton from '../../global/SubscribeButton';

const AccountSettings = function (props) {
    const {artflyAccountTypes, totalArtworks, accountType, maxArtworksAllowed, subscription, price, onCancelSubscription, onUpdateSubscription } = props;

    let subscriptionButtons;
    const infoStyle = {
        fontSize: 16, margin: '0 0 10px 10px', opacity: 0.9
    };

    if (accountType === 'free') {
        subscriptionButtons = (
            <span>
                <SubscribeButton />
                <p style={infoStyle}>
                    (Subscribe for {price} a month to save up to {artflyAccountTypes.family.maxArtworks} artworks)
                </p>
            </span>
        )
    }
    else {
        subscriptionButtons = (
            <span>
                <Butt inline={true} size={'small'} onClick={onCancelSubscription} label={`Cancel subscription`}/>
                <Butt inline={true} size={'small'} onClick={onUpdateSubscription} label={`Update subscription`}/>
            </span>
        )
    }

    return (
        <div>
            <h2>Your account</h2>
            <ul>
                <li>Account type: {!subscription ? 'free' : 'subscriber'} {subscriptionButtons}</li>
                <li>Total artworks added: {totalArtworks}
                    <p style={infoStyle}>
                        (the limit is {maxArtworksAllowed})
                    </p>
                </li>
                <li>Remaining spaces available: {maxArtworksAllowed - totalArtworks}</li>
            </ul>
        </div>
    )
};

export default AccountSettings;