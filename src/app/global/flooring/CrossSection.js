import React from 'react';

const CrossSection = function ({ height = 40 }) {
    const floorBoardEdgeHeightPercent = 0.18;
    const underlayPercent = 0.02;
    const ceilingEdgePercent = 0.18;
    const joistPercent = 1 - (floorBoardEdgeHeightPercent + underlayPercent + ceilingEdgePercent);

    const floorBoardEdgeHeight = height * floorBoardEdgeHeightPercent;
    const underlayHeight = height * underlayPercent;
    const joistHeight = height * joistPercent;
    const ceilingEdgeHeight = height * ceilingEdgePercent;

    const underlayY = floorBoardEdgeHeight;
    const joistY = underlayY + underlayHeight;
    const ceilingEdgeY = joistY + joistHeight;

    const floorColour = "#d3b492";
    const grainColour = "#9a7a56";
    const underlayColour = "#917555";

    const joistCol = "#e1d6b4";
    const gapCol = "#786b66";
    const joistSideCol = "#5b473f";

    return (
        <svg width={'100%'} height={height}>

            <defs>
                <pattern id={'floorPattern'}
                         width={10} height={20}
                         patternUnits="userSpaceOnUse">
                    <rect fill={floorColour} width="214" height="20"/>
                    <rect fill={grainColour} width={20} height={1}/>
                </pattern>

                <pattern id={'joistPattern'} y={joistY} width={200}
                         height={joistHeight}
                         patternUnits="userSpaceOnUse">
                    <rect fill={gapCol} width={200} height={joistHeight}/>
                    <rect fill={joistCol} width={20} height={joistHeight}/>
                    <polygon height={joistHeight}
                             points={`20,0 40,0 20,${joistHeight}`} fill={joistSideCol}/>
                </pattern>
            </defs>

            <rect fill={'url(#floorPattern)'} width="100%" height={floorBoardEdgeHeight}/>
            <rect fill={'url(#joistPattern)'} y={joistY} width="100%" height={joistHeight}/>
            <rect fill={underlayColour} y={underlayY} width="100%" height={underlayHeight}/>
            <rect stroke={'rgba(0,0,0,0.1)'} fill={floorColour} y={ceilingEdgeY} width="100%"
                  height={ceilingEdgeHeight}/>
        </svg>
    )
};

export default CrossSection;