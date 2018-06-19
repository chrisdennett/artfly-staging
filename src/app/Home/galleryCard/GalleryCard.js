import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardAction,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from 'rmwc/Card';

const GalleryCard = ({galleryData, onClick, totalArtworks, latestArtwork}) => {

    const {title, subtitle} = galleryData;

    const thumbUrl = latestArtwork ? latestArtwork.thumbUrl : 'https://material-components-web.appspot.com/images/16-9.jpg';
    const galleryInfo1 =  `Total artworks: ${totalArtworks}`;

    let galleryInfo2;
    if(latestArtwork){
        const d = new Date(latestArtwork.lastUpdated);
        const date = d.getDate();
        const monthIndex = d.getMonth();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
        const year = d.getFullYear();

        galleryInfo2 = ` Last updated: ${date} ${month} ${year}`;
    }

    return <Card style={{ width: '18rem' }}>
        <CardPrimaryAction onClick={onClick}>
            <CardMedia
                sixteenByNine
                style={{
                    backgroundImage:`url(${thumbUrl})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto'
                }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                    {title}
                </Typography>
                <Typography
                    use="subtitle2"
                    tag="h3"
                    theme="text-secondary-on-background"
                    style={{ marginTop: '-1rem' }}
                >
                    {subtitle}
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    {galleryInfo1}
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    {galleryInfo2}
                </Typography>
            </div>
        </CardPrimaryAction>
        <CardActions>
            <CardActionButtons>
                <CardAction onClick={onClick}>View</CardAction>
                {/*<CardAction onClick={onClick}>Add Art</CardAction>*/}
            </CardActionButtons>
            <CardActionIcons>
                {/*<CardAction
                    iconToggle
                    on={{ label: 'Remove from favorites', content: 'favorite' }}
                    off={{ label: 'Add to favorites', content: 'favorite_border' }}
                />*/}
                <CardAction icon use="edit"/>
                <CardAction icon use="add"/>
                {/*<CardAction icon use="more_vert"/>*/}
            </CardActionIcons>
        </CardActions>
    </Card>
};

export default GalleryCard;