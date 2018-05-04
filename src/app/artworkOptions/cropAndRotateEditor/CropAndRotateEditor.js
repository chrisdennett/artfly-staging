// externals
import React, { Component } from "react";
// import faRedo from '@fortawesome/fontawesome-pro-solid/faRedo';
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
import './cropAndRotate_styles.css';
// helpers
import * as ImageHelper from "../../global/ImageHelper";
// components
import QuickCuttingBoard from "./QuickCuttingBoard";
// import QuickCuttingMat from "../quickCuttingMat/QuickCuttingMat";
// import ControlPanelButt from "../../global/Butt/ControlPanelButt";

class CropAndRotateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onRotateClockwiseClick = this.onRotateClockwiseClick.bind(this);
        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onCropChange = this.onCropChange.bind(this);

    }

    componentWillReceiveProps(newProps) {
        this.drawCuttingBoardCanvas(newProps);
    }

    drawCuttingBoardCanvas(props=this.props) {
        const { sourceImg, orientation } = props;
        const { dimensions } = this.state;
        const { width, height } = dimensions ? dimensions : { width: null, height: null };

        if (!sourceImg || !width || !this.canvas) return;

        const padding = 26;
        const maxCuttingBoardWidth = width - (padding * 2);
        const maxCuttingBoardHeight = height - (padding * 2);

        ImageHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: this.canvas,
            orientation: orientation,
            maxOutputCanvasWidth: maxCuttingBoardWidth,
            maxOutputCanvasHeight: maxCuttingBoardHeight
        });

        // this isn't needed for any other reason than to trigger a redraw
        this.setState({ canvasWidth:this.canvas.width, canvasHeight:this.canvas.height });
    }

    // Rotate using info from:
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
    onRotateClockwiseClick() {
        /*const currentRotation = this.state.localOrientation ? this.state.localOrientation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const newOrientation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.state.localCropData;

        const newL = 1 - bottomPercent;
        const newR = 1 - topPercent;
        const newT = leftPercent;
        const newB = rightPercent;

        this.setState({ localOrientation: newOrientation, localCropData: { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB } }, () => {
            this.drawCuttingBoardCanvas();
        });*/
    }

    onResize(contentRect){
        this.setState({dimensions:contentRect.bounds}, this.drawCuttingBoardCanvas);
    }

    onCropChange(cropData){
        this.props.onDataChange({cropData});
    }
    
    render() {
        const { cropData } = this.props;
        const { canvasWidth=100, canvasHeight=100 } = this.state;
        // const buttStyle = { color: 'rgba(255,255,255,0.7)', marginRight: 10 };

        return (
            <Measure
                bounds
                onResize={this.onResize}>

                {({ measureRef }) =>
                    <div ref={measureRef} className={'quickCropAndRotate--holder'}>

                        <div className='quickCropAndRotate--cuttingBoardHolder'>
                            <QuickCuttingBoard
                                width={canvasWidth}
                                height={canvasHeight}
                                cropData={cropData}
                                onCropUpdate={this.onCropChange}
                            />

                            <canvas ref={c => this.canvas = c}/>
                        </div>
                    </div>


                }
            </Measure>


        );
    }
}

export default CropAndRotateEditor;