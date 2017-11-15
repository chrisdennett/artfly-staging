// externals
import React, { Component } from "react";
// import styled from 'styled-components';
// components
import CuttingOverlay from "./assets/CuttingOverlay";
// helper values
const maxImageWidth = 3000;
const maxImageHeight = 3000;

class CuttingBoard extends Component {
    constructor() {
        super();

        this.canvasInit = this.canvasInit.bind(this);
        this.drawImageToSourceCanvas = this.drawImageToSourceCanvas.bind(this);
        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);

        this.state = { displayWidth: 10, displayHeight: 10 };
    }

    componentDidMount() {
        if (this.props.img && this.sourceCanvas) {
            this.drawImageToSourceCanvas(this.props.img, this.props.rotation, this.props.cropData);
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.rotation !== nextProps.rotation) {
            this.drawImageToSourceCanvas(nextProps.img, nextProps.rotation, nextProps.cropData);
        }
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY) {
        //this.setState({ leftX, rightX, topY, bottomY });

        if (this.props.onCropUpdate) {
            const { displayWidth, displayHeight } = this.state;

            const leftPercent = leftX / displayWidth;
            const rightPercent = rightX / displayWidth;
            const topPercent = topY / displayHeight;
            const bottomPercent = bottomY / displayHeight;

            this.props.onCropUpdate({ leftPercent, rightPercent, topPercent, bottomPercent });
        }
    }

    // Draw the source image into the source canvas
    // gets called by parent when mounted and then by rotation function
    drawImageToSourceCanvas(img, srcOrientation, cropPercentageData) {
        const isPortrait = srcOrientation > 4 && srcOrientation < 9;

        const imgW = isPortrait ? img.height : img.width;
        const imgH = isPortrait ? img.width : img.height;

        // Restrict to maximum image size allowed or img size, whichever is smaller
        const maxW = imgW >= maxImageWidth ? maxImageWidth : imgW;
        const maxH = imgH >= maxImageHeight ? maxImageHeight : imgH;

        const wToHRatio = imgH / imgW;
        const hToWRatio = imgW / imgH;

        let canvasW = maxW;
        let canvasH = maxW * wToHRatio;

        if (canvasH > maxH) {
            canvasH = maxH;
            canvasW = maxH * hToWRatio;
        }

        // TODO: this needs to make the canvas fit
        const { maxWidth, maxHeight } = this.props;
        let displayWidth = maxWidth;
        let displayHeight = displayWidth * wToHRatio;

        if (displayHeight > maxHeight) {
            displayHeight = maxHeight;
            displayWidth = displayHeight * hToWRatio;
        }

        this.setState({ displayWidth, displayHeight }, () => {
            this.updateCanvas(img, canvasW, canvasH, srcOrientation, isPortrait);
        });
    }

    updateCanvas(img, canvasW, canvasH, orientation, isPortrait) {
        const ctx = this.sourceCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.sourceCanvas.width, this.sourceCanvas.height);

        this.sourceCanvas.width = canvasW;
        this.sourceCanvas.height = canvasH;

        // save the context so it can be reset after transform
        ctx.save();
        // transform context before drawing image
        switch (orientation) {
            case 2:
                ctx.transform(-1, 0, 0, 1, canvasH, 0);
                break;
            case 3:
                ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
                break;
            case 4:
                ctx.transform(1, 0, 0, -1, 0, canvasW);
                break;
            case 5:
                ctx.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                ctx.transform(0, 1, -1, 0, canvasW, 0);
                break;
            case 7:
                ctx.transform(0, -1, -1, 0, canvasW, canvasH);
                break;
            case 8:
                ctx.transform(0, -1, 1, 0, 0, canvasH);
                break;
            default:
                break;
        }

        const transformedCanvasW = isPortrait ? canvasH : canvasW;
        const transformedCanvasH = isPortrait ? canvasW : canvasH;

        // draw image
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, transformedCanvasW, transformedCanvasH);
        // restore ensures resets transform in case another image is added
        ctx.restore();
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
        const { displayWidth, displayHeight } = this.state;
        const cropData = this.getCropData(displayWidth, displayHeight);

        return (
            <div>
                <CuttingOverlay
                    onChange={this.onCuttingOverlayChange}
                    {...cropData}/>

                <canvas ref={this.canvasInit}
                        style={{ width: displayWidth, height: displayHeight }}/>
            </div>
        );
    }
}

export default CuttingBoard;