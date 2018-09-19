import { DEFAULT_COLOUR_SPLITTER_VALUES, LARGE_IMG_SIZE, MAX_IMG_SIZE } from "../../GLOBAL_CONSTANTS";

// Returns an image element given a file
export function GetImage(imgFile, callback) {
    GetPhotoOrientation(imgFile, (orientation) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgSrc = e.target.result;
            // Create a new image element
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous'); //
            img.src = imgSrc;

            // wait for it to be loaded and then return
            img.onload = (e) => {
                const w = img.width;
                const h = img.height;

                // if portrait these need to be reversed
                const isPortrait = orientation > 4 && orientation < 9;
                let widthToHeightRatio, heightToWidthRatio;

                if (isPortrait) {
                    widthToHeightRatio = Math.round(100 * (w / h)) / 100;
                    heightToWidthRatio = Math.round(100 * (h / w)) / 100;
                }
                else {
                    widthToHeightRatio = Math.round(100 * (h / w)) / 100;
                    heightToWidthRatio = Math.round(100 * (w / h)) / 100;
                }


                callback(img, orientation, widthToHeightRatio, heightToWidthRatio);
            }
        };
        reader.readAsDataURL(imgFile);
    })
}

export function getImageBlob({ source, maxSize, orientation = 1, cropData, quality = 0.95 }, callback) {
    const canvas = document.createElement('canvas');

    drawToCanvas({
        sourceCanvas: source,
        outputCanvas: canvas,
        orientation, cropData,
        maxOutputCanvasWidth: maxSize,
        maxOutputCanvasHeight: maxSize
    }, () => {

        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData)
        }, 'image/jpeg', quality);

    });
}

export function getDimensionRatios(w, h) {
    const widthToHeightRatio = Math.round(100 * (h / w)) / 100;
    const heightToWidthRatio = Math.round(100 * (w / h)) / 100;

    return { widthToHeightRatio, heightToWidthRatio };
}

// Reads file as Array buffer to get camera orientation from exif data
function GetPhotoOrientation(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const view = new DataView(e.target.result);

        if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
            let marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
                offset += 2;
                if (view.getUint32(offset, false) !== 0x45786966) return callback(-1);

                const little = view.getUint16(offset += 6, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) === 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) !== 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}

// Draws one canvas to another restricting to a specific size
export function drawToCanvas({ sourceCanvas, outputCanvas, orientation, cropData, maxOutputCanvasWidth = MAX_IMG_SIZE, maxOutputCanvasHeight = MAX_IMG_SIZE }, callback) {
    const { topPercent, rightPercent, bottomPercent, leftPercent } = cropData ?
        cropData : { topPercent: 0, rightPercent: 1, bottomPercent: 1, leftPercent: 0 };

    const isPortrait = orientation > 4 && orientation < 9;

    // switch height and width if it's portrait
    let imgW = isPortrait ? sourceCanvas.height : sourceCanvas.width;
    let imgH = isPortrait ? sourceCanvas.width : sourceCanvas.height;

    // work out the crop sizes from the percentages
    const leftCrop = imgW * leftPercent;
    const rightCrop = imgW * (1 - rightPercent);
    const topCrop = imgH * topPercent;
    const bottomCrop = imgH * (1 - bottomPercent);
    imgW -= leftCrop + rightCrop;
    imgH -= topCrop + bottomCrop;

    // Restrict to maximum image size allowed or sourceCanvas size, whichever is smaller
    const maxW = imgW >= maxOutputCanvasWidth ? maxOutputCanvasWidth : imgW;
    const maxH = imgH >= maxOutputCanvasHeight ? maxOutputCanvasHeight : imgH;

    const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(imgW, imgH);

    // const widthToHeightRatio = Math.round(100 * (imgH / imgW)) / 100;
    // const heightToWidthRatio = Math.round(100 * (imgW / imgH)) / 100;

    let canvasW = maxW;
    let canvasH = maxW * widthToHeightRatio;

    if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = maxH * heightToWidthRatio;
    }

    const ctx = outputCanvas.getContext('2d');
    // ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

    outputCanvas.width = canvasW;
    outputCanvas.height = canvasH;

    let xCropStart = leftCrop;
    let yCropStart = topCrop;

    // save the context so it can be reset after transform
    ctx.save();
    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, canvasW, 0);
            break;

        case 3:
            xCropStart = rightCrop;
            yCropStart = bottomCrop;
            ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
            break;

        case 4:
            ctx.transform(1, 0, 0, -1, 0, canvasH);
            break;

        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            xCropStart = topCrop;
            yCropStart = rightCrop;
            ctx.transform(0, 1, -1, 0, canvasW, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, canvasW, canvasH);
            break;
        case 8:
            xCropStart = bottomCrop;
            yCropStart = leftCrop;
            ctx.transform(0, -1, 1, 0, 0, canvasH);
            break;
        default:
            break;
    }

    const transformedCanvasW = isPortrait ? canvasH : canvasW;
    const transformedCanvasH = isPortrait ? canvasW : canvasH;

    const transformedImgW = isPortrait ? imgH : imgW;
    const transformedImgH = isPortrait ? imgW : imgH;

    // fill with white first so transparent pngs have white rather than black bg
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, transformedImgW, transformedImgH);

    // draw image: context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    ctx.drawImage(sourceCanvas, xCropStart, yCropStart, transformedImgW, transformedImgH, 0, 0, transformedCanvasW, transformedCanvasH);
    // restore ensures resets transform in case another image is added
    ctx.restore();

    if (callback) callback(widthToHeightRatio, heightToWidthRatio)
}

