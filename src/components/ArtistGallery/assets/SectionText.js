import React from 'react';

const SectionText = function ({lowlight, highlight, featureColour, x, y, text, fontSize, shadingOffset}) {

    const upperCaseText = text.toUpperCase();

    return (
        <g>
            <text y={y+shadingOffset} x={x+shadingOffset} fill={lowlight}>
                <tspan style={{textAlign:"center"}} fontWeight="900" fontSize={fontSize} fontFamily="'Source Code Pro'" textAnchor="middle">
                    {upperCaseText}
                </tspan>
            </text>
            <text y={y-shadingOffset} x={x-shadingOffset} fill={highlight}>
                <tspan style={{textAlign:"center"}} fontWeight="900" fontSize={fontSize} fontFamily="'Source Code Pro'" textAnchor="middle">
                    {upperCaseText}
                </tspan>
            </text>
            <text y={y} x={x} fill={featureColour}>
                <tspan style={{textAlign:"center"}} fontWeight="900" fontSize={fontSize} fontFamily="'Source Code Pro'" textAnchor="middle">
                    {upperCaseText}
                </tspan>
            </text>
        </g>
    )
};

export default SectionText;