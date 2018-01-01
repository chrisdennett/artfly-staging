// externals
import React, { Component } from "react";
// styles
import './cropAndRotate.css';
// helpers
import * as PhotoHelper from "../../../ImageHelper";
// components
import CuttingBoard from "./CuttingBoard";
import Butt from "../../../../global/Butt/Butt";
import CuttingMat from "./assets/CuttingMat";

class CropAndRotate extends Component {
    constructor() {
        super();

        this.onCropUpdate = this.onCropUpdate.bind(this);
        this.onCanvasSetup = this.onCanvasSetup.bind(this);
        this.onRotateClockwiseClick = this.onRotateClockwiseClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);

        this.state = {
            canvas: null,
            rotation: 1,
            cropData: {
                leftPercent: 0,
                rightPercent: 1,
                topPercent: 0,
                bottomPercent: 1
            }
        };
    }

    componentWillMount() {
        this.drawCuttingBoardCanvas();
    }

    componentWillReceiveProps(nextProps) {
        this.drawCuttingBoardCanvas(nextProps);
        /*let { cropData } = nextProps;

        if (cropData) {
            const { rotation, ...rest } = cropData;
            this.setState({ rotation, cropData: rest });
        }*/

        // default orientation
        /*if (!orientation) orientation = 1;
        // default crop data
        if (!initialCropData) initialCropData = {
            leftPercent: 0,
            rightPercent: 1,
            topPercent: 0,
            bottomPercent: 1
        };

        this.setState({ rotation: orientation, cropData: initialCropData });*/
    }

    onCropUpdate(cropData) {
        this.setState({ cropData });
    }

    onCanvasSetup(canvas) {
        this.setState({ canvas }, () => {
            this.drawCuttingBoardCanvas();
        });

        // const { masterCanvas } = this.props;


        // PhotoHelper.drawToCanvas({ sourceCanvas: masterCanvas, outputCanvas: canvas, orientation: 1 });
    }

    // Cancel current changes
    onCancelClick() {
        this.props.onCancel();
    }

    onDoneClick() {
        const { masterCanvas, sourceImg } = this.props;
        const { rotation, cropData } = this.state;

        /*
         updateArtworkImage(
                                 artworkId,
                                 artistId,
                                 newImg,
                                 widthToHeightRatio,
                                 heightToWidthRatio,
                                 callback = null
                             )
        */
        // update the master canvas and then either save or send back the data to save with
        PhotoHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: masterCanvas,
            orientation: rotation,
            cropPercents: cropData
        }, () => {

            this.props.onDone();
            // TODO: Call the function that will update the image.
            // this shouldn't be called here because other controls
            // will potentially want to also change the image.
            /*this.setState({
                rotation: 1,
                cropData: {
                    leftPercent: 0,
                    rightPercent: 1,
                    topPercent: 0,
                    bottomPercent: 1
                }
            })*/
        })




        /*this.props.onDone({
            rotation,
            leftPercent, rightPercent, topPercent, bottomPercent
        });*/

        /*
         const { canvas, rotation, cropData } = this.state;
         const canvasW = canvas.width;
         const canvasH = canvas.height;

        this.props.onDone({
            canvas: canvas,
            rotation,
            leftX: canvasW * leftPercent, rightX: canvasW * rightPercent, topY: canvasH * topPercent, bottomY: canvasH * bottomPercent,
            leftPercent, rightPercent, topPercent, bottomPercent
        });
        */
    }

    drawCuttingBoardCanvas(props = this.props) {
        const { masterCanvas, width, height, sourceImg } = props;
        const { rotation, canvas } = this.state;

        if (!sourceImg || !width || !canvas) return;

        const cuttingBoardPadding = 40;
        const buttonHeight = 100;
        const maxCuttingBoardWidth = width - (cuttingBoardPadding * 2);
        const maxCuttingBoardHeight = height - (buttonHeight + (cuttingBoardPadding * 2));

        PhotoHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: canvas,
            orientation: rotation,
            maxOutputCanvasWidth: maxCuttingBoardWidth,
            maxOutputCanvasHeight: maxCuttingBoardHeight
        });

        this.setState({ maxCuttingBoardWidth, maxCuttingBoardHeight })
    }

    // Rotate using info from:
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
    onRotateClockwiseClick() {
        const currentRotation = this.state.rotation ? this.state.rotation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const newRotation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.state.cropData;

        const newL = 1 - bottomPercent;
        const newR = 1 - topPercent;
        const newT = leftPercent;
        const newB = rightPercent;

        this.setState({ rotation: newRotation, cropData: { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB } }, () => {
            this.drawCuttingBoardCanvas();
        });

    }

    render() {
        const { width, height, masterCanvas, sourceImg } = this.props;
        const { maxCuttingBoardWidth, maxCuttingBoardHeight } = this.state;

        const { rotation, cropData } = this.state;

        if (!sourceImg) {
            return <div>LOading CanVaS</div>
        }

        return (
            <div className='cropAndRotate--holder'>

                <div className='cropAndRotate--content'>
                    <div className='cropAndRotate--cuttingBoardHolder'>
                        <CuttingBoard
                            masterCanvas={masterCanvas}
                            onCropUpdate={this.onCropUpdate}
                            onCanvasSetup={this.onCanvasSetup}
                            maxWidth={maxCuttingBoardWidth}
                            maxHeight={maxCuttingBoardHeight}
                            rotation={rotation}
                            cropData={cropData}/>
                    </div>
                </div>

                <div className='cropAndRotate--controls'>
                    <Butt inline onClick={this.onRotateClockwiseClick}>ROTATE</Butt>
                    <Butt inline onClick={this.onDoneClick}>DONE</Butt>
                    <Butt inline onClick={this.onCancelClick}>CANCEL</Butt>
                </div>

                <div className='cropAndRotate--cuttingMattHolder'>
                    <CuttingMat width={width} height={height}/>
                </div>

            </div>
        );
    }
}

export default CropAndRotate;