import React from 'react';

const GridLines = function ({stroke}) {
    return (
        <svg style={{position:'absolute'}} width={'100%'} height={'100%'}>
            <defs>
                <pattern id="minorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke={stroke} strokeWidth="1"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#minorGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke={stroke} strokeWidth="2"/>
                </pattern>
            </defs>

            <rect fill="url(#grid)" height={'100%'} width={'100%'} />

        </svg>
    )
};

export default GridLines;