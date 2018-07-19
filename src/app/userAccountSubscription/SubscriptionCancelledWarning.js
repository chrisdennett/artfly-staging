import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
import membershipPlans from "./membershipPlans";

const SubscriptionCancelledWarning = ({totalUserArtworks, cancellationEffectiveDate}) => {

    // only used if subscription set to delete
    const maxArtworksOnFreePlan = membershipPlans['free'].maxArtworks;
    const totalArtworksToBeDeleted = totalUserArtworks - maxArtworksOnFreePlan >= 0 ? totalUserArtworks - maxArtworksOnFreePlan : 0;

    return (
        <div className={'userSubscriptionCard--warning'}>
            <Typography use="body1">
                Subscription cancelled: Ends on {TO_DATE_TEXT(cancellationEffectiveDate)}
            </Typography>
            <Typography use="body1" tag="p">
                After that you'll move onto free membership which means the maximum artworks will decrease
                to {maxArtworksOnFreePlan}.
            </Typography>
            <Typography use="body1" tag="p">
                {totalArtworksToBeDeleted} artwork{totalArtworksToBeDeleted === 1 ? '' : 's'} will be deleted.
            </Typography>
        </div>
    )
};

export default SubscriptionCancelledWarning;