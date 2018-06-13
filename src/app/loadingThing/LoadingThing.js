import React from 'react';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';

const LoadingThing = ({ label, style, progress = 0 }) => {
    return (
        <div style={style}>
            <LinearProgress determinate={progress > 0} progress={progress}/>
            {label &&
            <div style={{ margin: 20, textAlign: 'center' }}>
                {label}
            </div>
            }
        </div>
    )
};

export default LoadingThing;