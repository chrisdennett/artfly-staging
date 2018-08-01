import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
import { ListDivider } from 'rmwc/List';
import { Card } from 'rmwc/Card';
// comps
import ArtworkThumb from "../../components/artworkThumb/ArtworkThumb";

const RecentArtworksCard = ({ artworks, galleryId, updateUrl }) => {
    return (
        <Card style={{ width: '100%', marginTop: 20 }}>
            <Typography
                use="subtitle1"
                tag="div"
                style={{ padding: '0.5rem 1rem' }}
                theme="text-secondary-on-background"
            >
                Recent Artworks
            </Typography>

            <ListDivider/>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    artworks.map(artwork => {
                        return <ArtworkThumb key={artwork.artworkId}
                                             artworkData={artwork}
                                             onClick={() => updateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artwork.artworkId}_artworkId`)}
                        />
                    })
                }
            </div>
        </Card>
    )
};

export default RecentArtworksCard;