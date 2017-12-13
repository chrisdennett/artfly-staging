import React, { Component } from "react";
import SkirtingBoard from "../assets/SkirtingBoard";

class Room extends Component {

    render() {
        const { width, height, spaceBelowPicture } = this.props;

        const wall = { fill: "#e0ded1" };
        const wallPattern = { fill: "url(#WallPattern)" };
        const floor = { fill: "url(#floorPattern)" };
        const floorColour = { fill: "#c49e71" };
        const floorPatternStyle = { fill: "#ad8b65" };

        const viewBoxParams = "0 0 " + String(width) + " " + String(height);

        const maxPercentageTakenUpBySkirting = 0.3;
        const maxSkirtingHeight = 34;
        const minGapPercent = 0.3;

        let skirtingHeight = spaceBelowPicture * maxPercentageTakenUpBySkirting;
        if(skirtingHeight > maxSkirtingHeight) skirtingHeight = maxSkirtingHeight;

        const gapBetweenPictureAndSkirting = spaceBelowPicture * minGapPercent;

        const skirtingTop = height - (spaceBelowPicture - gapBetweenPictureAndSkirting);
        const floorY = skirtingTop + skirtingHeight;
        const floorHeight = height - floorY;

        return (
            <svg className="svgBg" width={'100%'} height={'100%'} key="1" xmlns="http://www.w3.org/2000/svg"
                 viewBox={viewBoxParams}>

                <defs>
                    <pattern id="WallPattern"
                             width="60" height="27"
                             patternUnits="userSpaceOnUse">

                        <path fill="rgba(0,0,0,0.07)"
                              d="M336,687c-1,0-1-1-1-2V675h15V659H290v15h14v10l-2,2h34Zm11-14H322a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,347,673Zm-30,0H292a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,317,673Zm15,14H307a2,2,0,0,1-2-2v-9a2,2,0,0,1,2-2h25a2,2,0,0,1,2,2v9A2,2,0,0,1,332,687Z"
                              transform="translate(-290 -659)"/>
                    </pattern>

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

                <rect style={wall} x="0" y="0" width={width} height={height}/>

                <rect style={wallPattern} x="0" y="0" width="100%" height="100%"/>

                <rect style={floor} x="0" y={floorY} width="100%" height={floorHeight}/>

                <SkirtingBoard top={skirtingTop} height={skirtingHeight}/>

            </svg>
        );
    }
}

export default Room;