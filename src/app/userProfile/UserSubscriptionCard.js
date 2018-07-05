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
// data
import membershipPlans from '../userAccountSubscription/membershipPlans';
import LoadingThing from "../loadingThing/LoadingThing";

const UserSubscriptionCard = ({ account, updateUrl, totalArtworks }) => {
    const { dateJoined } = account;

    const d = new Date(dateJoined);
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    const year = d.getFullYear();

    const userJoinDate = `${date} ${month} ${year}`;

    let membershipPlan;
    if(!account.subscription){
        membershipPlan = membershipPlans['free'];
    }

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
            <CardPrimaryAction>
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
                        Date joined: {userJoinDate}
                    </Typography>

                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Total Artworks: {totalArtworks}
                    </Typography>
                    <Typography use="body1" tag="div" theme="text-secondary-on-background">
                        Maximum Artworks: {membershipPlan.maxArtworks}
                    </Typography>
                </div>
            </CardPrimaryAction>
            }
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <CardActionButtons>
                    <CardAction theme={'secondary-bg on-secondary'}
                                onClick={() => updateUrl(`/accountSubscription`)}>
                        upgrade
                    </CardAction>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
};

export default UserSubscriptionCard;