import React from 'react';

const Floor = function ({floorY, floorHeight}) {
    const floor = { fill: "url(#floorPattern)" };
    const floorColour = { fill: "#c49e71" };
    const floorPatternStyle = { fill: "#ad8b65" };



    return (
        <svg width={'100%'} height={'100%'}>

            <defs>
                <pattern id="floorPattern"
                         width={214} height={21.4}
                         patternUnits="userSpaceOnUse">
                    <rect style={floorColour} width="214" height="21.4"/>
                    <path style={floorPatternStyle}
                          d="M504,154h78a30,30,0,0,0,13-1h26c7,2,16,1,24,1h53c-5,1-11,2-16,1H595c-4,1-10,2-14,1H504Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle} d="M509,152H645c6,0,12-1,18,0h0c-6-1-13,0-19,0H509Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle} d="M504,148h81c-6-1-13-1-19,1H504Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle} d="M527,146h35a9,9,0,0,0,6-1H681c-5-2-12-1-18,0H527Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle} d="M532,142H645c-10,0-20-2-29-1H532Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle}
                          d="M513,141h27c5,1,10,0,15-1h16c6,0,12,1,18,0h28c9-2,20-1,28,1h1a75,75,0,0,0-25-1H560c-4-2-8,0-12,1H513Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle}
                          d="M511,138H673a134,134,0,0,0,29,0h-2a108,108,0,0,1-26,0H511Z"
                          transform="translate(-501 -135)"/>
                    <path style={floorPatternStyle} d="M525,137H704c-11-1-22-1-33,0H597c-9-1-18-1-27,0H525Z"
                          transform="translate(-501 -135)"/>
                </pattern>
            </defs>

            <rect style={floor} x="0" y={floorY} width="100%" height={floorHeight}/>
        </svg>
    );
};

export default Floor;