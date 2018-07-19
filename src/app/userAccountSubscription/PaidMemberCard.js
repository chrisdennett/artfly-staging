import React, { Component } from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Card, CardAction, CardActions, CardActionButtons } from 'rmwc/Card';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";
import LabelValueItem from "../global/labelValueItem/LabelValueItem";
import LabelValueListDivider from "../global/labelValueItem/LabelValueListDivider";
import CircularProgressBar from "../global/CircularProgressBar";
import SubscriptionCancelledWarning from "./SubscriptionCancelledWarning";

class PaidMemberCard extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmDeleteIsShowing: false };

        this.confirmCancelSubscription = this.confirmCancelSubscription.bind(this);
    }

    confirmCancelSubscription() {
        this.setState({ confirmDeleteIsShowing: false }, () => {
            const { cancelUrl } = this.props.membershipDetails;
            this.props.cancelSubscription(cancelUrl);
        })
    }

    render() {
        const { confirmDeleteIsShowing } = this.state;
        const { membershipDetails, freePlanMaxArtworks, subscribeUser, userId } = this.props;
        const { planName, status, paidUntil, price, dateJoined, localPrice, maxArtworks, totalUserArtworks, receiptUrl, cancellationEffectiveDate } = membershipDetails;

        const grossPrice = localPrice && localPrice.gross ? localPrice.gross : price;
        const vatText = localPrice && localPrice.tax ? `(includes ${localPrice.tax} VAT)` : '';
        const nextPaymentText = status === 'deleted' ? 'cancelled' : TO_DATE_TEXT(paidUntil);

        return (
            <Card style={{ width: '100%', marginTop: 0 }}>
                <div style={{ padding: '0 1rem 0 1rem' }}>
                    <Typography use="headline6" tag="h2">
                        Type: {planName}
                    </Typography>
                    <Typography
                        use="subtitle2"
                        tag="h3"
                        theme="text-secondary-on-background"
                        style={{ marginTop: '-1rem' }}
                    >
                        Date joined: {TO_DATE_TEXT(dateJoined)}
                    </Typography>

                    <LabelValueItem label={'Monthly cost:'}
                                    value={
                                        <span>
                                        {grossPrice} <Typography use={'caption'}
                                                                 tag={'span'}>{vatText}</Typography>
                                    </span>
                                    }/>

                    <LabelValueItem label={'Next payment:'}
                                    value={nextPaymentText}/>

                    {receiptUrl &&
                    <LabelValueItem label={'Latest Receipt:'} value={
                        <Button unelevated dense tag={'a'} href={receiptUrl} target={'_blank'}>
                            <ButtonIcon use={'receipt'}/> receipt
                        </Button>
                    }/>
                    }

                    <LabelValueListDivider/>

                    <div style={{ textAlign: 'center', margin: '20px 0 20px 0' }}>
                        <CircularProgressBar max={maxArtworks} progress={totalUserArtworks}/>
                    </div>

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
                        <Button outlined onClick={this.confirmCancelSubscription}>
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

                {!confirmDeleteIsShowing && status !== 'deleted' &&
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <CardActionButtons onClick={() => this.setState({ confirmDeleteIsShowing: true })}>
                        <CardAction>Cancel subscription</CardAction>
                    </CardActionButtons>
                </CardActions>
                }


                {status === 'deleted' &&
                <div style={{ padding: '0 1rem 0 1rem' }}>
                    <SubscriptionCancelledWarning totalUserArtworks={totalUserArtworks}
                                                  cancellationEffectiveDate={cancellationEffectiveDate}/>
                </div>
                }

                {status === 'deleted' &&
                <Typography use="body1" tag="p" style={{ textAlign: 'center' }}>
                    <Button raised onClick={() => subscribeUser(userId)}>
                        Start a new subscription
                    </Button>
                </Typography>
                }

            </Card>
        )
    };
}

export default PaidMemberCard;