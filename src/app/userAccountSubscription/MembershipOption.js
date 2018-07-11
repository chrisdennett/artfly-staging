import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

const MembershipOption = ({ membershipPlan, localPrice, subscribeUser, userId }) => {

    const { planName, maxArtworks, price, isPaidPlan } = membershipPlan;

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';

    return (
        <div style={{ width: '100%', marginTop: 0 }}>
            <Typography use="headline6" tag="h2">
                Membership: {planName}
            </Typography>

            <Typography use="body1" tag="div" theme="text-secondary-on-background">
                Max Artworks: {maxArtworks}
            </Typography>

            {isPaidPlan &&
            <Typography use="body1" tag="div" theme="text-secondary-on-background">
                Monthly cost: {grossPrice} <Typography use={'caption'}
                                                       tag={'span'}>{vatText}</Typography>
            </Typography>
            }
            {isPaidPlan &&
            <div className={'membershipOption--subscribeSection'}>
                <Button theme={'primary-bg on-primary'}
                        onClick={() => subscribeUser(userId)}>Subscribe</Button>
            </div>
            }
        </div>
    )
};

export default MembershipOption;