// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import SelectPhotoButton from "./assets/SelectPhotoButton";
import CuttingOverlay from "./assets/CuttingOverlay";
import Butt from "../global/Butt";
// helper functions
import GetPhotoOrientation from './assets/GetPhotoOrientation';

class ImageCuttingBoard extends Component {
    constructor() {
        super();

        this.drawImageToSourceCanvas = this.drawImageToSourceCanvas.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.drawOutputImage = this.drawOutputImage.bind(this);
        this.rotateClockwise = this.rotateClockwise.bind(this);
        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);

        this.state = { img: null, rotation: 0, canvasW: 0, canvasH: 0 };
    }

    // ************
    // JUST HERE FOR TESTING - DELETE OR COMMENT OUT FOR PRODUCTION
    __loadDevImageForTesting() {
        const img = this.refs.sourceImg;
        img.onload = (e) => {
            this.drawImageToSourceCanvas(e.target, 0, () => {
                this.drawOutputImage();
            });
        }
    }

    componentDidMount() {
        // ************
        // JUST HERE FOR TESTING - DELETE OR COMMENT OUT FOR PRODUCTION
        this.__loadDevImageForTesting();
        // ************
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY) {
        this.drawOutputImage(leftX, rightX, topY, bottomY);
    }

    // Photo has been selected
    onPhotoSelected(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];

            GetPhotoOrientation(imgFile, (orientation) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgSrc = e.target.result;
                    let img = new Image();
                    img.src = imgSrc;

                    img.onload = (e) => this.drawImageToSourceCanvas(e.target, orientation, this.drawOutputImage);
                };

                reader.readAsDataURL(imgFile);
            });
        }
    }

    // Reset image - clears state so handles re-align properly
    resetImageState(callback) {
        this.setState({ canvasW: 0, canvasH: 0 }, () => {
            callback();
        });
    }

    // Draw the source image into the source canvas
    drawImageToSourceCanvas(img, srcOrientation, callback = null) {
        // reset image before updating to ensure handles re-align properly
        this.resetImageState(() => {
            const isPortrait = srcOrientation > 4 && srcOrientation < 9;
            const { sourceCanvas } = this.refs;
            const ctx = sourceCanvas.getContext('2d');
            ctx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);

            const imgW = isPortrait ? img.height : img.width;
            const imgH = isPortrait ? img.width : img.height;

            let maxW = 800;
            let maxH = 600;

            const wToHRatio = imgH / imgW;
            const hToWRatio = imgW / imgH;

            // don't expand images(?)
            // let maxW = imgH > 800 ? 800 : imgH;
            // let maxH = imgW > 600 ? 600 : imgW;

            let canvasW = maxW;
            let canvasH = maxW * wToHRatio;

            if (canvasH > maxH) {
                canvasH = maxH;
                canvasW = maxH * hToWRatio;
            }

            sourceCanvas.width = canvasW;
            sourceCanvas.height = canvasH;

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

            this.setState({ img, rotation: srcOrientation, canvasW, canvasH, rightX: canvasW, bottomY: canvasH }, () => {
                if (callback) {
                    callback();
                }
            });
        });
    }

    // Draw cropped image to canvas
    drawOutputImage(leftX, rightX, topY, bottomY) {
        const { sourceCanvas, outputCanvas } = this.refs;
        const outputContext = outputCanvas.getContext('2d');

        const sourceWidth = rightX - leftX;
        const sourceHeight = bottomY - topY;

        const outputX = 0;
        const outputY = 0;
        const outputWidth = sourceWidth / 2;
        const outputHeight = sourceHeight / 2;

        outputCanvas.width = outputWidth;
        outputCanvas.height = outputHeight;

        outputContext.drawImage(sourceCanvas, leftX, topY, sourceWidth, sourceHeight, outputX, outputY, outputWidth, outputHeight);
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

        this.drawImageToSourceCanvas(this.state.img, newRotation, () => {
            this.drawOutputImage();
        });
    }

    // NB the conditional rendering is a bit of a hack to make sure the cutting overlay remounts after image load or rotation
    render() {
        return (
            <CuttingBoardContainer>

                <SelectPhotoButton
                    onPhotoSelect={this.onPhotoSelected}/>

                <CuttingBoard style={{ width: this.state.canvasW, height: this.state.canvasH }}>

                    {this.state.canvasW &&
                    <CuttingOverlay onChange={this.onCuttingOverlayChange}
                                    height={this.state.canvasH}
                                    width={this.state.canvasW}/>
                    }

                    <canvas ref="sourceCanvas"/>

                </CuttingBoard>

                <Butt onClick={this.rotateClockwise}>ROTATE</Butt>

                <div style={{ marginTop: 100 }}>
                    <hr/>
                    <h2>Dev stuff</h2>
                    <h3>Image output</h3>
                    <canvas ref={'outputCanvas'}/>
                    <hr/>
                    <h3>Source image</h3>
                    <img ref={'sourceImg'} src={'gallery-example.PNG'} alt={'sample'}/>
                </div>
            </CuttingBoardContainer>
        );
    }
}

export default ImageCuttingBoard;

const CuttingBoardContainer = styled.div`
    background-color: black;
    padding: 70px 20px 20px 20px;
`;

const CuttingBoard = styled.div`
    margin: 0 auto;
    position: relative; 
`;
