import {
    copyToCanvas,
    createBrightnessCanvas,
    createContrastCanvas
} from "../../canvasCreators";
import { mmToPixels } from "../../../components/global/UTILS";

/*const greyPalette = {
    key: 'greys',
    colours: [{ r: 0, g: 0, b: 0 },
        { r: 64, g: 64, b: 64 },
        { r: 128, g: 128, b: 128 },
        { r: 191, g: 191, b: 191 },
        { r: 255, g: 255, b: 255 }]
};*/

// const brightnessValues = [0, 64, 128, 191, 255];

const beePalette = [
    '#000000',
    '#3a3a3a',
    '#886a32',
    '#c29b34',
    '#ebc731',
    '#ffe46f',
    '#ffffff',
]

const chars = [
    '—',
    'O',
    '/',
    '*',
    'X',
    '.',
]

export const createPixelNumberCanvas = (inputCanvas, edit) => {
    let {
        contrast = 0,
        brightnessAdjust = 0,
        sheetNumber = 1,
        pixelsWide = 100,
        sheetCol = 0,
        sheetRow = 0
    } = edit;

    const brightnessCanvas = createBrightnessCanvas(inputCanvas, { brightnessAdjust: brightnessAdjust });
    const contrastCanvas = createContrastCanvas(brightnessCanvas, { threshold: contrast });

    if (sheetNumber === '1') {
        sheetCol = 0;
        sheetRow = 0;
    }
    if (sheetNumber === '2') {
        sheetCol = 1;
        sheetRow = 0;
    }
    if (sheetNumber === '3') {
        sheetCol = 2;
        sheetRow = 0;
    }

    if (sheetNumber === '4') {
        sheetCol = 0;
        sheetRow = 1;
    }
    if (sheetNumber === '5') {
        sheetCol = 1;
        sheetRow = 1;
    }
    if (sheetNumber === '6') {
        sheetCol = 2;
        sheetRow = 1;
    }

    if (sheetNumber === '7') {
        sheetCol = 0;
        sheetRow = 2;
    }
    if (sheetNumber === '8') {
        sheetCol = 1;
        sheetRow = 2;
    }
    if (sheetNumber === '9') {
        sheetCol = 2;
        sheetRow = 2;
    }


    // draw input to small canvas matching the number of pixels needed.
    const pixelCanvas = document.createElement('canvas');
    const widthToHeightRatio = inputCanvas.height / inputCanvas.width;
    // needs to be floored because we're only adding whole blocks
    const pixelsHigh = Math.floor(pixelsWide * widthToHeightRatio);

    const sheetWidth = mmToPixels(297);
    const sheetHeight = mmToPixels(210);
    const printBoxSize = mmToPixels(6);
    const boxesPerSheetWidth = Math.floor(sheetWidth / printBoxSize);
    const boxesPerSheetHeight = Math.floor(sheetHeight / printBoxSize);

    //const numberOfSheetsWide = (pixelsWide * printBoxSize) / sheetWidth;
    //const numberOfSheetsHigh = (pixelsHigh * printBoxSize) / sheetHeight;

    pixelCanvas.width = pixelsWide;
    pixelCanvas.height = pixelsHigh;
    copyToCanvas(contrastCanvas, pixelCanvas, false);

    // create an output
    const outputCanvas = document.createElement('canvas');
    // outputCanvas.width = Math.max(inputCanvas.width, minOutputSize);
    outputCanvas.width = Math.floor(mmToPixels(210));

    outputCanvas.width = sheetWidth;
    outputCanvas.height = sheetHeight;

    const inputCtx = pixelCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext("2d");

    let imageData = inputCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    let pixels = imageData.data;

    // fill with bg colour first
    outputCtx.fillStyle = '#ffffff';
    outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
    outputCtx.textBaseline = "top";
    outputCtx.textAlign = "left";
    outputCtx.font = `${printBoxSize / 2}px Lucida Console`;

    let r, a, x, y, i;
    const lineThickness = 1;
    const halfLineThickness = lineThickness / 2;

    outputCtx.fillStyle = 'rgba(0,0,0,0.4)';
    outputCtx.lineWidth = lineThickness;
    outputCtx.strokeStyle = 'rgba(0,0,0,0.2)';
    const offset = printBoxSize / 3;
    const totalColours = 5;
    const greyBandSize = 255 / totalColours;

    const startX = sheetCol * boxesPerSheetWidth;
    const startY = sheetRow * boxesPerSheetHeight;

    for (y = startY; y < startY + boxesPerSheetHeight; y++) {
        for (x = startX; x < startX + boxesPerSheetWidth; x++) {
            i = (x + (y * pixelCanvas.width)) * 4;

            r = pixels[i];
            // g = pixels[i + 1];
            // b = pixels[i + 2];
            a = pixels[i + 3];

            const grey = Math.round(Math.round(totalColours * r / 255) * greyBandSize);

            const greyIndex = Math.round(grey / greyBandSize);

            const left = (x * printBoxSize) - (startX * printBoxSize);
            const top = (y * printBoxSize) - (startY * printBoxSize);

            //outputCtx.strokeRect(left + halfLineThickness, top + halfLineThickness, printBoxSize - lineThickness, printBoxSize - lineThickness);

            // const colorIndex = brightnessValues.indexOf(r);
            let character;

            // outputCtx.fillStyle = `rgb(${grey},${grey},${grey})`;

            if (a === 0 || x >= pixelsWide || y >= pixelsHigh) {
                character = '';
                // outputCtx.fillStyle = `rgb(${255},${255},${0})`;
            }
            else if (greyIndex === -1) {
                character = r + '';
            }
            else {
                character = chars[greyIndex];
                // character = greyIndex + ''
            }

            // outputCtx.fillRect(left, top, printBoxSize, printBoxSize);

            // outputCtx.fillStyle = grey < 127 ? '#fff' : '#000';
            outputCtx.fillText(character, left + offset, top + offset, printBoxSize);

        }
    }

    return outputCanvas;
};

