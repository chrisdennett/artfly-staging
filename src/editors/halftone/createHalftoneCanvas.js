import { copyToCanvas } from "../canvasCreators";

export const createHalftoneCanvas = (inputCanvas, edit) => {
    let {
            gridRows      = 100,
            minOutputSize = 960
        } = edit;

    // draw input to small canvas matching the number of pixels needed.
    const pixelCanvas = document.createElement('canvas');
    const widthToHeightRatio = inputCanvas.height / inputCanvas.width;
    // needs to be floored because we're only adding whole blocks
    const pixelsHigh = Math.floor(gridRows * widthToHeightRatio);

    pixelCanvas.width = gridRows;
    pixelCanvas.height = pixelsHigh;
    copyToCanvas(inputCanvas, pixelCanvas, false);

    // create an output
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = Math.max(inputCanvas.width, minOutputSize);

    const blockSize = Math.round(outputCanvas.width / gridRows);
    outputCanvas.width = gridRows * blockSize;
    outputCanvas.height = pixelsHigh * blockSize;

    const inputCtx = pixelCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext("2d");

    let imageData = inputCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    let pixels = imageData.data;

    // fill with bg colour first
    outputCtx.fillStyle = '#fff';
    outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

    let r, g, b, x, y, i;
    const circleEndAngle = 2 * Math.PI;
    const pixelColour = `#000`;
    const maxBlobSize = blockSize * 1.3;
    const halfBlockSize = blockSize / 2;

    for (y = 0; y < pixelCanvas.height; y++) {
        for (x = 0; x < pixelCanvas.width; x++) {
            i = (x + (y * pixelCanvas.width)) * 4;

            r = pixels[i];
            g = pixels[i + 1];
            b = pixels[i + 2];

            // const brightness = (r + g + b) / 3;
            const grey = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
            const brightness = 1 - (grey / 255);
            const blobSize = brightness * maxBlobSize;

            const left = (x * blockSize) + halfBlockSize;
            const top = (y * blockSize) + halfBlockSize;

            drawRoundPixel(outputCtx, pixelColour, left, top, blobSize, { circleRadius: blobSize / 2, circleEndAngle });
        }
    }

    return outputCanvas;
};

export const drawRoundPixel = (ctx, colour, x, y, size, loopVars) => {
    const {
              circleEndAngle = 2 * Math.PI,
              circleRadius   = size / 2
          } = loopVars;

    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, circleEndAngle);
    ctx.fill();
};

/*export const createGreyscaleCanvas = (inputCanvas) => {
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
};*/
