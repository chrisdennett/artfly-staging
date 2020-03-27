import {
    getDimensionsToFit,
    rgbToHex
} from "../components/global/UTILS";
import { createPixelatedCanvas } from "./pixelateEditor/createPixelatedCanvas";
import { createPixelStretcherCanvas } from "./pixelStretcher/createPixelStretcherCanvas";
import { createHalftoneCanvas } from "./halftone/createHalftoneCanvas";
import { createFramedCanvas } from "./frameEditor/createFramedCanvas";

/*
//https://www.youtube.com/watch?v=X57mh8tKkgE
//https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/web-workers/index.html
const worker = new Worker('/worker.js');
worker.postMessage('yep');

worker.addEventListener('message', (d) => {
    console.log("Received: ", d);
});
*/


// APPLY MULTIPLE EDITS
// TODO: This looks very repetitive - try to DRY
export const createEditedCanvas = (editsInOrder, sourceCanvas, frameSpriteSheet) => {
    if (!sourceCanvas) return;

    let inputCanvas = document.createElement('canvas');
    let outputCanvas = inputCanvas;
    copyToCanvas(sourceCanvas, inputCanvas);

    for (let edit of editsInOrder) {

        if (edit.type === 'crop') {
            outputCanvas = createOrientatedAndCroppedCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'contrast') {
            outputCanvas = createContrastCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'halftone') {
            outputCanvas = createHalftoneCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'colourSplitter') {
            outputCanvas = createColourSplitCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'replacedPalette') {
            outputCanvas = createReplacedPaletteCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'pixelate') {
            outputCanvas = createPixelatedCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'stretcher') {
            outputCanvas = createPixelStretcherCanvas(inputCanvas, edit);
            copyToCanvas(outputCanvas, inputCanvas);
        }

        if (edit.type === 'frame') {
            outputCanvas = createFramedCanvas(inputCanvas, edit, frameSpriteSheet);
            copyToCanvas(outputCanvas, inputCanvas);
        }
    }

    return outputCanvas;
};

// COPY
export function copyToCanvas(inputCanvas, outputCanvas, resizeCanvas = true) {
    if (!inputCanvas) return;
    if (!outputCanvas) return inputCanvas;

    const { width: inputWidth, height: inputHeight } = inputCanvas;

    if (resizeCanvas) {
        outputCanvas.width = inputWidth;
        outputCanvas.height = inputHeight;
    }

    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(inputCanvas, 0, 0, inputCanvas.width, inputCanvas.height, 0, 0, outputCanvas.width, outputCanvas.height);
}

// MAX SIZE
export function createMaxSizeCanvas(inputCanvas, _maxWidth, _maxHeight) {
    const { width: inputWidth, height: inputHeight } = inputCanvas;
    const maxWidth = _maxWidth ? _maxWidth : inputWidth;
    const maxHeight = _maxHeight ? _maxHeight : inputHeight;

    // get width and height restricted to maximums
    const { width: outputWidth, height: outputHeight } = getDimensionsToFit(inputWidth, inputHeight, maxWidth, maxHeight);

    // set up the output canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = outputWidth;
    outputCanvas.height = outputHeight;

    // draw input to output at the restricted size
    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(inputCanvas, 0, 0, inputWidth, inputHeight, 0, 0, outputWidth, outputHeight);

    return outputCanvas;
}

// CROP & ROTATE
export const createOrientatedAndCroppedCanvas = (sourceCanvas, edit) => {
    const { cropData, orientation } = edit;
    const orientatedCanvas = createOrientatedCanvas(sourceCanvas, orientation);
    return createCroppedCanvas(orientatedCanvas, cropData);
};

// ORIENTATE
export const createOrientatedCanvas = (sourceCanvas, orientation) => {
    // source info:
    // https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
    // useful example images:
    // https://github.com/ianare/exif-samples/tree/master/jpg/orientation
    const outputCanvas = document.createElement('canvas');
    const { width: srcW, height: srcH } = sourceCanvas;
    const isPortrait = orientation > 4 && orientation < 9;

    // switch height and width if it's portrait
    outputCanvas.width = isPortrait ? srcH : srcW;
    outputCanvas.height = isPortrait ? srcW : srcH;

    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;

    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, srcW, 0);
            break;
        case 3:
            ctx.transform(-1, 0, 0, -1, srcW, srcH);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, srcH);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, srcH, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, srcH, srcW);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, srcW);
            break;
        default:
            break;
    }

    ctx.drawImage(sourceCanvas, 0, 0);

    return outputCanvas;
};

