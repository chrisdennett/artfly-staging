import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';

const JumpingVictorianLady = () => {
    return (
        <div style={{
            backgroundColor: '#1b1b1b',
            color: '#fff',
            padding: '20px 20px 0 20px', textAlign: 'center'
        }}>
            <Typography use={'body1'} tag={'p'} style={{fontSize: 12, marginBottom:15, fontStyle:'italic'}}>
                You know it's all over when the victorian lady jumps the stool...
            </Typography>
            <img style={{ background: '#fff', padding: 10 }} src={'images/lab/Rotoscoping.gif'}
                 alt={'rotoscoping gif'}/>
        </div>
    )
};

export default JumpingVictorianLady;