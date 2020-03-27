import React from "react";
import CropAndRotateEditor
    from "./editors/cropAndRotateEditor/CropAndRotateEditor";
import FrameEditor from "./editors/frameEditor/FrameEditor";
import ColourSplitter
    from "./editors/colourSplitterEditor/ColourSplitterEditor";
import ImageAdder from "./editors/imageAdder/ImageAdder";
import PixelateEditor from "./editors/pixelateEditor/PixelateEditor.";
import ReplacedPaletteEditor
    from "./editors/replacedPaletteEditor/ReplacedPaletteEditor";
// new ui
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import CropRotate from '@material-ui/icons/CropRotate';
import Palette from '@material-ui/icons/Palette';
import FilterFrames from '@material-ui/icons/FilterFrames';
import GridOn from '@material-ui/icons/GridOn';
import BurstMode from '@material-ui/icons/BurstMode';
import ViewArray from '@material-ui/icons/ViewArray';
import BlurCircular from '@material-ui/icons/BlurOnTwoTone';
import Label from '@material-ui/icons/Label';
import Tune from '@material-ui/icons/Tune';
import { createPixelatedCanvas } from "./editors/pixelateEditor/createPixelatedCanvas";
import { createFramedCanvas } from "./editors/frameEditor/createFramedCanvas";
import {
    createColourSplitCanvas, createContrastCanvas,
    createOrientatedAndCroppedCanvas,
    createReplacedPaletteCanvas
} from "./editors/canvasCreators";
import PixelStretcherControls from "./editors/pixelStretcher/PixelStretcherControls";
import {
    createPixelStretcherCanvas
} from "./editors/pixelStretcher/createPixelStretcherCanvas";
import HalftoneControls from "./editors/halftone/HalftoneControls";
import { createHalftoneCanvas } from "./editors/halftone/createHalftoneCanvas";
// import { createPixelNumberCanvasFULL } from "./editors/pixelateEditor/pixelNumberSheets/createPixelNumberCanvas";
import ContrastEditor from "./editors/contrastEditor/ContrastEditor";
import LabelEditor from "./editors/labelEditor/LabelEditor";

export const allEditTypes = {
    crop: {
        name: 'Crop & Rotate',
        CustomEditor: CropAndRotateEditor,
        editFunction: createOrientatedAndCroppedCanvas,
        icon: CropRotate,
        defaults: {
            orientation: 1,
            cropData: {
                leftPercent: 0, rightPercent: 1,
                topPercent: 0, bottomPercent: 1
            }
        }
    },
    contrast: {
        name: 'Brightness / Contrast',
        Controls: ContrastEditor,
        editFunction: createContrastCanvas,
        icon: Tune,
        defaults: {
            brightness: 0,
            contrast: 0,
        }
    },
    frame: {
        name: 'Frame',
        Controls: FrameEditor,
        editFunction: createFramedCanvas,
        icon: FilterFrames,
        defaults: {
            frameThicknessDecimal: 0.04,
            mountThicknessDecimal: 0.06,
            frameColour: { hue: 96, saturation: 0, lightness: 29 },
            mountColour: { hue: 96, saturation: 0, lightness: 100 }
        }
    },
    label: {
        name: 'Details',
        CustomEditor: LabelEditor,
        icon: Label,
        defaults: {
            artist: null,
            title: null,
            age: null
        }
    },
    imageAdd: {
        name: 'Add Pic',
        CustomEditor: ImageAdder,
        icon: AddAPhoto
    },
    halftone: {
        draft: true,
        name: 'Halftone',
        Controls: HalftoneControls,
        editFunction: createHalftoneCanvas,
        icon: BlurCircular,
        defaults: {
            gridRows: 100
        }
    },
    stretcher: {
        name: 'Stretcher',
        Controls: PixelStretcherControls,
        editFunction: createPixelStretcherCanvas,
        icon: ViewArray,
        defaults: {
            hStretch: { pos: 0.5, size: 0.2 }
        }
    },
    pixelate: {
        name: 'Pixelate',
        Controls: PixelateEditor,
        editFunction: createPixelatedCanvas,
        icon: GridOn,
        defaults: {
            pixelsWide: 58,
            showGrid: false,
            pixelType: 'square'
        }
    },
    replacedPalette: {
        name: 'Palette',
        draft: true,
        Controls: ReplacedPaletteEditor,
        editFunction: createReplacedPaletteCanvas,
        icon: Palette,
        defaults: {
            threshold: 20,
            palette: {
                key: 'greys',
                colours: [{ r: 0, g: 0, b: 0 },
                { r: 50, g: 50, b: 50 },
                { r: 100, g: 100, b: 100 },
                { r: 150, g: 150, b: 150 },
                { r: 200, g: 200, b: 200 },
                { r: 255, g: 255, b: 255 }]
            }
        }
    },
    colourSplitter: {
        name: 'Split Colour',
        Controls: ColourSplitter,
        editFunction: createColourSplitCanvas,
        icon: BurstMode,
        defaults: {
            cyanXPercent: 6,
            magentaXPercent: 3,
            yellowXPercent: 0
        }
    },

};

export const getEdit = (editorType) => {
    return allEditTypes[editorType];
};

export const getEditingComponent = (editorType) => {
    const editor = allEditTypes[editorType].comp;
    if (editor) {
        return editor;
    }
    return <div>can't find editor for: {editorType}</div>
};

export const getEditName = (editType) => {
    return allEditTypes[editType].name;
};

export const getEditIcon = (editType) => {
    const icon = allEditTypes[editType].icon;

    if (icon) {
        return icon;
    }
    else {
        console.log("editType NO ICON: ", editType);
        return null;
    }
};
