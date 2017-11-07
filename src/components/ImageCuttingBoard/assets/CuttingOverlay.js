// externals
import React, { Component } from 'react';
// components
import DragHandle from "./DragHandle";

class CuttingOverlay extends Component {

    constructor() {
        super();
        this.onHandleUpdate = this.onHandleUpdate.bind(this);
        this.state = { leftX: 0, topY: 0, rightX:0, bottomY:0 };
    }

    onHandleUpdate(handleName, x, y) {
        let { leftX, rightX, topY, bottomY } = this.state;

        switch (handleName) {
            case 'left':
                leftX = x;
                break;
            case 'right':
                rightX = x;
                break;
            case 'top':
                topY = y;
                break;
            case 'bottom':
                bottomY = y;
                break;
            default:
                break;
        }

        this.setState({ leftX, rightX, topY, bottomY }, () => {
            this.props.onChange(leftX, rightX, topY, bottomY);
        });
    }

    render() {
        let { leftX, rightX, topY, bottomY } = this.state;
        const { width, height } = this.props;

        // setting the width and height
        if(width <= 0 || height <=0) return null;
        if(bottomY <=0 || bottomY > height) bottomY = height;
        if(rightX <=0 || rightX > width) rightX = width;

        // find the middle for placement of side handles
        const cutoutWidth = rightX - leftX;
        const cutoutHeight = bottomY - topY;
        const middleX = leftX + (cutoutWidth / 2);
        const middleY = topY + (cutoutHeight / 2);

        return (
            <div>
                <svg width={width} height={height} style={{ position: 'absolute' }}>
                    <defs>
                        <mask id="hole">
                            <rect width={width} height={height} fill="white"/>
                            <rect x={leftX}
                                  y={topY}
                                  width={cutoutWidth}
                                  height={cutoutHeight}
                                  fill="black"/>
                        </mask>
                    </defs>

                    <rect fill={'rgba(0,0,0,0.7)'} width={width} height={height} mask="url(#hole)"/>
                </svg>

                <DragHandle id={'left'}
                            axis={'x'}
                            maxX={width}
                            startX={1}
                            startY={middleY}
                            colour={'#ff00ff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'right'}
                            axis={'x'}
                            maxX={width}
                            startX={rightX}
                            startY={middleY}
                            colour={'#ff0000'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'top'}
                            axis={'y'}
                            maxY={height}
                            startX={middleX}
                            startY={1}
                            colour={'#0000ff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'bottom'}
                            axis={'y'}
                            maxY={height}
                            startX={middleX}
                            startY={bottomY}
                            colour={'#00ff00'}
                            onHandleUpdate={this.onHandleUpdate}/>
            </div>
        )
    }
}

export default CuttingOverlay;