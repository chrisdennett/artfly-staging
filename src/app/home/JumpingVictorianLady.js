import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
// comps
import SocialMediaLinks from './socialMediaStuff/SocialMediaLinks';
import Footer from "../footer/Footer";

const JumpingVictorianLady = () => {
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

            <Footer/>
        </div>
    )
};

export default JumpingVictorianLady;