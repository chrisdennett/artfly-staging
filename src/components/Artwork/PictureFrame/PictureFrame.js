import React, { Component } from "react";
import FrameSection from "./FrameSection/FrameSection";

class PictureFrame extends Component {

    // set up picture with imageWidth, imageHeight, frameThickness, mountThickness
    render() {
        const { frameThickness, mountThickness, imgWidth, imgHeight } = this.props;

        let mountEdgeThickness = 3;
        let frameX = 0;
        let frameY = 0;
        let frameWidth = imgWidth + ((frameThickness + mountThickness) * 2);
        let frameHeight = imgHeight + ((frameThickness + mountThickness) * 2);
        let mountX = frameThickness;
        let mountY = frameThickness;
        let mountWidth = imgWidth + (mountThickness * 2);
        let mountHeight = imgHeight + (mountThickness * 2);
        let imgX = frameThickness + mountThickness;
        let imgY = frameThickness + mountThickness;

        const frameShadowWidth = 2;
        const shadowCol = "rgba(0,0,0,0.6)";
        let viewBoxParams = String(frameX) + " " + String(frameY) + " " + String(frameWidth) + " " + String(frameHeight);

        return (
            <svg width={frameWidth} height={frameHeight}
                 ref="svgRef" key="1" xmlns="http://www.w3.org/2000/svg"
                 viewBox={viewBoxParams}>

                <g>
                    <FrameSection className="frame"
                                  fillColour={"#555555"}
                                  x={frameX}
                                  y={frameY}
                                  width={frameWidth}
                                  height={frameHeight}
                                  bevel={{ top: 0.1, right: 0.3, bottom: 0.5, left: 0.3 }}
                                  thickness={frameThickness}/>

                    <FrameSection className="mount"
                                  fillColour={"#ffffff"}
                                  x={mountX}
                                  y={mountY}
                                  width={mountWidth}
                                  height={mountHeight}
                                  bevel={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                  thickness={mountThickness}/>

                    <FrameSection className="mountEdge"
                                  fillColour={"#ffffff"}
                                  x={imgX - mountEdgeThickness} y={imgY - mountEdgeThickness}
                                  width={imgWidth + (mountEdgeThickness * 2)}
                                  height={imgHeight + (mountEdgeThickness * 2)}
                                  bevel={{ top: 0.2, right: 0.1, bottom: 0.05, left: 0.1 }}
                                  thickness={mountEdgeThickness}/>

                    <rect x={mountX}
                          y={mountY}
                          height={frameShadowWidth}
                          width={mountWidth}
                          fill={shadowCol}/>

                    <rect x={mountX}
                          y={mountY + frameShadowWidth}
                          height={mountHeight - frameShadowWidth}
                          width={frameShadowWidth}
                          fill={shadowCol}/>
                </g>
            </svg>
        );
    }
}

export default PictureFrame;