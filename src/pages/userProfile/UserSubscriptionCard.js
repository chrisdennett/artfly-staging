import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
import { ListDivider } from 'rmwc/List';
import {
    Card,
    CardPrimaryAction,
    CardAction,
    CardActions,
    CardActionButtons
} from 'rmwc/Card';
// styles
import './userSubscriptionCard_styles.css';
// helpers
import { TO_DATE_TEXT } from '../../components/global/UTILS';
// comps
import LoadingThing from "../../components/loadingThing/LoadingThing";
import SubscriptionCancelledWarning from "../userAccountSubscription/SubscriptionCancelledWarning";

const UserSubscriptionCard = ({ membershipPlan, updateUrl, totalArtworks }) => {
    const { cancellationEffectiveDate, status, dateJoined } = membershipPlan;

    return (
        <Card style={{ width: '100%', marginTop: 20 }}>
            <Typography
                use="subtitle1"
                tag="div"
                style={{ padding: '0.5rem 1rem' }}
                theme="text-secondary-on-background"
            >
                Your membership
            </Typography>

            <ListDivider/>

            {!dateJoined &&
            <LoadingThing/>
            }

            {dateJoined &&
            <CardPrimaryAction onClick={() => updateUrl(`/accountSubscription`)}>
                <div style={{ padding: '0 1rem 0 1rem' }}>
                    <Typography use="headline6" tag="h2">
                        Type: {membershipPlan.planName}
                    </Typography>
                    <Typography
                        use="subtitle2"
                        tag="h3"
                        theme="text-secondary-on-background"
                        style={{ marginTop: '-1rem' }}
                    >
                        Date joined: {TO_DATE_TEXT(dateJoined)}
                    </Typography>

                    {status === 'deleted' &&
                    <SubscriptionCancelledWarning totalUserArtworks={totalArtworks}
                                                  cancellationEffectiveDate={cancellationEffectiveDate}/>

                    }
                </div>
            </CardPrimaryAction>
            }
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <CardActionButtons>
                    <CardAction theme={'primary-bg on-primary'}
                                onClick={() => updateUrl(`/accountSubscription`)}>
                        view / update
                    </CardAction>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
};

export default UserSubscriptionCard;