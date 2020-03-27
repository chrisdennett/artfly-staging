import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// styles
import './artFlyIntro_styles.css';
// actions
import { UpdateUrl } from "../../../actions/UrlActions";
// constants
import { IN_STAGING } from '../../../GLOBAL_CONSTANTS';
import { GALLERY_PATH } from '../../../components/global/UTILS';

const ArtFlyIntro = function ({ UpdateUrl }) {

    const demoGalleryId = IN_STAGING ? 'EXS9OFRuWEWWJIBR8W35IStTjuk1' : 'pXerfNc4GwXugwA86nOYqz21nZe2';

    return (
        <div className={'artFlyIntro'}>

            <Typography use="headline5">
                A gallery for your kid's endless creativity.
            </Typography>

            <div style={{ marginTop: 20 }}>
                <Button raised onClick={() => UpdateUrl('/signUp')}>Get started for free</Button>
            </div>

            <Typography tag={'div'} use={'body1'} style={{ marginTop: 20, maxWidth: 500, lineHeight: '1.8rem', textAlign: 'center' }}>
                ArtFly's just a simple gallery right now. <br />
                Here's my
                <Button dense theme={'secondary'} onClick={() => UpdateUrl(GALLERY_PATH(demoGalleryId))}>
                    family gallery
                </Button>
                for example.  <br />
                But this is just the start. <br />
                Check out the ArtFly lab to see what I'm planning.
            </Typography>
        </div>
    )
};

export default connect(null, { UpdateUrl })(ArtFlyIntro);