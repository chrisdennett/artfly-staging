import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Card, CardAction, CardActions, CardActionButtons, CardActionIcons } from 'rmwc/Card';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";

const PaidMemberCard = ({ membershipDetails, localPrice, totalUserArtworks, cancelSubscription }) => {

    const { planName, dateJoined, paidUntil, price, maxArtworks, cancelUrl } = membershipDetails;

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';

    return (
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

                <div>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Monthly cost: {grossPrice} <Typography use={'caption'}
                                                               tag={'span'}>{vatText}</Typography>
                    </Typography>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Next payment: {TO_DATE_TEXT(paidUntil)}
                    </Typography>
                </div>

                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    Total Artworks: {totalUserArtworks}
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    Max Artworks: {maxArtworks}
                </Typography>
            </div>

            <CardActions>
                <CardActionButtons style={{ paddingLeft: 5, paddingBottom: 5 }}
                                   onClick={() => cancelSubscription(cancelUrl)}>
                    <CardAction>Cancel subscription</CardAction>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
};

export default PaidMemberCard;