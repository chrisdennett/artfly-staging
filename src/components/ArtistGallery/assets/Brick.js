import React from 'react';

const Brick = function ({x, y, width, height, featureColour, highlight, lowlight}) {
    return (
        <g>
            <rect ry={5} x={x} y={y-0.5} width={width} height={height} fill={highlight} />
            <rect ry={5} x={x+1} y={y+1} width={width} height={height} fill={lowlight} />
            <rect ry={5} x={x} y={y} width={width} height={height} fill={featureColour} />
        </g>
    )
};

export default Brick;