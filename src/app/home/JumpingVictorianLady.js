import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import SocialMediaLinks from './socialMediaStuff/SocialMediaLinks';

const JumpingVictorianLady = ({UpdateUrl}) => {
    return (
        <div style={{
            backgroundColor: '#1b1b1b',
            color: '#fff',
            padding: 42, textAlign: 'center'
        }}>
            <img style={{ background: '#fff', padding: 10 }} src={'images/lab/Rotoscoping.gif'}
                 alt={'rotoscoping gif'}/>
            <Typography use={'body1'}>
                <p>You know it's all over when the victorian lady jumps the stool...</p>
            </Typography>

            <SocialMediaLinks/>

            <Button style={{color:'#fff'}} onClick={() => UpdateUrl('/termsOfService')}>Terms of Service</Button>
            |
            <Button style={{color:'#fff'}} onClick={() => UpdateUrl('/privacyPolicy')}>Privacy Policy</Button>
        </div>
    )
};

export default connect(null, { UpdateUrl })(JumpingVictorianLady);