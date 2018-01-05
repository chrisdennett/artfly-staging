import React from 'react';

const CuttingMat = function ({width, height}) {

    const cuttingMatPadding = 10;
    const cuttingMatX = cuttingMatPadding;
    const cuttingMatY = cuttingMatPadding;

    /*const table = {fill: "url(#floorPattern)"};
    const tableColour = {fill: "#c49e71"};
    const tablePatternStyle = {fill: "#ad8b65"};*/

    return (
        <svg className='cropAndRotate--cuttingMat'>
            <defs>
                <pattern id="minorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#a2c656" strokeWidth="1"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#minorGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#a2c656" strokeWidth="2"/>
                </pattern>

               {/* <pattern id="floorPattern"
                         width={180} height={20}
                         patternUnits="userSpaceOnUse">
                    <rect style={tableColour} width="180" height="20"/>
                    <path style={tablePatternStyle}
                          d="M504,154h78a30,30,0,0,0,13-1h26c7,2,16,1,24,1h53c-5,1-11,2-16,1H595c-4,1-10,2-14,1H504Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle} d="M509,152H645c6,0,12-1,18,0h0c-6-1-13,0-19,0H509Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle} d="M504,148h81c-6-1-13-1-19,1H504Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle} d="M527,146h35a9,9,0,0,0,6-1H681c-5-2-12-1-18,0H527Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle} d="M532,142H645c-10,0-20-2-29-1H532Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle}
                          d="M513,141h27c5,1,10,0,15-1h16c6,0,12,1,18,0h28c9-2,20-1,28,1h1a75,75,0,0,0-25-1H560c-4-2-8,0-12,1H513Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle}
                          d="M511,138H673a134,134,0,0,0,29,0h-2a108,108,0,0,1-26,0H511Z"
                          transform="translate(-501 -135)"/>
                    <path style={tablePatternStyle} d="M525,137H704c-11-1-22-1-33,0H597c-9-1-18-1-27,0H525Z"
                          transform="translate(-501 -135)"/>
                </pattern>*/}
            </defs>

            {/*<rect style={table} width={'100%'} height={'100%'}/>*/}

            {/*<rect fill={'#044c33'} x={cuttingMatX+1} y={cuttingMatY + 2} width={width} height={height} rx={15} ry={15} />*/}
            <rect fill={'#04906a'} x={cuttingMatX} y={cuttingMatY} width={width} height={height} rx={10} ry={10} />

            <rect fill="url(#grid)" x={cuttingMatX+15} y={cuttingMatY+15} height={height-30} width={width-30} />

        </svg>
    )
};

export default CuttingMat;