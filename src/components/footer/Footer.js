import React from 'react';
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import SocialMediaLinks from "../../pages/home/socialMediaStuff/SocialMediaLinks";

const Footer = ({ UpdateUrl }) => {

    const divider = <span  style={{color:'rgba(255,255,255,0.4)'}}>|</span>;

    return (
        <div style={{
            backgroundColor: '#1b1b1b',
            color: '#fff',
            padding: '20px 0 40px 0',
            textAlign: 'center'
        }}>

            <SocialMediaLinks color={'rgba(255,255,255,0.7)'}/>

            <div>
                <Button dense style={{ color: '#fff' }} onClick={() => UpdateUrl('/termsOfService')}>Terms of Service</Button>
                {divider}
                <Button dense style={{ color: '#fff' }} onClick={() => UpdateUrl('/privacyPolicy')}>Privacy Policy</Button>
                {divider}
                <Button dense style={{ color: '#fff' }} onClick={() => UpdateUrl('/support')}>Support</Button>
            </div>

            <Typography use={'caption'} style={{color:'rgba(255,255,255,0.6)'}}>
                Copyright © 2018 ArtFly
            </Typography>
        </div>
    )
};

export default connect(null, { UpdateUrl })(Footer);