// CROP
export const createCroppedCanvas = (sourceCanvas, cropData) => {
    if (!sourceCanvas) return;

    const { topPercent, rightPercent, bottomPercent, leftPercent } = cropData;
    const { width: sourceWidth, height: sourceHeight } = sourceCanvas;

    const outputCanvas = document.createElement('canvas');

    const leftCrop = sourceWidth * leftPercent;
    const rightCrop = sourceWidth * (1 - rightPercent);
    const topCrop = sourceHeight * topPercent;
    const bottomCrop = sourceHeight * (1 - bottomPercent);
    const croppedWidth = sourceCanvas.width - (leftCrop + rightCrop);
    const croppedHeight = sourceCanvas.height - (topCrop + bottomCrop);

    outputCanvas.width = croppedWidth;
    outputCanvas.height = croppedHeight;

    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(sourceCanvas, leftCrop, topCrop, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

    return outputCanvas;
};

// COLOUR SPLIT
export const createColourSplitCanvas = (inputCanvas, colourSplitEditValues) => {
    const { cyanXPercent, magentaXPercent, yellowXPercent } = colourSplitEditValues;

    const outputCanvas = document.createElement('canvas');
    const redCanvas = document.createElement('canvas');
    const greenCanvas = document.createElement('canvas');
    const blueCanvas = document.createElement('canvas');

    const inputCtx = inputCanvas.getContext('2d');
    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;

    redCanvas.width = greenCanvas.width = blueCanvas.width = inputWidth;
    redCanvas.height = greenCanvas.height = blueCanvas.height = inputHeight;

    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let imageData2 = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let imageData3 = inputCtx.getImageData(0, 0, inputWidth, inputHeight);

    let pixels1 = imageData.data;
    let pixels2 = imageData2.data;
    let pixels3 = imageData3.data;

    for (let i = 0; i < pixels1.length; i += 4) {
        const r = pixels1[i];     // red
        const g = pixels1[i + 1]; // green
        const b = pixels1[i + 2]; // blue

        pixels1[i] = r;
        pixels1[i + 1] = 255;
        pixels1[i + 2] = 255;

        pixels2[i] = 255;
        pixels2[i + 1] = g;
        pixels2[i + 2] = 255;

        pixels3[i] = 255;
        pixels3[i + 1] = 255;
        pixels3[i + 2] = b;
    }

    // put the updated image data in the output canvas
    redCanvas.getContext('2d').putImageData(imageData2, 0, 0);
    greenCanvas.getContext('2d').putImageData(imageData3, 0, 0);
    blueCanvas.getContext('2d').putImageData(imageData, 0, 0);

    const maxXPos = inputWidth * 2;
    const cyanPos = maxXPos * (cyanXPercent / 100);
    const magentaPos = maxXPos * (magentaXPercent / 100);
    const yellowPos = maxXPos * (yellowXPercent / 100);

    const leftEdge = Math.min(cyanPos, magentaPos, yellowPos);
    const rightEdge = Math.max(cyanPos, magentaPos, yellowPos);

    outputCanvas.width = inputWidth + (rightEdge - leftEdge);
    outputCanvas.height = inputHeight;
    const outputCtx = outputCanvas.getContext('2d');
    outputCtx.globalCompositeOperation = 'multiply';
    outputCtx.drawImage(greenCanvas, yellowPos - leftEdge, 0);
    outputCtx.drawImage(redCanvas, magentaPos - leftEdge, 0);
    outputCtx.drawImage(blueCanvas, cyanPos - leftEdge, 0);

    return outputCanvas;
};

// BRIGHTNESS
export const createBrightnessCanvas = (inputCanvas, edit) => {
    const { brightnessAdjust } = edit;

    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    let pixels = imgData.data;
    let r, g, b;
    for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];

        pixels[i] = r + brightnessAdjust;
        pixels[i + 1] = g + brightnessAdjust;
        pixels[i + 2] = b + brightnessAdjust;
    }

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(imgData, 0, 0);

    return outputCanvas;
};

