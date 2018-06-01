import React from 'react';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';

const LoadingThing = function () {
    return (
        <div>
            <LinearProgress determinate={false}/>
            <div style={{ margin: 20, textAlign: 'center' }}>
                Loading stuff...
            </div>
        </div>
    )
};

export default LoadingThing;