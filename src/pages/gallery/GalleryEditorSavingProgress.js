import React from 'react';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';
import { Typography } from 'rmwc/Typography';

const GalleryEditorSavingProgress = ({ status, label = 'Updating gallery:' }) => {

    if (!status) {
        return null;
    }

    const holderStyle = {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'fixed',
        top: 0, bottom: 0, left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 9999,
        justifyContent: 'center',
        padding: 5,
        borderBottom: '1px solid rgba(0,0,0,0.2)'
    };
    const processBarStyle = { marginTop: 10, marginBottom: 10 };

    return (
        <div style={holderStyle}>
            <Typography use={'body1'} style={{ color: '#fff' }}>
                {label}
            </Typography>

            <LinearProgress style={processBarStyle} determinate={false}/>
        </div>
    )
};

export default GalleryEditorSavingProgress;