// THRESHOLD
export const createThresholdCanvas = (inputCanvas, edit) => {
    const { threshold: thresholdPercent } = edit;
    const thresh = (thresholdPercent / 100) * 255;
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
    let pixels = imgData.data;
    let r, g, b, avg, value;
    for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];

        avg = (r + g + b) / 3;
        value = avg > thresh ? 255 : 0;

        pixels[i] = value;
        pixels[i + 1] = value;
        pixels[i + 2] = value;
    }

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(imgData, 0, 0);

    return outputCanvas;
};

/*const createNewCanvas = ({inputCanvas, filter}) => {
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    const updatedImgData = filter(imgData);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(updatedImgData, 0, 0);

    return outputCanvas;
};*/

export const createThesholdCanvas = (inputCanvas, edit) => {
    const { threshold } = edit;
    const contrast = threshold * 2.55;
    const contrastFactor = (255 + contrast) / (255.01 - contrast); //add .1 to avoid /0 error

    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    let pixels = imgData.data;
    let r, g, b;
    for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];

        pixels[i] = contrastFactor * (r - 128) + 128;
        pixels[i + 1] = contrastFactor * (g - 128) + 128;
        pixels[i + 2] = contrastFactor * (b - 128) + 128;
    }

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(imgData, 0, 0);

    return outputCanvas;
};



export const createContrastCanvas = (inputCanvas, edit) => {
    const { contrast: contrastPercent = -90, brightness = 0 } = edit;

    const contrast = contrastPercent * 2.55;
    const contrastFactor = (255 + contrast) / (255.01 - contrast); //add .1 to avoid /0 error
    const brightnessFactor = brightness * 2.55;

    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    let pixels = imgData.data;
    let r, g, b, r2, g2, b2;
    for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];

        r2 = r + brightnessFactor;
        g2 = g + brightnessFactor;
        b2 = b + brightnessFactor;

        pixels[i] = contrastFactor * (r2 - 128) + 128;
        pixels[i + 1] = contrastFactor * (g2 - 128) + 128;
        pixels[i + 2] = contrastFactor * (b2 - 128) + 128;
    }

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(imgData, 0, 0);

    return outputCanvas;
};

// REDUCED COLOUR
export const getGreyScaleHistogram = (inputCanvas) => {
    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;

    const thresholdPalette = createThresholdCanvas(inputCanvas, { threshold: 0 });
    const inputCtx = thresholdPalette.getContext('2d');
    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let pixels = imageData.data;
    let grey;
    let allUniqueGreys = [];

    // const greyBandSize = 255 / totalColours;

    for (let i = 0; i < pixels.length; i += 4) {
        grey = pixels[i];

        if (allUniqueGreys.indexOf(grey) === -1) {
            allUniqueGreys.push(grey);
        }
    }

    return allUniqueGreys.sort((a, b) => a - b);
};

export const getHues = (inputCanvas) => {
    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;

    // make a smaller canvas first - try 100x100
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 10;
    sampleCanvas.height = 10;
    copyToCanvas(inputCanvas, sampleCanvas, false);


    const inputCtx = sampleCanvas.getContext('2d');
    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let pixels = imageData.data;
    let red, green, blue, hex;
    let allHues = [];
    let allHex = [];

    // const greyBandSize = 255 / totalColours;

    for (let i = 0; i < pixels.length; i += 4) {
        red = pixels[i];
        green = pixels[i + 1];
        blue = pixels[i + 2];

        const { hue, saturation, lightness } = rgbToHsl({ red, green, blue });
        hex = rgbToHex(red, green, blue);

        if (allHex.indexOf(hex) === -1) {
            allHex.push(hex);
            allHues.push({ hex, hue, saturation, lightness });
        }
    }

    return allHues.sort((a, b) => a.lightness - b.lightness);
};

