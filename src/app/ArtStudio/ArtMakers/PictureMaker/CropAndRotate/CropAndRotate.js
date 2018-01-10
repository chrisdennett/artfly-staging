// externals
import React, { Component } from "react";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faRedo, faTimes, faCheck } from '@fortawesome/fontawesome-free-solid';
// styles
import './cropAndRotate.css';
// helpers
import * as PhotoHelper from "../../../ImageHelper";
// components
import CuttingBoard from "./CuttingBoard";
import Butt from "../../../../global/Butt/Butt";
import ScrollbarRemover from "../../../../global/ScrollbarRemover";
import LoadingOverlay from '../../../../global/LoadingOverlay';
import ControlPanelButt from "../../../../global/Butt/ControlPanelButt";

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
    }

    onCropUpdate(cropData) {
        this.setState({ cropData });
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
        const { rotation, cropData } = this.state;
        this.props.onDone(rotation, cropData);
    }

    drawCuttingBoardCanvas(props = this.props) {
        const { width, height, sourceImg } = props;
        const { rotation, canvas } = this.state;

        if (!sourceImg || !width || !canvas) return;

        const paddingTop = 20;
        const paddingSide = 40;
        const spaceForButtons = 93;
        const maxCuttingBoardWidth = width - (paddingSide * 2);
        const maxCuttingBoardHeight = height - (spaceForButtons + paddingTop);

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
        const { width, height, sourceImg } = this.props;
        const { maxCuttingBoardWidth, maxCuttingBoardHeight } = this.state;

        const { rotation, cropData } = this.state;

        if (!sourceImg) {
            return <LoadingOverlay/>
        }

        const extraButtStyle = {marginLeft:10};

        return (
            <ScrollbarRemover>

                <div className='cropAndRotate--holder' style={{ width: width, height: height }}>

                    <div className='cropAndRotate--content'>
                        <CuttingBoard
                            onCropUpdate={this.onCropUpdate}
                            onCanvasSetup={this.onCanvasSetup}
                            maxWidth={maxCuttingBoardWidth}
                            maxHeight={maxCuttingBoardHeight}
                            rotation={rotation}
                            cropData={cropData}/>
                    </div>

                    <div className='cropAndRotate--controls'>

                        <ControlPanelButt icon={faRedo}
                                          style={extraButtStyle}
                                          label={'ROTATE'}
                                          onClick={this.onRotateClockwiseClick}/>

                        <ControlPanelButt icon={faCheck}
                                          style={extraButtStyle}
                                          label={'DONE'}
                                          onClick={this.onDoneClick}/>

                        <ControlPanelButt icon={faTimes}
                                          style={extraButtStyle}
                                          label={'CANCEL'}
                                          onClick={this.onDoneClick}/>
                    </div>


                </div>
            </ScrollbarRemover>
        );
    }
}

export default CropAndRotate;