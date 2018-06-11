import React from 'react';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';

const LoadingThing = ({label='Loading stuff...', style}) => {
    return (
        <div style={style}>
            <LinearProgress determinate={false}/>
            <div style={{ margin: 20, textAlign: 'center' }}>
                {label}
            </div>
        </div>
    )
};

export default LoadingThing;