export const createBrightnessBands = (totalBands, histogram) => {
    const lowestExtreme = histogram ? histogram[0] : 0;
    const highestExtreme = histogram ? histogram[histogram.length - 1] : 255;

    const range = highestExtreme - lowestExtreme;
    const bandSize = Math.floor(range / totalBands);
    const bands = [];
    let bandStart = 0, bandEnd;

    for (let i = 0; i < totalBands; i++) {

        if (i === totalBands - 1) {
            bandEnd = 255;
        }
        else {
            bandEnd = lowestExtreme + ((i + 1) * bandSize);
        }

        bands[i] = [bandStart, bandEnd];

        bandStart = bandEnd + 1;
    }

    return bands;
};

export const createGreyPaletteCanvas = (inputCanvas, edit) => {
    const { threshold, bands } = edit;
    if (!bands) {
        console.log("CANVAS bands: ", bands);
        return inputCanvas;
    }

    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;

    const thresholdPalette = createThresholdCanvas(inputCanvas, { threshold });

    const inputCtx = thresholdPalette.getContext('2d');
    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let pixels = imageData.data;
    let band, grey, newGrey;
    const findBand = (grey) => bands.find(band => grey >= band[0] && grey <= band[1]);

    for (let i = 0; i < pixels.length; i += 4) {
        grey = pixels[i];

        band = findBand(grey);
        newGrey = band[1] < 255 ? band[0] : band[1];

        pixels[i] = newGrey;
        pixels[i + 1] = newGrey;
        pixels[i + 2] = newGrey;
    }

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = inputCanvas.width;
    outputCanvas.height = inputCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    outputCtx.putImageData(imageData, 0, 0);

    return outputCanvas;
};

export const createGreyscaleCanvas = (inputCanvas) => {
    const inputCtx = inputCanvas.getContext('2d');
    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;

    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        const grey = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

        pixels[i] = grey; // red
        pixels[i + 1] = grey; // green
        pixels[i + 2] = grey; // blue
    }

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = inputCanvas.width;
    outputCanvas.height = inputCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    outputCtx.putImageData(imageData, 0, 0);

    return outputCanvas;
};

export const createReplacedPaletteCanvas = (inputCanvas, edit) => {
    const { threshold = 0.5, palette } = edit;

    const { colours } = palette;

    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;
    const totalColours = colours.length - 1;

    const greyscaleCanvas = createGreyscaleCanvas(inputCanvas);
    const thresholdPalette = createThesholdCanvas(greyscaleCanvas, { threshold });

    const inputCtx = thresholdPalette.getContext('2d');
    let imageData = inputCtx.getImageData(0, 0, inputWidth, inputHeight);
    let pixels = imageData.data;

    const allReds = [];

    const greyBandSize = 255 / totalColours;

    for (let i = 0; i < pixels.length; i += 4) {
        const r2 = pixels[i];
        const grey = Math.round(Math.round(totalColours * r2 / 255) * greyBandSize);

        const greyIndex = Math.round(grey / greyBandSize);

        let col = colours[greyIndex];
        if (!col) col = { r: 50, g: 50, b: 50 };

        pixels[i] = col.r; // red
        pixels[i + 1] = col.g; // green
        pixels[i + 2] = col.b; // blue

        if (allReds.indexOf(col.r) < 0) {
            allReds.push(col.r);
        }
    }

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = inputCanvas.width;
    outputCanvas.height = inputCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    outputCtx.putImageData(imageData, 0, 0);

    return outputCanvas;
};

// PIXELATED - moved to pixelateEditor folder

// FRAME - moved to frameEditor folder

export const createSharperCanvas = (inputCanvas, sharpenBy = 3) => {
    const centerVal = sharpenBy;
    const sideVal = 0 - (sharpenBy - 1) / 4;

    const weights = [0, sideVal, 0, sideVal, centerVal, sideVal, 0, sideVal, 0];

    return createConvolutionFilterCanvas({ inputCanvas, weights });
};

export const createMaxHueCanvas = inputCanvas => {
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
    let pixels = imgData.data;
    let r, g, b, l2;
    const lowerThreshold = 0.34;
    const upperThreshold = 0.58;

    for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];

        const { h, l } = rgbToHsl({ r, g, b });

        if (l < lowerThreshold) {
            l2 = 0;
        }
        else if (l > upperThreshold) {
            l2 = 1;
        }
        else {
            l2 = 0.5;
        }

        const { r: r2, g: g2, b: b2 } = hslToRgb({ h, s: 1, l: l2 });

        pixels[i] = r2;
        pixels[i + 1] = g2;
        pixels[i + 2] = b2;
    }

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(imgData, 0, 0);

    return outputCanvas;

};

