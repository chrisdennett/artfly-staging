import React from 'react';

const SvgHandle = function ({ type, isSelected }) {

    const circleStyle = {
        cursor: 'move'
    };

    // const innerCircleCol = isSelected ? 'rgba(138,43,226,0.1)' : 'rgba(0,0,0,0.1)';
    const outerCircleCol = isSelected ? 'rgba(212, 195, 40, 0.6)' : 'rgba(255,255,255,0.35)';
    // const outerCircleCol = isSelected ? '#8A2BE2' : '#d4c328';

    const startX = 25;
    const startY = 0;
    const rx = 25;
    const ry = 25;
    const xAxisRotation = 0;
    const largeArcFlag = 1; // force the long way round
    const sweepFlag = 0; // 1 = clockwise, 0 = anticlockwise
    const endX = 50;
    const endY = 25;

    let isCorner = false;
    let path;
    let rotate;

    switch (type){
        case 'top': isCorner = false; rotate = 90; break;
        case 'right': isCorner = false; rotate = 180; break;
        case 'bottom': isCorner = false; rotate = 270; break;
        case 'left': isCorner = false; rotate = 0; break;

        case 'top-left': isCorner = true; rotate = 90; break;
        case 'top-right': isCorner = true; rotate = 180; break;
        case 'bottom-right': isCorner = true; rotate = 270; break;
        case 'bottom-left': isCorner = true; rotate = 0; break;

        default: break;
    }

    if (isCorner) {
        path = `M${startX} ${startY}
                A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX} ${endY}
                L 25 25
                L 25 0
              `;
    }
    else {
        path = `M${startX} ${startY}
                A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${25} ${50}
                L 25 0
              `;
    }

    return (
        <svg width={50} height={50} style={circleStyle}>
            <circle cx={25} cy={25} r={24} fill={'none'}
            stroke={'rgba(255,255,255,0.2)'}/>

            <path transform={`rotate(${rotate}, 25, 25)`}
                  fill={outerCircleCol}
                  stroke={'none'}
                  d={path}/>
        </svg>
    )
};

export default SvgHandle;