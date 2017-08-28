import React, {Component} from "react";

class FrameSection extends Component {

    render() {

        const fillColour = this.props.fillColour;
        const bevel = this.props.bevel;
        const x = this.props.x;
        const y = this.props.y;
        const width = this.props.width;
        const height = this.props.height;
        const thickness = this.props.thickness;

        // Colours. TODO: if there it's zero don't add the polygon at all
        const topCol = "rgba(0,0,0,"+bevel.top+")";
        const rightCol = "rgba(0,0,0,"+bevel.right+")";
        const bottomCol = "rgba(0,0,0,"+bevel.bottom+")";
        const leftCol = "rgba(0,0,0,"+bevel.left+")";

        // LEFT
        const lTopLeft =     {   x:x,                   y:y                     };
        const lTopRight =    {   x:x+thickness,         y:y+thickness           };
        const lBottomLeft =  {   x:x,                   y:y+height              };
        const lBottomRight = {   x:x+thickness,         y:y+height-thickness    };

        // TOP
        const tTopLeft =     {   x:x,                   y:y                     };
        const tTopRight =    {   x:x+width,             y:y                     };
        const tBottomLeft =  {   x:x+thickness,         y:y+thickness           };
        const tBottomRight = {   x:x+width-thickness,   y:y+thickness           };

        // BOTTOM
        const bTopLeft =     {   x:x+thickness,         y:y+height-thickness    };
        const bTopRight =    {   x:x+width-thickness,   y:y+height-thickness    };
        const bBottomLeft =  {   x:x,                   y:y+height              };
        const bBottomRight = {   x:x+width,             y:y+height              };

        // RIGHT
        const rTopLeft =     {   x:x+width-thickness,   y:y+thickness           };
        const rTopRight =    {   x:x+width,             y:y                     };
        const rBottomLeft =  {   x:x+width-thickness,   y:y+height-thickness    };
        const rBottomRight = {   x:x+width,             y:y+height              };

        return (
            <g>
                <rect fill={fillColour} x={x} y={y} width={width} height={height} />

                <polyline fill={leftCol} points={
                    lTopLeft.x       + " " + lTopLeft.y       + " " +
                    lTopRight.x      + " " + lTopRight.y      + " " +
                    lBottomRight.x   + " " + lBottomRight.y   + " " +
                    lBottomLeft.x    + " " + lBottomLeft.y    + " "
                }/>
                <polyline fill={topCol} points={
                    tTopLeft.x       + " " + tTopLeft.y       + " " +
                    tTopRight.x      + " " + tTopRight.y      + " " +
                    tBottomRight.x   + " " + tBottomRight.y   + " " +
                    tBottomLeft.x    + " " + tBottomLeft.y    + " "
                }/>
                <polyline fill={bottomCol} points={
                    bTopLeft.x       + " " + bTopLeft.y       + " " +
                    bTopRight.x      + " " + bTopRight.y      + " " +
                    bBottomRight.x   + " " + bBottomRight.y   + " " +
                    bBottomLeft.x    + " " + bBottomLeft.y    + " "
                }/>
                <polyline fill={rightCol} points={
                    rTopLeft.x       + " " + rTopLeft.y       + " " +
                    rTopRight.x      + " " + rTopRight.y      + " " +
                    rBottomRight.x   + " " + rBottomRight.y   + " " +
                    rBottomLeft.x    + " " + rBottomLeft.y    + " "
                }/>
            </g>
        );
    }
}

export default FrameSection;