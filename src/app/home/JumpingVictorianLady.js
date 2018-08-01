import React from 'react';
import {connect} from 'react-redux';
import { Typography } from 'rmwc/Typography';
// comps
import SocialMediaLinks from './socialMediaStuff/SocialMediaLinks';

const JumpingVictorianLady = () => {
    return (
        <div style={{
            backgroundColor: '#000',
            color: '#fff',
            border: '10px solid #555', padding: 42, textAlign: 'center'
        }}>
            <img style={{ background: '#fff', padding: 10 }} src={'images/lab/Rotoscoping.gif'}
                 alt={'rotoscoping gif'}/>
            <Typography use={'body1'}>
                <p>You know it's all over when the victorian lady jumps the stool...</p>
            </Typography>

            <SocialMediaLinks />
        </div>
    )
};

export default JumpingVictorianLady;