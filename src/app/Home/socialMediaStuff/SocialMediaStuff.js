import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './socialMediaStuff_styles.css';
// comps
import SocialMediaLinks from './SocialMediaLinks';

const SocialMediaStuff = function () {
    return (
        <div className={'socialMediaStuff'}>

            <Typography className={'socialMediaStuff--sectionTitle'} use="headline4">
                Social Media Stuff
            </Typography>

            <Typography use="body1">
                I post pretty much the same things everywhere:
            </Typography>

            <SocialMediaLinks color={'#000'} />

            <Typography use="body1">
                Stuff like this:
            </Typography>

            <iframe className={'socialMediaStuff--iFrame'}
                    title={'@ArtFlyChris Twitter Feed'}
                    src="/twitter-feed.html"/>
        </div>
    )
};

export default SocialMediaStuff;