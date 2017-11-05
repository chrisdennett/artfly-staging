// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import DragHandle from "./assets/DragHandle";
import SelectPhotoButton from "./assets/SelectPhotoButton";

class ImageCuttingBoard extends Component {
    constructor(props) {
        super(props);

        this.onHandleUpdate = this.onHandleUpdate.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.getOrientation = this.getOrientation.bind(this);
        this.drawOutputImage = this.drawOutputImage.bind(this);

        this.state = { canvasW: 0, canvasH: 0, leftX: 0, rightX: 0, topY: 0, bottomY: 0 };
    }

    // ************
    // JUST HERE FOR TESTING - DELETE OR COMMENT OUT FOR PRODUCTION
    __loadDevImageForTesting() {
        const img = this.refs.sourceImg;
        img.onload = (e) => {
            this.onImageLoad(e.target, -1, () => {
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

    // Update on Handle move
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
            this.drawOutputImage();
        });
    }

    // Photo has been selected
    onPhotoSelected(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];

            this.getOrientation(imgFile, (orientation) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgSrc = e.target.result;
                    let img = new Image();
                    img.src = imgSrc;

                    img.onload = (e) => this.onImageLoad(e.target, orientation, this.drawOutputImage);
                };

                reader.readAsDataURL(imgFile);
            });
        }
    }

    // Reads file as Array buffer to get camera orientation
    getOrientation(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const view = new DataView(e.target.result);

            if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                let marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    offset += 2;
                    if (view.getUint32(offset, false) !== 0x45786966) return callback(-1);

                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) === 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) !== 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    // Reset image
    resetImageState(callback){
        this.setState({ canvasW: 0, canvasH: 0, leftX: 0, rightX: 0, topY: 0, bottomY: 0 }, () => {
           callback();
        });
    }

    // Image loaded into client
    onImageLoad(img, srcOrientation, callback = null) {
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
                    ctx.transform(-1, 0, 0, -1, canvasH, canvasW);
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

            this.setState({ canvasW, canvasH, rightX: canvasW, bottomY: canvasH }, () => {
                if (callback) {
                    callback();
                }
            });
        });
    }

    // Draw cropped image to canvas
    drawOutputImage() {
        const { leftX, rightX, topY, bottomY } = this.state;
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

    render() {
        // find the middle for placement of side handles
        const middleX = this.state.leftX + (this.state.rightX - this.state.leftX) / 2;
        const middleY = this.state.topY + (this.state.bottomY - this.state.topY) / 2;

        return (
            <CuttingBoardContainer>

                <SelectPhotoButton
                    onPhotoSelect={this.onPhotoSelected}/>

                <CuttingBoard style={{ width: this.state.canvasW, height: this.state.canvasH }}>

                    <svg width={this.state.canvasW} height={this.state.canvasH} style={{position: 'absolute'}}>
                        <defs>
                            <mask id="hole">
                                <rect width="100%" height="100%" fill="white"/>
                                <rect x={this.state.leftX}
                                      y={this.state.topY}
                                      width={this.state.rightX-this.state.leftX}
                                      height={this.state.bottomY-this.state.topY}
                                      fill="black"/>
                            </mask>
                        </defs>

                        <rect fill={'rgba(0,0,0,0.4)'} x="0" y="0" width={this.state.canvasW} height={this.state.canvasW} mask="url(#hole)" />
                    </svg>

                    <DragHandle id={'left'}
                                axis={'x'}
                                maxX={this.state.canvasW}
                                startX={1}
                                startY={middleY}
                                colour={'#ff00ff'}
                                onHandleUpdate={this.onHandleUpdate}/>

                    <DragHandle id={'right'}
                                axis={'x'}
                                maxX={this.state.canvasW}
                                startX={this.state.canvasW}
                                startY={middleY}
                                colour={'#ff0000'}
                                onHandleUpdate={this.onHandleUpdate}/>

                    <DragHandle id={'top'}
                                axis={'y'}
                                maxY={this.state.canvasH}
                                startX={middleX}
                                startY={1}
                                colour={'#0000ff'}
                                onHandleUpdate={this.onHandleUpdate}/>

                    <DragHandle id={'bottom'}
                                axis={'y'}
                                maxY={this.state.canvasH}
                                startX={middleX}
                                startY={this.state.canvasH}
                                colour={'#00ff00'}
                                onHandleUpdate={this.onHandleUpdate}/>





                    <canvas ref="sourceCanvas"/>
                </CuttingBoard>

                <div>
                    <h2>Dev stuff</h2>
                    <hr/>
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
    background: rgba(0,0,0,0.2);
    padding: 20px;
`;

const CuttingBoard = styled.div`
    background-color: #931f84;
    margin: 0 auto;
    position: relative; 
    
    canvas{
        outline: #fff 1px solid;
    }
`;
