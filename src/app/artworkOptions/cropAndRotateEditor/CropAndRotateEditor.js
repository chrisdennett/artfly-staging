// externals
import React, { Component } from "react";
import faRedo from '@fortawesome/fontawesome-pro-solid/faRedo';
import faTimes from '@fortawesome/fontawesome-pro-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-pro-solid/faCheck';
// styles
import './cropAndRotate_styles.css';
// helpers
import * as ImageHelper from "../../global/ImageHelper";
// components
import QuickCuttingBoard from "./QuickCuttingBoard";
import QuickCuttingMat from "../quickCuttingMat/QuickCuttingMat";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";

class CropAndRotateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {localOrientation:1, localCropData:null};

        this.onCropUpdate = this.onCropUpdate.bind(this);
        this.onCanvasSetup = this.onCanvasSetup.bind(this);
        this.onRotateClockwiseClick = this.onRotateClockwiseClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);
    }

    componentWillMount() {
        // set crop data and rotation to default or values set be parents
        const { artworkData } = this.props;
        const { cropData, orientation } = artworkData;

        this.setState({ localCropData:cropData, localOrientation:orientation })
    }

    onCropUpdate(cropData) {
        this.setState({ localCropData:cropData });
    }

    onCanvasSetup(canvas) {
        this.setState({ canvas }, () => {
            this.drawCuttingBoardCanvas();
        });
    }

    // Cancel current changes
    onCancelClick() {
        this.props.onCancel();
    }

    onDoneClick() {
        const { localCropData:cropData, localOrientation:orientation } = this.state;

        this.props.onDone({ orientation, cropData });
    }

    drawCuttingBoardCanvas(props = this.props) {
        const { width, height, sourceImg } = props;
        const { localOrientation:orientation, canvas } = this.state;

        if (!sourceImg || !width || !canvas) return;

        const paddingTop = 20;
        const paddingSide = 40;
        const spaceForButtons = 112;
        const maxCuttingBoardWidth = width - (paddingSide * 2);
        const maxCuttingBoardHeight = height - (spaceForButtons + paddingTop);

        ImageHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: canvas,
            orientation: orientation,
            maxOutputCanvasWidth: maxCuttingBoardWidth,
            maxOutputCanvasHeight: maxCuttingBoardHeight
        });

        // this isn't needed for any other reason than to trigger a redraw
        this.setState({ maxCuttingBoardWidth, maxCuttingBoardHeight })
    }

    // Rotate using info from:
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
    onRotateClockwiseClick() {
        const currentRotation = this.state.localOrientation ? this.state.localOrientation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const newOrientation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.state.localCropData;

        const newL = 1 - bottomPercent;
        const newR = 1 - topPercent;
        const newT = leftPercent;
        const newB = rightPercent;

        this.setState({ localOrientation: newOrientation, localCropData: { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB } }, () => {
            this.drawCuttingBoardCanvas();
        });
    }

    render() {
        const { width, height } = this.props;
        const { localCropData:cropData } = this.state;
        const buttStyle = { color: 'rgba(255,255,255,0.7)', marginRight: 10 };

        const showCuttingBoard = Math.max(width, height) > 800;

        return (

            <div className='quickCropAndRotate--holder'>

                {showCuttingBoard &&
                <div className='quickCropAndRotate--cuttingMatHolder'>
                    <QuickCuttingMat width={width}
                                     height={height}
                                     label={"Crop and Rotate"}
                    />
                </div>
                }

                <div className='quickCropAndRotate--controls'>
                    <ControlPanelButt icon={faRedo}
                                      style={buttStyle}
                                      key={'cropRotate'}
                                      label={'ROTATE'}
                                      onClick={this.onRotateClockwiseClick}/>

                    <ControlPanelButt icon={faCheck}
                                      style={buttStyle}
                                      key={'cropDone'}
                                      label={'DONE'}
                                      onClick={this.onDoneClick}/>

                    <ControlPanelButt icon={faTimes}
                                      style={buttStyle}
                                      key={'cropCancel'}
                                      label={'CANCEL'}
                                      onClick={this.onCancelClick}/>
                </div>

                <div className='quickCropAndRotate--cuttingBoardHolder'>
                    <QuickCuttingBoard
                        onCropUpdate={this.onCropUpdate}
                        onCanvasSetup={this.onCanvasSetup}
                        cropData={cropData}/>
                </div>

            </div>
        );
    }
}

export default CropAndRotateEditor;