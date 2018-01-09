import React from 'react';

const Wall = function ({width, height}) {
    const wall = { fill: "#e0ded1" };
    const wallPattern = { fill: "url(#WallPattern)" };

    return (
        <svg width={width} height={height}>

            <defs>
                <pattern id="WallPattern"
                         width="60" height="27"
                         patternUnits="userSpaceOnUse">

                    <path fill="rgba(0,0,0,0.07)"
                          d="M336,687c-1,0-1-1-1-2V675h15V659H290v15h14v10l-2,2h34Zm11-14H322a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,347,673Zm-30,0H292a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,317,673Zm15,14H307a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,332,687Z"
                          transform="translate(-290 -659)"/>
                </pattern>
            </defs>

            <rect style={wall} x="0" y="0" width={'100%'} height={'100%'}/>

            <rect style={wallPattern} x="0" y="0" width="100%" height="100%"/>
        </svg>
    );
};

export default Wall;