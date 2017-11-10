// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import CuttingOverlay from "./assets/CuttingOverlay";
import Butt from "../global/Butt";
// helper values
const maxImageWidth = 3000;
const maxImageHeight = 3000;

class ImageCuttingBoard extends Component {
    constructor() {
        super();

        this.drawImageToSourceCanvas = this.drawImageToSourceCanvas.bind(this);
        this.rotateClockwise = this.rotateClockwise.bind(this);
        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);

        this.state = { rotation: 0, canvasW: 0, canvasH: 0, leftX: 0, rightX: 0, topY: 0, bottomY: 0 };
    }

    componentDidMount() {
        let cropData = null;

        if (this.props.img) {
            if (this.props.initialCropData) {
                const { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.initialCropData;
                cropData = { leftPercent, rightPercent, topPercent, bottomPercent };
            }

            this.drawImageToSourceCanvas(this.props.img, this.props.defaultOrientation, cropData);
        }
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY) {
        this.setState({ leftX, rightX, topY, bottomY });
    }

    updateCanvas(img, canvasW, canvasH, orientation, isPortrait){
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

    getCropData(cropPercentageData, canvasW, canvasH){
        let newLeftX, newRightX, newTopY, newBottomY;

        if (cropPercentageData) {
            newLeftX = canvasW * cropPercentageData.leftPercent;
            newRightX = canvasW * cropPercentageData.rightPercent;
            newTopY = canvasH * cropPercentageData.topPercent;
            newBottomY = canvasH * cropPercentageData.bottomPercent;
        }
        else {
            newLeftX = 0;
            newRightX = canvasW;
            newTopY = 0;
            newBottomY = canvasH;
        }

        return {leftX: newLeftX, rightX: newRightX, topY: newTopY, bottomY: newBottomY}
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
        const displayWidth = canvasW / 4;
        const displayHeight = canvasH / 4;

        const cropData = this.getCropData(cropPercentageData, displayWidth, displayHeight);
        this.updateCanvas(img, canvasW, canvasH, srcOrientation, isPortrait);

        this.setState({ img, rotation: srcOrientation, displayWidth, displayHeight, canvasW, canvasH, ...cropData });
    }

    // Rotate:
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
    rotateClockwise() {
        const currentRotation = this.state.rotation ? this.state.rotation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 };
        const newRotation = nextRotations[currentRotation] || 6;

        let { displayWidth, displayHeight, leftX, rightX, topY, bottomY } = this.state;

        const currL = leftX / displayWidth;
        const currR = rightX / displayWidth;
        const currT = topY / displayHeight;
        const currB = bottomY / displayHeight;

        this.drawImageToSourceCanvas(this.props.img, newRotation, { leftPercent: 1 - currB, rightPercent: 1 - currT, topPercent: currL, bottomPercent: currR });
    }

    // Cancel current changes
    onCancelClick() {
        this.props.onCancel();
    }

    // On done - return the data needed
    onDoneClick() {
        const { rotation, leftX, rightX, topY, bottomY, canvasW, canvasH, displayWidth, displayHeight } = this.state;

        const leftPercent = leftX / displayWidth;
        const rightPercent = rightX / displayWidth;
        const topPercent = topY / displayHeight;
        const bottomPercent = bottomY / displayHeight;

        this.props.onDone(
            {
                canvas: this.sourceCanvas,
                rotation,
                leftX:canvasW*leftPercent, rightX:canvasW*rightPercent, topY:canvasH*topPercent, bottomY:canvasH*bottomPercent,
                leftPercent, rightPercent, topPercent, bottomPercent
            });
    }

    render() {
        const { leftX, rightX, topY, bottomY, displayWidth, displayHeight } = this.state;
        const cuttingData = { leftX, rightX, topY, bottomY, width:displayWidth, height:displayHeight };

        return (
            <CuttingBoardContainer>
                <h3>Image Cutting Board</h3>


                <CuttingBoard style={{ width: displayWidth, height: displayHeight }}>

                    <CuttingOverlay onChange={this.onCuttingOverlayChange} {...cuttingData}/>
                    <canvas ref={(canvas) => this.sourceCanvas = canvas} style={{width:displayWidth, height:displayHeight}}/>

                </CuttingBoard>

                <Butt onClick={this.rotateClockwise}>ROTATE</Butt>
                <Butt onClick={this.onCancelClick}>CANCEL</Butt>
                <Butt onClick={this.onDoneClick}>DONE</Butt>
            </CuttingBoardContainer>
        );
    }
}

export default ImageCuttingBoard;

const CuttingBoardContainer = styled.div`
    background-color: black;
    padding: 70px 20px 20px 20px;
    position: absolute;
    top:0;
    left:0;
    right: 0;
    z-index: 2000;
    height: 100vw;
`;

const CuttingBoard = styled.div`
    margin: 0 auto;
    position: relative; 
`;
