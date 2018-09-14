// externals
import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
import './cropAndRotate_styles.css';
// helpers
import * as ImageHelper from "../../../components/global/ImageHelper";
// components
import CropControlsContainer from "./assets/CropControlsContainer";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import { getDimensionRatios } from "../../../components/global/ImageHelper";

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

    drawCuttingBoardCanvas(props = this.props) {
        const { sourceImg, artworkData } = props;
        const { orientation } = artworkData;
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
        this.setState({ canvasWidth: this.canvas.width, canvasHeight: this.canvas.height });
    }

    onResize(contentRect) {
        this.setState({ dimensions: contentRect.bounds }, this.drawCuttingBoardCanvas);
    }

    onCropChange(cropData) {
        this.sendUpdatedData({ cropData });
    }

    // default to props so can overwrite single values without error
    sendUpdatedData({ orientation = this.props.artworkData.orientation, cropData = this.props.artworkData.cropData }) {

        // NB: can't use canvas width and height here because that updates as a result of
        // calling onDataChange.
        const { width, height } = this.props.sourceImg;
        const isPortrait = orientation > 4 && orientation < 9;
        const w = isPortrait ? height : width;
        const h = isPortrait ? width : height;

        const { widthToHeightRatio, heightToWidthRatio } = getSizeRatios(cropData, w, h);
        this.props.onDataChange({ orientation, cropData, widthToHeightRatio, heightToWidthRatio });
    }

    onRotateClick() {
        const currentRotation = this.props.artworkData.orientation;
        const newOrientation = getNextOrientation(currentRotation);

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.artworkData.cropData;

        const newL = topPercent;
        const newR = bottomPercent;
        const newT = 1 - rightPercent;
        const newB = 1 - leftPercent;

        const newCropData = { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB };

        this.sendUpdatedData({ orientation: newOrientation, cropData: newCropData })
    }

    render() {
        const { artworkData, sourceImg } = this.props;
        const { cropData } = artworkData;
        const { canvasWidth = 100, canvasHeight = 100 } = this.state;

        return (
            <Measure
                bounds
                onResize={this.onResize}>

                {({ measureRef }) =>
                    <div ref={measureRef} className={'quickCropAndRotate--holder'}>

                        {!sourceImg &&
                        <LoadingThing label={'Loading Source Image'} style={{ color: '#fff' }}/>
                        }

                        <div className='quickCropAndRotate--cuttingBoardHolder'>
                            {sourceImg &&
                            <CropControlsContainer
                                width={canvasWidth}
                                height={canvasHeight}
                                cropData={cropData}
                                onRotateClick={this.onRotateClick}
                                onCropUpdate={this.onCropChange}
                            />
                            }

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
    const { leftPercent, rightPercent, topPercent, bottomPercent } = cropDecimals;

    const totalCropWidthPercentage = leftPercent + (1 - rightPercent);
    const totalCropHeightPercentage = topPercent + (1 - bottomPercent);

    const cropWidth = width * totalCropWidthPercentage;
    const cropHeight = height * totalCropHeightPercentage;

    const croppedWidth = width - cropWidth;
    const croppedHeight = height - cropHeight;

    const {widthToHeightRatio, heightToWidthRatio} = getDimensionRatios(croppedWidth, croppedHeight);

    return { widthToHeightRatio, heightToWidthRatio };
};

const getNextOrientation = (currentOrientation) => {
    // https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
    let nextOrientation;

    switch (currentOrientation) {
        case 1:
            nextOrientation = 8;
            break;
        case 8:
            nextOrientation = 3;
            break;
        case 3:
            nextOrientation = 6;
            break;
        case 6:
            nextOrientation = 1;
            break;

        case 2:
            nextOrientation = 5;
            break;
        case 5:
            nextOrientation = 4;
            break;
        case 4:
            nextOrientation = 7;
            break;
        case 7:
            nextOrientation = 2;
            break;

        default:
            nextOrientation = 8;
    }

    return nextOrientation;
};