export const createBlurredCanvas = (inputCanvas, blur = 3) => {
    const matrixSize = blur * blur;
    const val = 1 / matrixSize;
    const weights = Array(matrixSize).fill(val);

    return createConvolutionFilterCanvas({ inputCanvas, weights });
};

const createConvolutionFilterCanvas = ({ inputCanvas, weights }) => {
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let inputImgData = inputCtx.getImageData(0, 0, inputW, inputH);
    let inputPixels = inputImgData.data;

    convolute(inputPixels, weights, true, inputW, inputH);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(inputImgData, 0, 0);

    return outputCanvas;
};

const convolute = (pixels, weights, opaque, w, h) => {
    const pixelsCopy = pixels.slice(0);

    const side = Math.round(Math.sqrt(weights.length));
    const halfSide = Math.floor(side / 2);

    const alphaFac = opaque ? 1 : 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const sy = y;
            const sx = x;
            const dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            let r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    const scy = sy + cy - halfSide;
                    const scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        const srcOff = (scy * w + scx) * 4;
                        const wt = weights[cy * side + cx];
                        r += pixelsCopy[srcOff] * wt;
                        g += pixelsCopy[srcOff + 1] * wt;
                        b += pixelsCopy[srcOff + 2] * wt;
                        a += pixelsCopy[srcOff + 3] * wt;
                    }
                }
            }
            pixels[dstOff] = r;
            pixels[dstOff + 1] = g;
            pixels[dstOff + 2] = b;
            pixels[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
};

const bayerThresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90]
];

export const createDitherCanvas = (inputCanvas, edit) => {
    const { threshold: thresholdPercent, type } = edit;
    const threshold = (thresholdPercent / 100) * 255;
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    const newImgData = dither(imgData, threshold, type);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(newImgData, 0, 0);

    return outputCanvas;
};

const dither = (imageData, threshold, type) => {
    const imageDataLength = imageData.data.length;
    let lumR = [];
    var lumG = [];
    let lumB = [];
    for (let i = 0; i < 256; i++) {
        lumR[i] = i * 0.299;
        lumG[i] = i * 0.587;
        lumB[i] = i * 0.114;
    }

    // Greyscale luminance (sets r pixels to luminance of rgb)
    for (let i = 0; i <= imageDataLength; i += 4) {
        imageData.data[i] = Math.floor(
            lumR[imageData.data[i]] +
            lumG[imageData.data[i + 1]] +
            lumB[imageData.data[i + 2]]
        );
    }

    const w = imageData.width;
    let newPixel, err;

    for (
        let currentPixel = 0;
        currentPixel <= imageDataLength;
        currentPixel += 4
    ) {
        if (type === "none") {
            // No dithering
            imageData.data[currentPixel] =
                imageData.data[currentPixel] < threshold ? 0 : 255;
        }
        else if (type === "bayer") {
            // 4x4 Bayer ordered dithering algorithm
            const x = (currentPixel / 4) % w;
            const y = Math.floor(currentPixel / 4 / w);
            const map = Math.floor(
                (imageData.data[currentPixel] + bayerThresholdMap[x % 4][y % 4]) / 2
            );
            imageData.data[currentPixel] = map < threshold ? 0 : 255;
        }
        else if (type === "floydsteinberg") {
            // Floyd–Steinberg dithering algorithm
            newPixel = imageData.data[currentPixel] < 129 ? 0 : 255;
            err = Math.floor((imageData.data[currentPixel] - newPixel) / 16);
            imageData.data[currentPixel] = newPixel;

            imageData.data[currentPixel + 4] += err * 7;
            imageData.data[currentPixel + 4 * w - 4] += err * 3;
            imageData.data[currentPixel + 4 * w] += err * 5;
            imageData.data[currentPixel + 4 * w + 4] += err * 1;
        }
        else {
            // Bill Atkinson's dithering algorithm
            newPixel = imageData.data[currentPixel] < 129 ? 0 : 255;
            err = Math.floor((imageData.data[currentPixel] - newPixel) / 8);
            imageData.data[currentPixel] = newPixel;

            imageData.data[currentPixel + 4] += err;
            imageData.data[currentPixel + 8] += err;
            imageData.data[currentPixel + 4 * w - 4] += err;
            imageData.data[currentPixel + 4 * w] += err;
            imageData.data[currentPixel + 4 * w + 4] += err;
            imageData.data[currentPixel + 8 * w] += err;
        }

        // Set g and b pixels equal to r
        imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] =
            imageData.data[currentPixel];
    }

    return imageData;
};

