import React from 'react';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';

const LoadingThing = ({label='Loading stuff...', style, progress=0}) => {
    return (
        <div style={style}>
            <LinearProgress determinate={progress>0} progress={progress}/>
            {label.length>0&&
            <div style={{ margin: 20, textAlign: 'center' }}>
                {label}
            </div>
            }
        </div>
    )
};

export default LoadingThing;