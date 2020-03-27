
export const createPixelStretcherCanvas = (inputCanvas, edit) => {
    const outputCanvas = document.createElement('canvas');
    const { hStretch={ pos: 0.5, size: 0.2 } } = edit;
    const sWidth = inputCanvas.width;
    const sHeight = inputCanvas.height;
    const hStretchSize = sWidth * hStretch.size;
    let hStretchPos = Math.min(Math.round(sWidth * hStretch.pos), sWidth-1);

    outputCanvas.width = sWidth + hStretchSize;
    outputCanvas.height = inputCanvas.height;

    const outputCtx = outputCanvas.getContext('2d');

    // left
    outputCtx.drawImage(
        inputCanvas,    0, 0, hStretchPos, sHeight,
                        0, 0, hStretchPos, sHeight);
    // middle
    outputCtx.drawImage(
        inputCanvas,    hStretchPos,    0,  1,              sHeight,
                        hStretchPos,    0,  hStretchSize,   sHeight);
    // right
    const rightSideWidth = sWidth - hStretchPos;
    outputCtx.drawImage(
        inputCanvas,    hStretchPos+1,              0,  rightSideWidth,   sHeight,
                        hStretchPos+hStretchSize,   0,  rightSideWidth,   sHeight);

    return outputCanvas;
};
