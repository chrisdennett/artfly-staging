// externals
import React, { Component } from "react";
import faRedo from '@fortawesome/fontawesome-pro-solid/faRedo';
import faTimes from '@fortawesome/fontawesome-pro-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-pro-solid/faCheck';
// styles
import './quickCropAndRotate_styles.css';
// helpers
import * as ImageHelper from "../../ArtStudio/ImageHelper";
// components
import QuickCuttingBoard from "./QuickCuttingBoard";
import QuickCuttingMat from "../quickCuttingMat/QuickCuttingMat";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";

class QuickCropAndRotate extends Component {
    constructor(props) {
        super(props);

        this.onCropUpdate = this.onCropUpdate.bind(this);
        this.onCanvasSetup = this.onCanvasSetup.bind(this);
        this.onRotateClockwiseClick = this.onRotateClockwiseClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);

        this.state = {
            canvas: null,
            orientation: null,
            cropData: null
        };
    }

    componentWillMount() {
        // set crop data and rotation to default or values set be parents
        const {
                  cropData    = {
                      leftPercent: 0,
                      rightPercent: 1,
                      topPercent: 0,
                      bottomPercent: 1
                  },
                  orientation = 1
              } = this.props;


        this.setState({ cropData, orientation })
    }

    componentWillReceiveProps(nextProps) {
        this.drawCuttingBoardCanvas(nextProps);
    }

    componentDidMount() {
        this.drawCuttingBoardCanvas();
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
        const { orientation, cropData } = this.state;
        this.props.onDone(orientation, cropData);
    }

    drawCuttingBoardCanvas(props = this.props) {
        const { width, height, sourceImg } = props;
        const { orientation, canvas } = this.state;

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
        const currentRotation = this.state.orientation ? this.state.orientation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const newOrientation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.state.cropData;

        const newL = 1 - bottomPercent;
        const newR = 1 - topPercent;
        const newT = leftPercent;
        const newB = rightPercent;

        this.setState({ orientation: newOrientation, cropData: { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB } }, () => {
            this.drawCuttingBoardCanvas();
        });
    }

    render() {
        const { width, height } = this.props;
        const { cropData } = this.state;
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

export default QuickCropAndRotate;