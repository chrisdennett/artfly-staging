// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import CuttingOverlay from "./assets/CuttingOverlay";
import Butt from "../global/Butt";

const maxImageWidth = 800;
const maxImageHeight = 600;

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
        if (this.props.img) {

            if (this.props.initialCropData) {
                const { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.initialCropData;
                this.drawImageToSourceCanvas(this.props.img, this.props.defaultOrientation, { leftPercent, rightPercent, topPercent, bottomPercent });
            }
            else {
                this.drawImageToSourceCanvas(this.props.img, this.props.defaultOrientation);
            }

        }
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY) {
        this.setState({ leftX, rightX, topY, bottomY });
    }

    // Reset image - clears state so handles re-align properly
    resetImageState(callback) {
        this.setState({ canvasW: 0, canvasH: 0 }, () => {
            callback();
        });
    }

    // Draw the source image into the source canvas
    drawImageToSourceCanvas(img, srcOrientation, cropPercentageData) {
        // reset image before updating to ensure handles re-align properly
        this.resetImageState(() => {
            const isPortrait = srcOrientation > 4 && srcOrientation < 9;
            const ctx = this.sourceCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.sourceCanvas.width, this.sourceCanvas.height);

            const imgW = isPortrait ? img.height : img.width;
            const imgH = isPortrait ? img.width : img.height;

            // This is the maximum image size allowed
            const maxW = maxImageWidth;
            const maxH = maxImageHeight;
            // Alternative > don't expand images(?)
            // const maxW = imgW >= maxImageWidth ? maxImageWidth : imgW;
            // const maxH = imgH >= maxImageHeight ? maxImageHeight : imgH;

            const wToHRatio = imgH / imgW;
            const hToWRatio = imgW / imgH;

            let canvasW = maxW;
            let canvasH = maxW * wToHRatio;

            if (canvasH > maxH) {
                canvasH = maxH;
                canvasW = maxH * hToWRatio;
            }

            this.sourceCanvas.width = canvasW;
            this.sourceCanvas.height = canvasH;

            // save the context so it can be reset after transform
            ctx.save();
            // transform context before drawing image
            switch (srcOrientation) {
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

            // what do you multiply the width by to get the height
            //const widthToHeightScale = canvasH / canvasW;
            // what do you multiply the height by to get the width
            // const heightToWidthScale = canvasW / canvasH;

            /*const scaledCanvasWidth = 800;
            const scaledCanvasHeight = scaledCanvasWidth * widthToHeightScale;
            const scaleDownFactor = scaledCanvasWidth / canvasW;
            const scaleUpFactor = canvasW / scaledCanvasWidth;*/

            this.setState({ img, rotation: srcOrientation, canvasW, canvasH, leftX: newLeftX, rightX: newRightX, topY: newTopY, bottomY: newBottomY });
        });
    }

    // Rotate
    rotateClockwise() {
        let newRotation;

        switch (this.state.rotation) {
            case 0:
                newRotation = 6;
                break;
            case 6:
                newRotation = 3;
                break;
            case 3:
                newRotation = 8;
                break;
            case 8:
                newRotation = 0;
                break;
            default:
                newRotation = 6;
                break;
        }

        const { canvasW, canvasH, leftX, rightX, topY, bottomY } = this.state;
        const currL = leftX / canvasW;
        const currR = rightX / canvasW;
        const currT = topY / canvasH;
        const currB = bottomY / canvasH;

        this.drawImageToSourceCanvas(this.props.img, newRotation, { leftPercent: 1 - currB, rightPercent: 1 - currT, topPercent: currL, bottomPercent: currR });
    }

    onCancelClick() {
        this.props.onCancel();
    }

    onDoneClick() {
        const { rotation, leftX, rightX, topY, bottomY } = this.state;

        const leftPercent = leftX / this.state.canvasW;
        const rightPercent = rightX / this.state.canvasW;
        const topPercent = topY / this.state.canvasH;
        const bottomPercent = bottomY / this.state.canvasH;

        this.props.onDone({ canvas: this.sourceCanvas, rotation, leftX, rightX, topY, bottomY, leftPercent, rightPercent, topPercent, bottomPercent });
    }

    // NB the conditional rendering is a bit of a hack to make sure the cutting overlay remounts after image load or rotation
    render() {
        const { leftX, rightX, topY, bottomY } = this.state;

        return (
            <CuttingBoardContainer>

                <CuttingBoard style={{ width: this.state.canvasW, height: this.state.canvasH }}>

                    {this.state.canvasW &&
                    <CuttingOverlay onChange={this.onCuttingOverlayChange}
                                    initialCropData={{ leftX, rightX, topY, bottomY }}
                                    height={this.state.canvasH}
                                    width={this.state.canvasW}/>
                    }

                    <canvas ref={(canvas) => this.sourceCanvas = canvas}/>

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
