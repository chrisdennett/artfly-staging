import React from 'react';

const SectionLine = function ({x, y, width, featureColour, lowlight, highlight}) {

    const shadingOffset = 1;

    return (
        <g>
            <path d={`M${x+shadingOffset} ${y+shadingOffset} h${width}`} stroke={lowlight} strokeWidth="3" fill="none"/>
            <path d={`M${x-shadingOffset} ${y-shadingOffset} h${width}`} stroke={highlight} strokeWidth="3" fill="none"/>
            <path d={`M${x} ${y} h${width}`} stroke={featureColour} strokeWidth="3" fill="none"/>
        </g>
    )
};

export default SectionLine;