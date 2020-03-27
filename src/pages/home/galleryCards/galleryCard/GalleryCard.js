import React from 'react';
// ui
import { Icon } from '@rmwc/icon';
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

const GalleryCard = ({ title, galleryType, onClick, onAddClick, onDeleteClick, totalArtworks, latestArtwork }) => {

    const thumbUrl = latestArtwork ? latestArtwork.thumbUrl : 'https://material-components-web.appspot.com/images/16-9.jpg';

    const totalArtworkText = `${totalArtworks} artwork${totalArtworks !== 1 ? 's' : ''}`;

    // 'accessibility_new'
    const galleryTypeIcon = galleryType === 'artist' ? 'face' : 'view_comfy';
    const galleryTypeText = galleryType === 'artist' ? <span style={{ fontSize: '1rem', color: '#888' }}>Artist: </span> : '';
    let cardStyle = { width: '14rem', margin: 10 }
    if (galleryType === 'global') {
        // cardStyle.disp
    }


    return (
        <Card style={cardStyle}>
            <CardPrimaryAction onClick={onClick}>
                <CardMedia
                    sixteenByNine
                    style={{
                        backgroundImage: `url(${thumbUrl})`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: 'auto'
                    }}
                />
                <div style={{ padding: '0 1rem' }}>
                    <Typography use="headline6" tag="h2" style={{ margin: '1rem 0 0 0' }}>
                        <Icon icon={galleryTypeIcon}
                            style={{ verticalAlign: 'text-bottom', color: '#888', fontSize: '1.3rem' }} /> {galleryTypeText}{title}
                    </Typography>
                    <Typography
                        use="subtitle2"
                        tag="h3"
                        theme="text-secondary-on-background"
                        style={{ margin: 0, paddingLeft: 25, lineHeight: '1rem' }}
                    >
                        {totalArtworkText}
                    </Typography>
                </div>
            </CardPrimaryAction>
            <CardActions>
                <CardActionButtons>
                    <CardAction onClick={onClick}>View</CardAction>
                </CardActionButtons>
                <CardActionIcons>
                    {galleryType === 'artist' &&
                        <CardAction icon="delete_forever" onClick={onDeleteClick} />
                    }
                    <CardAction icon="add" onClick={onAddClick} />
                </CardActionIcons>
            </CardActions>
        </Card>
    )
};

export default GalleryCard;