export const createPosterizeCanvas = (inputCanvas, edit) => {
    const { colorsize } = edit;
    const { width: inputW, height: inputH } = inputCanvas;
    const inputCtx = inputCanvas.getContext("2d");
    let imgData = inputCtx.getImageData(0, 0, inputW, inputH);

    const newImgData = posterize(imgData, colorsize);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = inputW;
    outputCanvas.height = inputH;
    const outputCtx = outputCanvas.getContext("2d");
    outputCtx.putImageData(newImgData, 0, 0);

    return outputCanvas;
};

const posterize = (imgData, colorsize) => {
    colorsize = colorsize || 4;
    const pixelSize = imgData.width * imgData.height;
    let min = 255;
    let max = 0;
    let index;
    for (let i = 0; i < pixelSize; i++) {
        index = i * 4;
        if (imgData.data[index + 3] !== 0) {
            const value = imgData.data[index];
            if (value < min) {
                min = value
            }
            if (value > max) {
                max = value
            }
        }
    }
    const lookupTable = new Uint8Array(256);
    const colorWidth = (0.5 + ((max - min) / colorsize)) | 0;
    const stepSize = (0.5 + (256 / (colorsize - 1))) | 0;
    for (let level = 0; level < colorsize; level++) {
        for (let i = 0; i < colorWidth; i++) {
            index = min + (colorWidth * level) + i;
            let val = level * stepSize;
            if (val > 255) {
                val = 255
            }
            lookupTable[index] = val
        }
    }
    for (let i = index; i < 256; i++) {
        lookupTable[i] = 255
    }

    for (let i = 0; i < pixelSize; i++) {
        index = i * 4;
        imgData.data[index] = lookupTable[imgData.data[index]];
        imgData.data[index + 1] = lookupTable[imgData.data[index + 1]];
        imgData.data[index + 2] = lookupTable[imgData.data[index + 2]];
        imgData.data[index + 3] = imgData.data[index + 3];
    }

    return imgData
};

/*const dither = (imageData) => {
    /!*const bayermatrix = [
        [0, 128, 32, 160],
        [192, 64, 224, 96],
        [48, 176, 16, 144],
        [240, 112, 208, 80]
    ];*!/
    const bayermatrix = [
        [  15, 135,  45, 165 ],
        [ 195,  75, 225, 105 ],
        [  60, 180,  30, 150 ],
        [ 240, 120, 210,  90 ]
    ];
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const index = (x + (y * imageData.width)) * 4;
            if (imageData.data[index + 3] !== 0) {
                const level = imageData.data[index] > bayermatrix[y % 4][x % 4] ? 255 : 0;
                imageData.data[index] = level;
                imageData.data[index + 1] = level;
                imageData.data[index + 2] = level;
                imageData.data[index + 3] = 255;
            }
        }
    }
    return imageData
};*/

// source: https://gist.github.com/mjackson/5311256
export const rgbToHsl = ({ r, g, b }) => {
    const _r = r / 255;
    const _g = g / 255;
    const _b = b / 255;

    const max = Math.max(_r, _g, _b);
    const min = Math.min(_r, _g, _b);

    let h,
        s,
        l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case _r:
                h = (_g - _b) / d + (_g < _b ? 6 : 0);
                break;
            case _g:
                h = (_b - _r) / d + 2;
                break;
            case _b:
                h = (_r - _g) / d + 4;
                break;
            default:
                break;
        }

        h /= 6;
    }

    return { h, s, l };
};

const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

export const hslToRgb = ({ h, s, l }) => {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
};


