import React from 'react';

const CuttingOverlay = function ({width, height, cutoutX, cutoutY, cutoutWidth, cutoutHeight}) {
    return (
        <svg width={width} height={height} style={{position: 'absolute'}}>
            <defs>
                <mask id="hole">
                    <rect width={width} height={height} fill="white"/>
                    <rect x={cutoutX}
                          y={cutoutY}
                          width={cutoutWidth}
                          height={cutoutHeight}
                          fill="black"/>
                </mask>
            </defs>

            <rect fill={'rgba(0,0,0,0.7)'} width={width} height={height} mask="url(#hole)" />
        </svg>
    )
};

export default CuttingOverlay;