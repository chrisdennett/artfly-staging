import React from 'react';

const Brick = function ({ x, y, width, height, alignRight, featureColour, highlight, lowlight }) {

    let xPos = x;
    if (alignRight === true) {
        xPos = x - width;
    }

    return (
        <g>
            <rect ry={5} x={xPos}       y={y - 0.5} width={width} height={height} fill={highlight}/>
            <rect ry={5} x={xPos + 1}   y={y + 1}   width={width} height={height} fill={lowlight}/>
            <rect ry={5} x={xPos}       y={y}       width={width} height={height} fill={featureColour}/>
        </g>
    )
};

export default Brick;