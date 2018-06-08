// externals
import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
import './cropAndRotate_styles.css';
// helpers
import * as ImageHelper from "../../global/ImageHelper";
// components
import QuickCuttingBoard from "./QuickCuttingBoard";

class CropAndRotateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onRotateClick = this.onRotateClick.bind(this);
        this.sendUpdatedData = this.sendUpdatedData.bind(this);

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

    onResize(contentRect){
        this.setState({dimensions:contentRect.bounds}, this.drawCuttingBoardCanvas);
    }

    onCropChange(cropData){
        // this.props.onDataChange({cropData});
        this.sendUpdatedData({cropData});
    }

    // default to props so can overwrite single values without error
    sendUpdatedData({orientation=this.props.orientation, cropData=this.props.cropData}){
        const {canvasWidth, canvasHeight} = this.state;
        const {widthToHeightRatio, heightToWidthRatio} = getSizeRatios(cropData, canvasWidth, canvasHeight);
        this.props.onDataChange({orientation, cropData, widthToHeightRatio, heightToWidthRatio});
    }

    onRotateClick(){
        const currentRotation = this.props.orientation;
        // const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const nextRotations = { 1: 8, 8: 3, 3: 6, 6: 1 }; // order of rotations by 90° anticlockwise increments
        const newOrientation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.cropData;

        const newL = topPercent;
        const newR = bottomPercent;
        const newT = 1 - rightPercent;
        const newB = 1- leftPercent;

        const newCropData = {leftPercent:newL, rightPercent:newR, topPercent:newT, bottomPercent:newB};

        this.sendUpdatedData({orientation:newOrientation, cropData:newCropData})
        // this.props.onDataChange({orientation:newOrientation, cropData:newCropData});
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
                                onRotateClick={this.onRotateClick}
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

const getSizeRatios = (cropDecimals, width, height) => {
    const {leftPercent, rightPercent, topPercent, bottomPercent} = cropDecimals;

    const totalCropWidthPercentage = leftPercent + (1-rightPercent);
    const totalCropHeightPercentage = topPercent + (1-bottomPercent);

    const cropWidth = width * totalCropWidthPercentage;
    const cropHeight = height * totalCropHeightPercentage;

    const croppedWidth = width - cropWidth;
    const croppedHeight = height - cropHeight;

    const heightToWidthRatio = croppedWidth / croppedHeight;
    const widthToHeightRatio = croppedHeight / croppedWidth;

    return {widthToHeightRatio, heightToWidthRatio};
};
