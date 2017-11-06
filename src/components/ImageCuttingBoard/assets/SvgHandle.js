import React from 'react';

const SvgHandle = function ({fill='#ff00ff', style}) {

    const circleStyle = {
        cursor: 'move'
    };

    return (
        <svg width={50} height={50} style={style}>
            <circle cx={25} cy={25} style={circleStyle} r={25} fill={fill}/>
        </svg>
    )
};

export default SvgHandle;