// externals
import React, { Component } from 'react';
// components
import DragHandle from "./DragHandle";
import DragRectangle from "./DragRectangle";

class CuttingOverlay extends Component {

    constructor() {
        super();

        this.onHandleUpdate = this.onHandleUpdate.bind(this);
        this.onRectDrag = this.onRectDrag.bind(this);
    }

    onRectDrag(leftX, rightX, topY, bottomY) {
        const { width, height } = this.props;
        this.props.onChange(leftX, rightX, topY, bottomY, width, height);
    }

    onHandleUpdate(handleName, x, y) {
        let { width, height, leftX, rightX, topY, bottomY } = this.props;

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

            case 'top-left':
                leftX = x;
                topY = y;
                break;

            case 'top-right':
                rightX = x;
                topY = y;
                break;

            case 'bottom-left':
                leftX = x;
                bottomY = y;
                break;

            case 'bottom-right':
                rightX = x;
                bottomY = y;
                break;

            default:
                break;
        }

        this.props.onChange(leftX, rightX, topY, bottomY, width, height);
    }

    render() {
        const { width, height, leftX, rightX, topY, bottomY } = this.props;

        // find the middle for placement of side handles
        const cutoutWidth = rightX - leftX;
        const cutoutHeight = bottomY - topY;
        const middleX = leftX + (cutoutWidth / 2);
        const middleY = topY + (cutoutHeight / 2);

        return (
            <div className='cropAndRotate--cuttingOverlay'>
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

                    <DragRectangle position={{ x: leftX, y: topY }} width={cutoutWidth} height={cutoutHeight}
                                   onHandleUpdate={this.onRectDrag}
                                   bounds={{ left: 0, right: width - cutoutWidth, top: 0, bottom: height - cutoutHeight }}/>

                </svg>

                <DragHandle id={'top-left'}
                            bounds={{ left: 0, right: rightX - 50, top: 0, bottom: bottomY - 50 }}
                            position={{ x: leftX, y: topY }}
                            colour={'#7dbaff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'top-right'}
                            bounds={{ left: leftX + 50, right: width, top: 0, bottom: bottomY - 50 }}
                            position={{ x: rightX, y: topY }}
                            colour={'#7dbaff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'bottom-left'}
                            bounds={{ left: 0, right: rightX - 50, top: topY + 50, bottom: height }}
                            position={{ x: leftX, y: bottomY }}
                            colour={'#7dbaff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'bottom-right'}
                            bounds={{ left: leftX + 50, right: width, top: topY + 50, bottom: height }}
                            position={{ x: rightX, y: bottomY }}
                            colour={'#7dbaff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'left'}
                            axis={'x'}
                            bounds={{ left: 0, right: rightX - 50, top: 0, bottom: height }}
                            position={{ x: leftX, y: middleY }}
                            colour={'#ff00ff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'right'}
                            axis={'x'}
                            bounds={{ left: leftX + 50, right: width, top: 0, bottom: height }}
                            position={{ x: rightX, y: middleY }}
                            colour={'#ff0000'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'top'}
                            axis={'y'}
                            bounds={{ left: 0, right: width, top: 0, bottom: bottomY - 50 }}
                            position={{ x: middleX, y: topY }}
                            colour={'#0000ff'}
                            onHandleUpdate={this.onHandleUpdate}/>

                <DragHandle id={'bottom'}
                            axis={'y'}
                            bounds={{ left: 0, right: width, top: topY + 50, bottom: height }}
                            position={{ x: middleX, y: bottomY }}
                            colour={'#00ff00'}
                            onHandleUpdate={this.onHandleUpdate}/>
            </div>
        )
    }
}

export default CuttingOverlay;