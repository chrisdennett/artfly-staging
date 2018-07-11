import React, { Component } from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Card, CardAction, CardActions, CardActionButtons } from 'rmwc/Card';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
import LabelValueItem from "../global/labelValueItem/LabelValueItem";
import LabelValueListDivider from "../global/labelValueItem/LabelValueListDivider";

class PaidMemberCard extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmDeleteIsShowing: false };
    }

    render() {
        const { confirmDeleteIsShowing } = this.state;
        const { membershipDetails, freePlanMaxArtworks, cancelSubscription } = this.props;

        const { planName, paidUntil, price, localPrice, maxArtworks, totalUserArtworks, cancelUrl, receiptUrl } = membershipDetails;

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

                    {receiptUrl &&
                    <LabelValueItem label={'Latest Receipt:'} value={
                        <Button unelevated dense tag={'a'} href={receiptUrl} target={'_blank'}>
                            <ButtonIcon use={'receipt'} /> receipt
                        </Button>
                    }/>
                    }

                    <LabelValueListDivider/>

                    <LabelValueItem label={'Total Artworks:'} value={totalUserArtworks}/>
                    <LabelValueItem label={'Max Artworks'} value={maxArtworks}/>

                </div>

                {confirmDeleteIsShowing &&
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <Typography use="headline6" tag="h3">
                        Are you sure you want to cancel?
                    </Typography>
                    <Typography use="body1" tag="p">
                        By cancelling you'll move onto free membership which means the maximum artworks will decrease
                        to {freePlanMaxArtworks} as of {TO_DATE_TEXT(paidUntil)}.
                    </Typography>

                    {totalUserArtworks > freePlanMaxArtworks &&
                    <Typography use="body1" tag="p" style={{ backgroundColor: '#ffc17d', padding: 10 }}>
                        This will mean {totalUserArtworks - freePlanMaxArtworks} of your artworks will be deleted when
                        your subscription ends.
                    </Typography>
                    }

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button outlined onClick={() => cancelSubscription(cancelUrl)}>
                            Yes, cancel subscription
                        </Button>

                        <Button raised
                                style={{ marginLeft: 10 }}
                                onClick={() => this.setState({ confirmDeleteIsShowing: false })}>
                            No
                        </Button>
                    </div>
                </div>
                }

                {!confirmDeleteIsShowing &&
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <CardActionButtons onClick={() => this.setState({ confirmDeleteIsShowing: true })}>
                        <CardAction>Cancel subscription</CardAction>
                    </CardActionButtons>
                </CardActions>
                }

            </Card>
        )
    };
}

export default PaidMemberCard;