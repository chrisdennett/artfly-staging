import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Card, CardAction, CardActions, CardActionButtons } from 'rmwc/Card';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
import LabelValueItem from "../global/labelValueItem/LabelValueItem";
import LabelValueListDivider from "../global/labelValueItem/LabelValueListDivider";

const PaidMemberCard = ({ membershipDetails, cancelSubscription }) => {

    const { planName, paidUntil, price, localPrice, maxArtworks, totalUserArtworks, cancelUrl } = membershipDetails;

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';

    return (
        <Card style={{ width: '100%', marginTop: 0 }}>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                    Current Membership: {planName}
                </Typography>

                <LabelValueItem label={'Monthly cost:'}
                                value={
                                    <span>
                                        {grossPrice} <Typography use={'caption'}
                                                                 tag={'span'}>{vatText}</Typography>
                                    </span>
                                }/>
                <LabelValueItem label={'Next payment:'} value={TO_DATE_TEXT(paidUntil)}/>
                <LabelValueListDivider />
                <LabelValueItem label={'Total Artworks:'} value={totalUserArtworks}/>
                <LabelValueItem label={'Max Artworks'} value={maxArtworks}/>
            </div>

            <CardActions style={{ justifyContent: 'flex-end' }}>
                <CardActionButtons onClick={() => cancelSubscription(cancelUrl)}>
                    <CardAction>Cancel subscription</CardAction>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
};

export default PaidMemberCard;