export function copyToCanvas(inputCanvas, outputCanvas) {
    const { width: inputWidth, height: inputHeight } = inputCanvas;

    outputCanvas.width = inputWidth;
    outputCanvas.height = inputHeight;

    const ctx = outputCanvas.getContext('2d');
    ctx.drawImage(inputCanvas, 0, 0);
}

export function drawToCanvasWithMaxSize(inputCanvas, _maxWidth, _maxHeight) {
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
    ctx.drawImage(inputCanvas, 0, 0, inputWidth, inputHeight, 0, 0, outputWidth, outputHeight);

    return outputCanvas;
}

export const getColourSplitterValues = (colourSplitterEdits) => {
    if (colourSplitterEdits) {
        const { cyanXPercent = 0, magentaXPercent = 0, yellowXPercent = 0 } = colourSplitterEdits;
        return { cyanXPercent, magentaXPercent, yellowXPercent };
    }
    else {
        // return a default if no data is set yet
        return DEFAULT_COLOUR_SPLITTER_VALUES;
    }
};

export const createOrientatedCanvas = (inputImage, orientation) => {
    const outputCanvas = document.createElement('canvas');
    drawToCanvas({
        sourceCanvas: inputImage,
        outputCanvas: outputCanvas,
        orientation: orientation,
        maxOutputCanvasWidth: LARGE_IMG_SIZE,
        maxOutputCanvasHeight: LARGE_IMG_SIZE
    });

    return outputCanvas;
};

export const loadImage = (url, callback) => {
    let sourceImg = new Image();
    sourceImg.setAttribute('crossOrigin', 'anonymous'); //
    sourceImg.src = url;
    sourceImg.onload = () => {
        if (callback) callback(sourceImg);
    }
};

export const createColourSplitCanvas = (inputCanvas, colourSplitEditValues) => {
    const { cyanXPercent, magentaXPercent, yellowXPercent } = getColourSplitterValues(colourSplitEditValues);

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

export const createArtworkCanvasFromSource = (artworkData, sourceCanvas) => {
    // draw the source image to a canvas

    // apply remaining transformations
};

export const createArtworkCanvas = (artworkData, sourceCanvas) => {
    // apply orientation if needed
    // const orientatedCanvas = drawOrientatedCanvas()
    // next apply any source image cropping
    // next look at editOrder array
    // for each apply the edit creating a new canvas
    // export the final canvas
};

export const drawOrientatedCanvas = (sourceCanvas, orientation) => {
    const outputCanvas = document.createElement('canvas');
    const isPortrait = orientation > 4 && orientation < 9;

    // switch height and width if it's portrait
    let canvasW = isPortrait ? sourceCanvas.height : sourceCanvas.width;
    let canvasH = isPortrait ? sourceCanvas.width : sourceCanvas.height;

    const ctx = outputCanvas.getContext('2d');

    outputCanvas.width = canvasW;
    outputCanvas.height = canvasH;

    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, canvasW, 0);
            break;

        case 3:
            ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
            break;

        case 4:
            ctx.transform(1, 0, 0, -1, 0, canvasH);
            break;

        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, canvasW, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, canvasW, canvasH);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, canvasH);
            break;
        default:
            break;
    }

    /*const transformedCanvasW = isPortrait ? canvasH : canvasW;
    const transformedCanvasH = isPortrait ? canvasW : canvasH;

    const transformedImgW = isPortrait ? imgH : imgW;
    const transformedImgH = isPortrait ? imgW : imgH;*/

    // draw image: context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    // ctx.drawImage(sourceCanvas, xCropStart, yCropStart, transformedImgW, transformedImgH, 0, 0, transformedCanvasW, transformedCanvasH);
    ctx.drawImage(sourceCanvas, 0, 0);

    return outputCanvas;
};

export const drawCroppedCanvas = (sourceCanvas, cropData) => {
    // if there's no cropping just return the sourceCanvas unchanged
    if (!cropData || cropData === { topPercent: 0, rightPercent: 1, bottomPercent: 1, leftPercent: 0 }) {
        return sourceCanvas;
    }

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
    ctx.drawImage(sourceCanvas, leftCrop, topCrop, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

    return outputCanvas;
};

export const getDimensionsToFit = (inputWidth, inputHeight, maxWidth, maxHeight) => {
    let outputWidth, outputHeight;
    const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(inputWidth, inputHeight);

    // if the width need reducing, set width to max and scale height accordingly
    if (inputWidth > maxWidth) {
        outputWidth = maxWidth;
        outputHeight = outputWidth * widthToHeightRatio;
    }
    // if the height need reducing, set height to max and scale width accordingly
    else if (inputHeight > maxHeight) {
        outputHeight = maxHeight;
        outputWidth = outputHeight * heightToWidthRatio;
    }
    // otherwise output can match input
    else {
        outputWidth = inputWidth;
        outputHeight = inputHeight;
    }

    return { width: outputWidth, height: outputHeight };
};