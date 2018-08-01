// externals
import React, { Component } from 'react';
// components
import DragHandle from "./DragHandle";
import DragRectangle from "./DragRectangle";

class CropControls extends Component {

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
        const { width, height, leftX, rightX, topY, bottomY, onRotateClick } = this.props;

        // find the middle for placement of side handles
        const cutoutWidth = rightX - leftX;
        const cutoutHeight = bottomY - topY;
        const middleX = leftX + (cutoutWidth / 2);
        const middleY = topY + (cutoutHeight / 2);

        return (
            <div className='cropAndRotate--cuttingOverlay'>
                <svg width={width} height={height}>
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

                    <g transform={`translate(${middleX - 25}, ${middleY - 25})`} onClick={onRotateClick}>

                        <circle cx={25} cy={25} r={25} fill={'rgba(2,112,85, 1)'}
                                stroke={'none'}/>

                        <g transform={`translate(9, 9)`}>
                            <svg fill="#000000" height="30" width="30" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill={'#d4c63f'}
                                      d="M7.34 6.41L.86 12.9l6.49 6.48 6.49-6.48-6.5-6.49zM3.69 12.9l3.66-3.66L11 12.9l-3.66 3.66-3.65-3.66zm15.67-6.26C17.61 4.88 15.3 4 13 4V.76L8.76 5 13 9.24V6c1.79 0 3.58.68 4.95 2.05 2.73 2.73 2.73 7.17 0 9.9C16.58 19.32 14.79 20 13 20c-.97 0-1.94-.21-2.84-.61l-1.49 1.49C10.02 21.62 11.51 22 13 22c2.3 0 4.61-.88 6.36-2.64 3.52-3.51 3.52-9.21 0-12.72z"/>
                                <path d="M0 0h24v24H0z" stroke='none' fill="none"/>
                            </svg>
                        </g>
                    </g>
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

export default CropControls;