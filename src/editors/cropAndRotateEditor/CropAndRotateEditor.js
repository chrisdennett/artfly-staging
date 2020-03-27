// externals
import React from "react";
import Measure from 'react-measure';
// ui
import { Button, ButtonIcon } from '@rmwc/button';
// styles
import '../editorCanvas/editorCanvas_styles.css';
// comps
import CropCanvas from "./CropCanvas";

class CropAndRotateEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = { dimensions: null };
    }

    render() {
        const { sourceCanvas, editData, onChange } = this.props;
        const { dimensions } = this.state;
        const { cropData, orientation } = editData;

        if (!sourceCanvas) return null;

        const margin = 20;
        const { canvasW, canvasH, canvasX, canvasY } = getCanvasDimensions({ sourceCanvas, dimensions, margin, orientation });

        return (
            <div className={'labApp cuttingMatBg'}>

                <Measure bounds onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds })
                }}>
                    {({ measureRef }) => (
                        <div ref={measureRef} style={{ flex: 1 }} />
                    )}
                </Measure>

                {dimensions &&
                    <CropCanvas sourceImg={sourceCanvas}
                        orientation={orientation}
                        onChange={(newCropData) => onChange({ ...editData, cropData: newCropData })}
                        cropData={cropData}
                        margin={margin}
                        canvasW={canvasW}
                        canvasH={canvasH}
                        canvasX={canvasX}
                        canvasY={canvasY}
                    />
                }

                <div className={'editor--controls'}>
                    <div className={'editor--controls--inner'}
                        style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            onClick={() => onChange({ ...editData, ...getRotatedData(orientation, cropData) })}
                        >
                            Rotate <ButtonIcon icon={'rotate_left'} />
                        </Button>


                        <Button
                            onClick={() => onChange({ ...editData, ...getFlippedHorizontalData(orientation, cropData) })}
                        >
                            FLIP <ButtonIcon icon={'swap_horiz'} />
                        </Button>

                        <Button
                            onClick={() => onChange({ ...editData, ...getFlippedVerticalData(orientation, cropData) })}
                        >
                            FLIP <ButtonIcon icon={'swap_vert'} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default CropAndRotateEditor;


const getCanvasDimensions = ({ sourceCanvas, dimensions, margin, orientation }) => {

    if (!dimensions) return { canvasW: 10, canvasH: 10 };

    const isPortrait = orientation > 4 && orientation < 9;

    const { width: sourceW, height: sourceH } = sourceCanvas;
    const { width, height, top } = dimensions;

    const orientedSourceW = isPortrait ? sourceH : sourceW;
    const orientedSourceH = isPortrait ? sourceW : sourceH;

    const maxW = Math.min(width - (margin * 2), orientedSourceW);
    const maxH = Math.min(height - (margin * 2), orientedSourceH);

    const hToWRatio = orientedSourceW / orientedSourceH;
    const wToHRatio = orientedSourceH / orientedSourceW;

    let canvasW = maxW;
    let canvasH = canvasW * wToHRatio;

    if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = canvasH * hToWRatio;
    }

    const canvasX = (width - canvasW) / 2;
    const canvasY = top + (height - canvasH) / 2;

    return { canvasW, canvasH, canvasX, canvasY };
}

/*const checkIfChanged = (initialValues, currentValues) => {
    const { orientation: initialOrientation, cropData: initialCropData } = initialValues;
    const { orientation, cropData } = currentValues;
    
    return orientation !== initialOrientation || !isEqual(cropData, initialCropData);
};*/

// Flip horizontal
const getFlippedHorizontalData = (currentOrientation, cropData) => {
    // https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
    //https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
    let nextOrientation;
    const { topPercent: t, rightPercent: r, bottomPercent: b, leftPercent: l } = cropData;
    let newCropData = {};

    // right and left switch
    newCropData.leftPercent = 1 - r;
    newCropData.rightPercent = 1 - l;

    // top and bottom stay the same
    newCropData.bottomPercent = b;
    newCropData.topPercent = t;

    switch (currentOrientation) {
        case 1:
            nextOrientation = 2;
            break;
        case 3:
            nextOrientation = 4;
            break;
        case 6:
            nextOrientation = 5;
            break;
        case 8:
            nextOrientation = 7;
            break;


        case 2:
            nextOrientation = 1;
            break;
        case 4:
            nextOrientation = 3;
            break;
        case 5:
            nextOrientation = 6;
            break;
        case 7:
            nextOrientation = 8;
            break;

        default:
            nextOrientation = 1;
    }

    return { orientation: nextOrientation, cropData: newCropData };
};

// Flip horizontal
const getFlippedVerticalData = (currentOrientation, cropData) => {
    // if it has been rotated, do a horizontal flip instead

    // https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
    //https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
    let nextOrientation;
    const { topPercent: t, rightPercent: r, bottomPercent: b, leftPercent: l } = cropData;
    let newCropData = {};

    // const isPortrait = currentOrientation > 4 && currentOrientation < 9;

    // left and right stay the same
    newCropData.leftPercent = l;
    newCropData.rightPercent = r;

    // top and bottom switch
    newCropData.bottomPercent = 1 - t;
    newCropData.topPercent = 1 - b;

    switch (currentOrientation) {
        case 1:
            nextOrientation = 4;
            break;
        case 3:
            nextOrientation = 2;
            break;
        case 6:
            nextOrientation = 7;
            break;
        case 8:
            nextOrientation = 5;
            break;

        case 4:
            nextOrientation = 1;
            break;
        case 2:
            nextOrientation = 3;
            break;
        case 5:
            nextOrientation = 8;
            break;
        case 7:
            nextOrientation = 6;
            break;

        default:
            nextOrientation = 1;
    }


    return { orientation: nextOrientation, cropData: newCropData };
};


const getRotatedData = (currentOrientation, cropData) => {
    // https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
    // https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
    let nextOrientation;
    const { topPercent: t, rightPercent: r, bottomPercent: b, leftPercent: l } = cropData;
    let newCropData = {};
    newCropData.rightPercent = b;
    newCropData.bottomPercent = 1 - l;
    newCropData.leftPercent = t;
    newCropData.topPercent = 1 - r;

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

    return { orientation: nextOrientation, cropData: newCropData };
};
