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
import { TO_DATE_TEXT } from '../global/UTILS';
// comps
import LoadingThing from "../loadingThing/LoadingThing";
import membershipPlans from "../userAccountSubscription/membershipPlans";

const UserSubscriptionCard = ({ membershipPlan, updateUrl, totalArtworks }) => {
    const { cancellationEffectiveDate, status, dateJoined } = membershipPlan;
    const maxArtworksOnFreePlan = membershipPlans['free'].maxArtworks;
    const totalArtworksToBeDeleted = totalArtworks - maxArtworksOnFreePlan >= 0 ? totalArtworks - maxArtworksOnFreePlan : 0;


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

                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Total Artworks: {totalArtworks}
                    </Typography>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Max Artworks: {membershipPlan.maxArtworks}
                    </Typography>

                    {status === 'deleted' &&
                    <div className={'userSubscriptionCard--warning'}>
                        <Typography use="body1"                        >
                            Subscription cancelled: ends {TO_DATE_TEXT(cancellationEffectiveDate)}
                        </Typography>
                        <Typography use="body1" tag="p">
                            After that you'll move onto free membership which means the maximum artworks will decrease
                            to {maxArtworksOnFreePlan}.
                        </Typography>
                        <Typography use="body1" tag="p">
                            {totalArtworksToBeDeleted} artwork{totalArtworksToBeDeleted === 1 ? '' : 's'} will be deleted.
                        </Typography>
                    </div>
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