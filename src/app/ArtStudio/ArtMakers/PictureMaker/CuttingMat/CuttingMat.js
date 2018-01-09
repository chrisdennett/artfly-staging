import React from 'react';
// styles
import './cuttingMat_styles.css';

const CuttingMat = function ({ width=100, height=100 }) {

    const matMargin = 3;
    const matWidth = width - (matMargin*2);
    const matHeight = height - (matMargin*2);

    const gridTop = matMargin + 10;
    const gridRight = matMargin + 10;
    const gridBottom = matMargin + 10;
    const gridLeft = 80;
    const gridWidth = width - (gridLeft + gridRight);
    const gridHeight = height - (gridTop + gridBottom);

    return (

        <svg className='cuttingMat--svg' width={width} height={height}>
            <defs>
                <pattern id="minorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#a2c656" strokeWidth="1"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#minorGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#a2c656" strokeWidth="2"/>
                </pattern>
            </defs>


            <rect fill={'#044f34'}
                  width={width}
                  height={height}
            />

            <rect fill={'#04906a'}
                  x={matMargin}
                  y={matMargin}
                  width={matWidth}
                  height={matHeight}
                  rx={10}
                  ry={10}
            />

            <rect fill="url(#grid)"
                  x={gridLeft}
                  y={gridTop}
                  width={gridWidth}
                  height={gridHeight}
            />



        </svg>
    )
};

export default CuttingMat;