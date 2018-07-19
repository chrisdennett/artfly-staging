import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
import { ListDivider } from 'rmwc/List';
import {
    Card,
    CardPrimaryAction,
    CardAction,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from 'rmwc/Card';

const UserGalleryCard = ({ userGallery, updateUrl }) => {
    return (
        <Card style={{ width: '100%', marginTop: 20 }}>
            <Typography
                use="subtitle1"
                tag="div"
                style={{ padding: '0.5rem 1rem' }}
                theme="text-secondary-on-background"
            >
                Gallery
            </Typography>

            <ListDivider/>

            <CardPrimaryAction onClick={() => updateUrl(`/gallery/galleryId_${userGallery.galleryId}_galleryId`)}>
                <div style={{ padding: '0 1rem 0 1rem' }}>
                    <Typography use="headline6" tag="h2">
                        {userGallery.title}
                    </Typography>
                    <Typography
                        use="subtitle2"
                        tag="h3"
                        theme="text-secondary-on-background"
                        style={{ marginTop: '-1rem' }}
                    >
                        {userGallery.subtitle}
                    </Typography>
                </div>
            </CardPrimaryAction>
            <CardActions style={{ paddingTop: 0 }}>
                <CardActionButtons>
                    <CardAction theme={'primary-bg on-primary'}
                                style={{marginLeft:5}}
                                onClick={() => updateUrl(`/gallery/galleryId_${userGallery.galleryId}_galleryId`)}>
                        Enter
                    </CardAction>
                </CardActionButtons>
                <CardActionIcons>
                    <CardAction use="add"
                                onClick={() => updateUrl(`/artworkAdder/galleryId_${userGallery.galleryId}_galleryId`)}
                    />
                </CardActionIcons>
            </CardActions>
        </Card>
    )
};

export default UserGalleryCard;