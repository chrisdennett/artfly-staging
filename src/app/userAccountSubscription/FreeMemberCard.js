import React from "react";
// ui
import { Typography } from 'rmwc/Typography';
import { Card, CardAction, CardActions, CardActionButtons } from 'rmwc/Card';
// helpers
import { TO_DATE_TEXT } from "../global/UTILS";

const FreeMemberCard = ({membershipDetails, localPrice, totalUserArtworks}) => {

    const {planName, dateJoined, maxArtworks } = membershipDetails;

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

                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    Total Artworks: {totalUserArtworks}
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    Max Artworks: {maxArtworks}
                </Typography>
            </div>

            {/*<CardActions>
                <CardActionButtons style={{ paddingLeft: 5, paddingBottom: 5 }}
                                   onClick={() => subscribeUser()}>
                    <CardAction theme={'secondary-bg on-secondary'}>subscribe</CardAction>
                </CardActionButtons>
            </CardActions>*/}
        </Card>
    );
}

export default FreeMemberCard;