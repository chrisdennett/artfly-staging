import React from 'react';


const Shadow = ({ width, height, y }) => {
    const shadowHolderStyle = { position: 'absolute', left: 0, top: y, padding: 0, lineHeight: 0 };

    const smallShadowHeight = height * 0.75;
    const indent = 4;

    return (
        <svg height={height} width={width} style={shadowHolderStyle}>

            <polygon points={`0,0 ${width},0 ${width - 2},${height} ${2},${height}`}
                     style={{ fill: 'rgba(0,0,0,0.1)' }}
            />

            <polygon points={`0,0 ${width},0 ${width - indent},${smallShadowHeight} ${indent},${smallShadowHeight}`}
                     style={{ fill: 'rgba(0,0,0,0.2)' }}
            />
        </svg>
    )
};

export default Shadow;