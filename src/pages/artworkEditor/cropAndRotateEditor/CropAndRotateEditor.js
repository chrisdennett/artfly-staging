// externals
import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
import './cropAndRotate_styles.css';
// helpers
import {
    getDimensionRatios, copyToCanvas, loadImage, drawToCanvasWithMaxSize, getDimensionsToFit, drawOrientatedCanvas
} from "../../../components/global/ImageHelper";
// constants
import { LARGE_IMG_SIZE } from "../../../GLOBAL_CONSTANTS";
// components
import CropControlsContainer from "./assets/CropControlsContainer";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import { EditAppBar } from "../../../components/appBar/AppBar";

class CropAndRotateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onRotateClick = this.onRotateClick.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        // set up source image
        loadImage(this.props.artworkData.sourceUrl, (sourceImg) => {
            this.sourceCanvas = drawToCanvasWithMaxSize(sourceImg, LARGE_IMG_SIZE, LARGE_IMG_SIZE);
            this.drawCuttingBoardCanvas();
        });
    }

    drawCuttingBoardCanvas() {
        const { orientation: initialOrientation } = this.props.artworkData;
        const { orientation: updatedOrientation } = this.state;
        const currentOrientation = updatedOrientation ? updatedOrientation : initialOrientation;

        const { dimensions } = this.state;
        const { width, height } = dimensions ? dimensions : { width: null, height: null };

        if (!this.sourceCanvas || !width || !this.canvas) return;

        // const combinedCanvas = createColourSplitCanvas(this.sourceCanvas, this.props.artworkData);
        const orientatedCanvas = drawOrientatedCanvas(this.sourceCanvas, currentOrientation);
        copyToCanvas(orientatedCanvas, this.canvas);

        // canvas needs to be sized to match a large image, but displayed to fit the screen
        // these calcs set the screen size with is used to set the size of the controls and
        // the style height and width values for the canvas.
        const padding = 26;
        const maxCuttingBoardWidth = width - (padding * 2);
        const maxCuttingBoardHeight = height - (padding * 2);

        const { width: canvasDisplayWidth, height: canvasDisplayHeight } = getDimensionsToFit(this.canvas.width, this.canvas.height, maxCuttingBoardWidth, maxCuttingBoardHeight);

        this.setState({ canvasDisplayWidth, canvasDisplayHeight });
    }

    onResize(contentRect) {
        this.setState({ dimensions: contentRect.bounds }, this.drawCuttingBoardCanvas);
    }

    onCropChange(cropData) {
        this.setState({ cropData });
    }

    onRotateClick() {
        const { orientation: initialOrientation, cropData: initialCropData } = this.props.artworkData;
        const { orientation: updatedOrientation, cropData: updatedCropData } = this.state;

        const currentOrientation = updatedOrientation ? updatedOrientation : initialOrientation;
        const newOrientation = getNextOrientation(currentOrientation);
        const currentCropData = updatedCropData ? updatedCropData : initialCropData;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = currentCropData;

        const newL = topPercent;
        const newR = bottomPercent;
        const newT = 1 - rightPercent;
        const newB = 1 - leftPercent;

        const newCropData = { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB };

        this.setState({ orientation: newOrientation, cropData: newCropData }, () => this.drawCuttingBoardCanvas());
    }

    onSave() {
        const { cropData, orientation=1 } = this.state;
        const { artworkData } = this.props;
        const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(this.canvas.width, this.canvas.height);
        const mergedData = { ...artworkData, cropData, orientation, widthToHeightRatio, heightToWidthRatio };

        this.props.updateArtworkAndImage(this.canvas, mergedData);
    }

    render() {
        const { cropData: initialCropData } = this.props.artworkData;
        const { cropData } = this.state;

        const mergedCropData = { ...initialCropData, ...cropData };
        const { canvasDisplayWidth = 100, canvasDisplayHeight = 100 } = this.state;

        return (
            <div className={'labApp'}>

                <EditAppBar title={'Crop & Rotate'}
                            hasChanges={this.state.cropData || this.state.orientation}
                            onCloseClick={this.props.onCloseClick}
                            onSaveClick={this.onSave}
                            onCancelClick={() => this.setState({ cropData: null, orientation: null }, this.drawCuttingBoardCanvas)}/>
                <Measure
                    bounds
                    onResize={this.onResize}>

                    {({ measureRef }) =>
                        <div ref={measureRef} className={'quickCropAndRotate--holder'}>

                            {!this.sourceCanvas &&
                            <LoadingThing label={'Loading Source Image'} style={{ color: '#fff' }}/>
                            }

                            <div className='quickCropAndRotate--cuttingBoardHolder'>
                                {this.sourceCanvas &&
                                <CropControlsContainer
                                    width={canvasDisplayWidth}
                                    height={canvasDisplayHeight}
                                    cropData={mergedCropData}
                                    onRotateClick={this.onRotateClick}
                                    onCropUpdate={this.onCropChange}
                                />
                                }

                                <canvas ref={c => this.canvas = c}
                                        style={{ width: canvasDisplayWidth, height: canvasDisplayHeight }}/>
                            </div>
                        </div>
                    }
                </Measure>
            </div>
        );
    }
}

export default CropAndRotateEditor;


/*const getSizeRatios = (cropDecimals, width, height) => {
    const { leftPercent, rightPercent, topPercent, bottomPercent } = cropDecimals;

    const totalCropWidthPercentage = leftPercent + (1 - rightPercent);
    const totalCropHeightPercentage = topPercent + (1 - bottomPercent);

    const cropWidth = width * totalCropWidthPercentage;
    const cropHeight = height * totalCropHeightPercentage;

    const croppedWidth = width - cropWidth;
    const croppedHeight = height - cropHeight;

    const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(croppedWidth, croppedHeight);

    return { widthToHeightRatio, heightToWidthRatio };
};*/

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
