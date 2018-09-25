// externals
import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
import { isEqual } from 'lodash';
import './cropAndRotate_styles.css';
// helpers
import {
    getDimensionRatios,
    copyToCanvas,
    getDimensionsToFit,
    createOrientatedCanvas,
    getCroppedWidthAndHeight, createMaxSizeCanvas, createCroppedCanvas
} from "../../../components/global/ImageHelper";
// components
import { EditAppBar } from "../../../components/appBar/AppBar";
import CropControlsContainer from "./assets/CropControlsContainer";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
// import { DEFAULT_CROP_EDIT_VALUES } from "../../../GLOBAL_CONSTANTS";
// import { generateUID } from "../../../components/global/UTILS";

class CropAndRotateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.drawCuttingBoardCanvas = this.drawCuttingBoardCanvas.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onRotateClick = this.onRotateClick.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        const { sourceCanvas, initialEditValues } = this.props;
        const {orientation, cropData} = initialEditValues;

        // create a smaller source canvas to manipulations on screen are faster.
        this.smallSourceCanvas = createMaxSizeCanvas(sourceCanvas, window.innerWidth, window.innerHeight);
        this.setState({ orientation, cropData }, this.drawCuttingBoardCanvas);
    }

    drawCuttingBoardCanvas() {
        const { orientation, dimensions } = this.state;
        const { width, height } = dimensions ? dimensions : { width: null, height: null };

        if (!this.smallSourceCanvas || !width || !this.canvas) return;

        const orientatedCanvas = createOrientatedCanvas(this.smallSourceCanvas, orientation);
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
        const { orientation, cropData } = this.state;

        const newOrientation = getNextOrientation(orientation);
        let { leftPercent, rightPercent, topPercent, bottomPercent } = cropData;

        const newL = topPercent;
        const newR = bottomPercent;
        const newT = 1 - rightPercent;
        const newB = 1 - leftPercent;

        const newCropData = { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB };

        this.setState({ orientation: newOrientation, cropData: newCropData }, () => this.drawCuttingBoardCanvas());
    }

    onSave() {
        const { cropData, orientation } = this.state;
        const { sourceCanvas, editKey, initialEditValues } = this.props;

        // need to work out width and height ratios with crop taken into account
        const { croppedWidth, croppedHeight } = getCroppedWidthAndHeight(this.canvas, cropData);
        const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(croppedWidth, croppedHeight);

        // recreate manipulation using source (ie full sized) canvas
        const orientatedCanvas = createOrientatedCanvas(sourceCanvas, orientation);
        const croppedCanvas = createCroppedCanvas(orientatedCanvas, cropData);
        const newEditValues = {...initialEditValues, cropData, orientation};

        this.props.onSaveClick(croppedCanvas, editKey, newEditValues, widthToHeightRatio, heightToWidthRatio);
    }

    onCancel() {
        const { orientation, cropData } = this.props.initialEditValues;
        this.setState({ orientation, cropData }, () => {
            if (this.props.onCancelClick) {
                this.props.onCancelClick();
            }

            this.drawCuttingBoardCanvas();
        });
    }

    render() {
        const { sourceCanvas, initialEditValues } = this.props;
        const { cropData, canvasDisplayWidth = 100, canvasDisplayHeight = 100 } = this.state;
        const hasChanges = checkIfChanged(initialEditValues, this.state);

        return (
            <div className={'labApp'}>

                <EditAppBar title={'Crop & Rotate'}
                            hasChanges={hasChanges || this.props.sourceImg}
                            onCloseClick={this.props.onCloseClick}
                            onSaveClick={this.onSave}
                            onCancelClick={this.onCancel}/>
                <Measure
                    bounds
                    onResize={this.onResize}>

                    {({ measureRef }) =>
                        <div ref={measureRef} className={'quickCropAndRotate--holder'}>

                            {!sourceCanvas &&
                            <LoadingThing label={'Loading Source Image'} style={{ color: '#fff' }}/>
                            }

                            <div className='quickCropAndRotate--cuttingBoardHolder'>
                                {sourceCanvas &&
                                <CropControlsContainer
                                    width={canvasDisplayWidth}
                                    height={canvasDisplayHeight}
                                    cropData={cropData}
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

const checkIfChanged = (initialValues, currentValues) => {
    const { orientation: initialOrientation, cropData: initialCropData } = initialValues;
    const { orientation, cropData } = currentValues;

    return orientation !== initialOrientation || !isEqual(cropData, initialCropData);
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
