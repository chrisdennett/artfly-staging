import React from "react";
// ui
import { Typography } from 'rmwc/Typography';
import { Card } from 'rmwc/Card';
// helpers
import LabelValueItem from "../../components/global/labelValueItem/LabelValueItem";

const FreeMemberCard = ({membershipDetails}) => {

    const {planName, maxArtworks, totalUserArtworks } = membershipDetails;

    return (
        <Card style={{ width: '100%', marginTop: 0 }}>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                    Current Membership: {planName}
                </Typography>

                <LabelValueItem label={'Total Artworks:'} value={totalUserArtworks}/>
                <LabelValueItem label={'Max Artworks'} value={maxArtworks}/>
            </div>
        </Card>
    );
};

export default FreeMemberCard;