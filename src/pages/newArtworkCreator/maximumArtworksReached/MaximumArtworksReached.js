import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// actions
import { UpdateUrl } from "../../../actions/UrlActions";
// styles
import './maximumArtworksReached_styles.css';

const MaximumArtworksReached = ({ UpdateUrl, totalUserArtworks, maxArtworksAllowed, galleryId }) => {
    return (
        <div className={'maxArtworksReached'}>
            <div className={'maxArtworksReached--message'}>
                <Typography tag={'h1'} use={'headline6'}>
                    You've reached the maximum number of artworks allowed
                </Typography>

                <Typography tag={'p'} use={'body1'}>
                    You have {totalUserArtworks} artworks out of {maxArtworksAllowed}.
                </Typography>
                <Typography tag={'p'} use={'body1'}>
                    To add more <Button dense theme={'secondary'}
                                              onClick={() =>
                                                  UpdateUrl(`/accountSubscription`)}>
                    Subscribe to artfly </Button> or delete 1 or more artworks
                    from <Button dense theme={'secondary'} onClick={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId`)}>your
                    gallery</Button>.
                </Typography>
            </div>

            <div className={'maxArtworksReached--links'}>
                <Button raised
                        onClick={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId`)}>
                    your gallery
                </Button>

                <Button raised theme={'secondary-bg'}
                        onClick={() => UpdateUrl(`/accountSubscription`)}>
                    club membership
                </Button>
            </div>
        </div>
    )
};

export default connect(null, { UpdateUrl })(MaximumArtworksReached);