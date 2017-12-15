// externals
import React, { Component } from "react";
// helpers
import * as PhotoHelper from "../PhotoEditor/assets/PhotoHelper";
// components
import CuttingOverlay from "./assets/CuttingOverlay";
// static values
const maxImageWidth = 3000;
const maxImageHeight = 3000;

class CuttingBoard extends Component {
    constructor() {
        super();

        this.canvasInit = this.canvasInit.bind(this);
        this.getImage = this.getImage.bind(this);
        this.drawImageToSourceCanvas = this.drawImageToSourceCanvas.bind(this);
        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);

        this.state = { displayWidth: 10, displayHeight: 10 };
    }

    componentDidMount() {
        if (this.sourceCanvas) {
            this.getImage(this.props, (img) => {
                this.drawImageToSourceCanvas(img, this.props.rotation);
            });
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.rotation !== nextProps.rotation) {
            this.getImage(nextProps, (img) => {
                this.drawImageToSourceCanvas(img, nextProps.rotation);
            });
        }
    }

    getImage(props, callback) {
        if (props.img) {
            callback(props.img);
        }
        else if (props.imgUrl) {
            PhotoHelper.LoadImage(props.imgUrl, (img) => {
                callback(img);
            })
        }
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

    // Draw the source image into the source canvas
    // gets called by parent when mounted and then by rotation function
    drawImageToSourceCanvas(img, srcOrientation) {
        PhotoHelper.drawImageToCanvas(img, this.sourceCanvas, srcOrientation, maxImageWidth, maxImageHeight, (widthToHeightRatio, heightToWidthRatio) => {
            this.setState({ widthToHeightRatio, heightToWidthRatio });
        })
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
        this.sourceCanvas = canvas;

        if (this.props.onCanvasSetup) {
            this.props.onCanvasSetup(this.sourceCanvas);
        }
    }

    render() {
        const { widthToHeightRatio = 1, heightToWidthRatio = 1 } = this.state;
        const { maxWidth, maxHeight } = this.props;
        let displayWidth = maxWidth;
        let displayHeight = displayWidth * widthToHeightRatio;

        if (displayHeight > maxHeight) {
            displayHeight = maxHeight;
            displayWidth = displayHeight * heightToWidthRatio;
        }

        const cropData = this.getCropData(displayWidth, displayHeight);

        return (
            <div style={{ width: displayWidth, height: displayHeight }}>
                <CuttingOverlay
                    onChange={this.onCuttingOverlayChange}
                    {...cropData}/>

                <canvas ref={this.canvasInit}
                        style={{ width: displayWidth, height: displayHeight, boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.4)' }}/>
            </div>
        );
    }
}

export default CuttingBoard;