export const createPixelNumberCanvasFULL = (inputCanvas, edit) => {
    let {
        contrast = 0,
        brightnessAdjust = 0,
        pixelsWide = 100,
    } = edit;

    const brightnessCanvas = createBrightnessCanvas(inputCanvas, { brightnessAdjust: brightnessAdjust });
    const contrastCanvas = createContrastCanvas(brightnessCanvas, { threshold: contrast });

    // draw input to small canvas matching the number of pixels needed.
    const pixelCanvas = document.createElement('canvas');
    const widthToHeightRatio = inputCanvas.height / inputCanvas.width;
    // needs to be floored because we're only adding whole blocks
    const pixelsHigh = Math.floor(pixelsWide * widthToHeightRatio);

    pixelCanvas.width = pixelsWide;
    pixelCanvas.height = pixelsHigh;
    copyToCanvas(contrastCanvas, pixelCanvas, false);

    // create an output
    const outputCanvas = document.createElement('canvas');

    outputCanvas.width = inputCanvas.width;
    outputCanvas.height = inputCanvas.height;

    const inputCtx = pixelCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext("2d");

    let imageData = inputCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    let pixels = imageData.data;


    // fill with bg colour first
    outputCtx.fillStyle = '#ffffff';
    outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
    outputCtx.textBaseline = "top";
    outputCtx.textAlign = "left";
    outputCtx.font = `${8}px Lucida Console`;

    let r, a, x, y, i;
    const lineThickness = 0.5;
    const halfLineThickness = lineThickness / 2;

    outputCtx.fillStyle = '#000000';
    outputCtx.lineWidth = lineThickness;
    outputCtx.strokeStyle = '#000000';
    const offset = 1;
    const totalColours = 5;
    const greyBandSize = 255 / totalColours;
    const boxSize = outputCanvas.width / pixelsWide;

    const colourCounts = {};

    for (y = 0; y < pixelsHigh; y++) {
        for (x = 0; x < pixelsWide; x++) {
            i = (x + (y * pixelCanvas.width)) * 4;

            r = pixels[i];
            // g = pixels[i + 1];
            // b = pixels[i + 2];
            a = pixels[i + 3];

            const grey = Math.round(Math.round(totalColours * r / 255) * greyBandSize);
            const greyIndex = Math.round(grey / greyBandSize);
            //const paletteColour = beePalette[greyIndex];

            const left = x * boxSize;
            const top = y * boxSize;

            outputCtx.strokeRect(left + halfLineThickness, top + halfLineThickness, boxSize - lineThickness, boxSize - lineThickness);

            // const colorIndex = brightnessValues.indexOf(r);
            let character;

            //outputCtx.fillStyle = `rgb(${grey},${grey},${grey})`;
            outputCtx.fillStyle = beePalette[greyIndex];

            if (a === 0 || x >= pixelsWide || y >= pixelsHigh) {
                character = '';
                outputCtx.fillStyle = `rgb(${155},${155},${155})`;

                if (!colourCounts.bg) {
                    colourCounts.bg = 1;
                }
                else {
                    colourCounts.bg += 1;
                }
            }
            else if (greyIndex === -1) {
                character = r + '';

                if (!colourCounts.missingColour) {
                    colourCounts.missingColour = 1;
                }
                else {
                    colourCounts.missingColour += 1;
                }
            }
            else {
                // character = greyIndex + '';
                character = chars[greyIndex];

                if (!colourCounts[character]) {
                    colourCounts[character] = 1;
                }
                else {
                    colourCounts[character] += 1;
                }
            }

            outputCtx.fillRect(left, top, boxSize, boxSize);

            // outputCtx.fillStyle = grey < 127 ? '#fff' : '#000';
            // outputCtx.fillText(character, left + offset, top + offset, boxSize);

        }

        console.log('colourCounts: ', colourCounts);
    }

    return outputCanvas;
};

/*export const splitIntoSheets = (inputCanvas, edit) => {
    const {
            sheetHeight = 58,
            sheetWidth  = 960
        } = edit;
};*/


/*
* A4: 297mm x 210mm
*
* 1 mm = 3.7795275591 pixels
* 1 pixel = 0.26458333333
*
* */

