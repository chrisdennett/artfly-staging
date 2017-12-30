// externals
import React, { Component } from "react";
// helpers
import * as PhotoHelper from "../../../ImageHelper";
// components
import CuttingOverlay from "./assets/CuttingOverlay";

class CuttingBoard extends Component {
    constructor() {
        super();

        this.canvasInit = this.canvasInit.bind(this);
        // this.drawImageToSourceCanvas = this.drawImageToSourceCanvas.bind(this);
        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);
        this.drawToCanvas = this.drawToCanvas.bind(this);

        this.state = { displayWidth: 10, displayHeight: 10 };
    }

    componentDidMount() {
        this.drawToCanvas(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.drawToCanvas(nextProps);
    }

    drawToCanvas(props) {
        const { masterCanvas, rotation, maxWidth, maxHeight  } = props;

        console.log("rotation: ", rotation);

        if (masterCanvas && this.cuttingBoardCanvas) {
            // PhotoHelper.drawCanvasToCanvas(this.cuttingBoardCanvas, displayWidth, displayHeight, masterCanvas, 0, 0, masterCanvas.width, masterCanvas.height);
            PhotoHelper.drawToCanvas(
                {
                    sourceCanvas: masterCanvas,
                    outputCanvas: this.cuttingBoardCanvas,
                    orientation: rotation,
                    maxOutputCanvasWidth:maxWidth,
                    maxOutputCanvasHeight:maxHeight
                },
                () => {
                    this.setState({ displayWidth:this.cuttingBoardCanvas.width, displayHeight:this.cuttingBoardCanvas.height });
                });
        }

        /*if (masterCanvas && this.cuttingBoardCanvas) {
            // PhotoHelper.drawCanvasToCanvas(this.cuttingBoardCanvas, displayWidth, displayHeight, masterCanvas, 0, 0, masterCanvas.width, masterCanvas.height);
            PhotoHelper.drawCanvasToCanvasWithRotation(
                masterCanvas,
                this.cuttingBoardCanvas,
                rotation,
                maxWidth,
                maxHeight,
                () => {
                    this.setState({ displayWidth:this.cuttingBoardCanvas.width, displayHeight:this.cuttingBoardCanvas.height });
                });
        }*/
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY, width, height) {
        if (this.props.onCropUpdate) {
            const leftPercent = leftX / width;
            const rightPercent = rightX / width;
            const topPercent = topY / height;
            const bottomPercent = bottomY / height;

            this.props.onCropUpdate({ leftPercent, rightPercent, topPercent, bottomPercent });
        }
    }

    // converts percentages into actual numbers
    getCropData(w, h) {
        const { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.cropData;
        let newLeftX, newRightX, newTopY, newBottomY;

        newLeftX = w * leftPercent;
        newRightX = w * rightPercent;
        newTopY = h * topPercent;
        newBottomY = h * bottomPercent;

        return { leftX: newLeftX, rightX: newRightX, topY: newTopY, bottomY: newBottomY, width: w, height: h }
    }

    canvasInit(canvas) {
        this.cuttingBoardCanvas = canvas;

        if (this.props.onCanvasSetup) {
            this.props.onCanvasSetup(this.cuttingBoardCanvas);
        }
    }

    render() {
        const { displayWidth, displayHeight } = this.state;

        const cropData = this.getCropData(displayWidth, displayHeight);

        return (
            <div className='cropAndRotate--cuttingBoard'>
                <CuttingOverlay
                    onChange={this.onCuttingOverlayChange}
                    {...cropData}/>

                <canvas ref={this.canvasInit}
                        style={{ boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.4)' }}/>
            </div>
        );
    }
}

export default CuttingBoard;