import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// comps
import LabelValueItem from "../../components/global/labelValueItem/LabelValueItem";

const MembershipOption = ({ membershipPlan, localPrice, subscribeUser, userId, message }) => {

    const { planName, maxArtworks, price, isPaidPlan } = membershipPlan;

    const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
    const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';

    return (
        <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0 20px 20px 20px' }}>
            <Typography use="headline6" tag="h2">
                Membership: {planName}
            </Typography>

            <LabelValueItem label={'Max Artworks'}
                            value={maxArtworks}/>

            {isPaidPlan &&
            <LabelValueItem label={'Monthly cost:'}
                            value={
                                <span>
                                        {grossPrice} <Typography use={'caption'}
                                                                 tag={'span'}>{vatText}</Typography>
                                    </span>
                            }/>
            }
            {isPaidPlan &&
            <div className={'membershipOption--subscribeSection'}>
                <Button theme={'primary-bg on-primary'}
                        onClick={() => subscribeUser(userId)}>Subscribe</Button>
            </div>
            }

            {message &&
            <Typography use="body1" tag="p">
                {message}
            </Typography>
            }
        </div>
    )
};

export default MembershipOption;