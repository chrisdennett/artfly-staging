import React from 'react';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { LinearProgress } from 'rmwc/LinearProgress';

const ProgressItem = ({ progress, label }) => {
    const style = { padding: '10px 0' };
    const iconStyle = { verticalAlign: 'text-bottom' };

    return (
        <div style={style}>
            {progress < 1 &&
            <Typography use={'body1'}>
                <p>Saving: {label}</p>
                <LinearProgress progress={progress} determinate={progress > 0 && progress < 1}/>
            </Typography>
            }

            {progress === 1 &&
            <Typography use={'body1'}>
                <Icon style={iconStyle} use="done_outline"/> {label} SAVED
            </Typography>
            }
        </div>
    )
};

export default ProgressItem;