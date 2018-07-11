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
// helpers
import { TO_DATE_TEXT } from '../global/UTILS';
// comps
import LoadingThing from "../loadingThing/LoadingThing";

const UserSubscriptionCard = ({ account, membershipPlan, updateUrl, totalArtworks }) => {
    const { dateJoined } = account;

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
                        Membership: {membershipPlan.planName}
                    </Typography>
                    <Typography
                        use="subtitle2"
                        tag="h3"
                        theme="text-secondary-on-background"
                        style={{ marginTop: '-1rem' }}
                    >
                        Date joined: {TO_DATE_TEXT(dateJoined)}
                    </Typography>

                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Total Artworks: {totalArtworks}
                    </Typography>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Max Artworks: {membershipPlan.maxArtworks}
                    </Typography>
                </div>
            </CardPrimaryAction>
            }
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <CardActionButtons>
                    <CardAction theme={'secondary-bg on-secondary'}
                                onClick={() => updateUrl(`/accountSubscription`)}>
                        view / update
                    </CardAction>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
};

export default UserSubscriptionCard;