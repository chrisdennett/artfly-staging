import { createContrastCanvas, createGreyscaleCanvas } from "../canvasCreators";

export const createContrastEditorCanvas = (inputCanvas, edit) => {
    const { threshold=0.5, palette } = edit;

    const { colours } = palette;

    const inputWidth = inputCanvas.width;
    const inputHeight = inputCanvas.height;
    const totalColours = colours.length - 1;

    const greyscaleCanvas = createGreyscaleCanvas(inputCanvas);
    const thresholdPalette = createContrastCanvas(greyscaleCanvas, { threshold });

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

        if(allReds.indexOf(col.r) < 0){
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
