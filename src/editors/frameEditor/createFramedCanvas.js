import { getDimensionRatios } from "../../components/global/UTILS";

// https://www.codeandweb.com/free-sprite-sheet-packer
export const createFramedCanvas = (artworkCanvas, frameData, frameSpriteSheet) => {
    const outputCanvas = document.createElement('canvas');
    const { frameThicknessDecimal, mountThicknessDecimal, frameDepthFraction = 0.003, mountDepthFraction = 0.003, mountColour, frameColour, frameType } = frameData;
    const largestSide = Math.max(artworkCanvas.width, artworkCanvas.height);
    const { widthToHeightRatio } = getDimensionRatios(artworkCanvas.width, artworkCanvas.height)

    const outputCtx = outputCanvas.getContext('2d');

    let frameThickness = Math.round(largestSide * frameThicknessDecimal);
    let mountThickness = Math.round(largestSide * mountThicknessDecimal);
    let frameDepth = Math.round(largestSide * frameDepthFraction);
    let mountDepth = Math.round(largestSide * mountDepthFraction);
    const mountX = frameThickness;
    const mountY = frameThickness;
    const frameWidth = artworkCanvas.width;
    const mountWidth = frameWidth - (frameThickness * 2);
    const artworkX = mountX + mountThickness;
    const artworkY = mountY + mountThickness;
    const artworkWidth = mountWidth - (mountThickness * 2);
    const artworkHeight = artworkWidth * widthToHeightRatio;

    const mountHeight = artworkHeight + (mountThickness * 2);
    const frameHeight = mountHeight + (frameThickness * 2);

    outputCanvas.width = frameWidth;
    outputCanvas.height = frameHeight;

    drawCanvasFrame(outputCtx, 0, 0, frameWidth, frameHeight, frameThickness, frameDepth, frameColour, frameSpriteSheet, frameType);
    drawCanvasMount(outputCtx, mountX, mountY, mountWidth, mountHeight, mountThickness, mountDepth, mountColour);

    outputCtx.drawImage(artworkCanvas, artworkX, artworkY, artworkWidth, artworkHeight);

    if (frameThickness > 0) {
        const shadowOpacity = frameType === 'ornate' ? 0.9 : 0.3;

        // draw frame shadows
        drawInnerShadow(outputCtx, mountX, mountY, mountWidth, mountHeight, 0.007, shadowOpacity);
        drawInnerShadow(outputCtx, mountX, mountY, mountWidth, mountHeight, -0.004, shadowOpacity - 0.1);
    }

    if (mountThickness > 0) {
        // draw mount shadows
        drawInnerShadow(outputCtx, artworkX, artworkY, artworkWidth, artworkHeight, 0.003, 0.7);
        drawInnerShadow(outputCtx, artworkX, artworkY, artworkWidth, artworkHeight, -0.003, 0.5);
    }

    return outputCanvas;
};
const drawInnerShadow = (ctx, startX, startY, width, height, offsetFraction, opacity = 0.9) => {
    ctx.shadowOffsetX = offsetFraction * width;
    ctx.shadowOffsetY = offsetFraction * width;
    ctx.shadowBlur = 0.01 * width;
    ctx.shadowColor = `rgba(0, 0, 0, ${opacity})`;

    const sizeDiff = 10;
    const doubleSizeDiff = sizeDiff * 2;

    const bigRectLeft = startX - sizeDiff;
    const bigRectTop = startY - sizeDiff;
    const bigRectRight = bigRectLeft + width + doubleSizeDiff;
    const bigRectBottom = bigRectTop + height + doubleSizeDiff;

    const smallRectLeft = startX;
    const smallRectTop = startY;
    const smallRectRight = smallRectLeft + width;
    const smallRectBottom = smallRectTop + height;

    // hide the frame shape used to generate the shadow
    // could probably use a stroke instead
    ctx.rect(startX, startY, width, height);
    ctx.clip();

    // draw anti-clockwise
    ctx.beginPath();
    ctx.moveTo(bigRectRight, bigRectBottom);
    ctx.lineTo(bigRectRight, bigRectTop);
    ctx.lineTo(bigRectLeft, bigRectTop);
    ctx.lineTo(bigRectLeft, bigRectBottom);
    ctx.lineTo(bigRectRight, bigRectBottom);

    // then clockwise to cut out a frame shape
    // the shadow on the inner edge is what's seen
    ctx.moveTo(smallRectLeft, smallRectTop);
    ctx.lineTo(smallRectRight, smallRectTop);
    ctx.lineTo(smallRectRight, smallRectBottom);
    ctx.lineTo(smallRectLeft, smallRectBottom);

    ctx.closePath();
    ctx.fill();
};

const drawCanvasFrame = (ctx, startX, startY, width, height, thickness, frameDepth, frameColour, frameSpriteSheet, frameType) => {

    if (frameType === 'ornate') {
        drawFancyFrame(ctx, startX, startY, width, height, thickness, frameDepth, frameColour, frameSpriteSheet);
    }
    else {
        drawSimpleFrame(ctx, startX, startY, width, height, thickness, frameDepth, frameColour);
    }
};

// https://www.codeandweb.com/free-sprite-sheet-packer
const drawFancyFrame = (ctx, startX, startY, width, height, thickness, frameDepth, frameColour, frameSpriteSheet) => {

    // corners
    const { x: tlX, y: tlY, h: tlH, w: tlW } = fancyFrameJson['corner-top-left'];
    const { x: trX, y: trY, h: trH, w: trW } = fancyFrameJson['corner-top-right'];
    const { x: blX, y: blY, h: blH, w: blW } = fancyFrameJson['corner-bottom-left'];
    const { x: brX, y: brY, h: brH, w: brW } = fancyFrameJson['corner-bottom-right'];

    const frameScale = thickness / tlH;

    ctx.drawImage(frameSpriteSheet, tlX, tlY, tlW, tlH, startX, startY, thickness, thickness);
    ctx.drawImage(frameSpriteSheet, trX, trY, trW, trH, width - thickness, startY, thickness, thickness);
    ctx.drawImage(frameSpriteSheet, blX, blY, blW, blH, startX, height - thickness, thickness, thickness);
    ctx.drawImage(frameSpriteSheet, brX, brY, brW, brH, width - thickness, height - thickness, thickness, thickness);

    // corner extensions
    const { x: tlhX, y: tlhY, h: tlhH, w: tlhW } = fancyFrameJson['corner-extension-top-left-horizontal'];
    const { x: trhX, y: trhY, h: trhH, w: trhW } = fancyFrameJson['corner-extension-top-right-horizontal'];
    const { x: tlvX, y: tlvY, h: tlvH, w: tlvW } = fancyFrameJson['corner-extension-top-left-vertical'];
    const { x: trvX, y: trvY, h: trvH, w: trvW } = fancyFrameJson['corner-extension-top-right-vertical'];
    const { x: blhX, y: blhY, h: blhH, w: blhW } = fancyFrameJson['corner-extension-bottom-left-horizontal'];
    const { x: brhX, y: brhY, h: brhH, w: brhW } = fancyFrameJson['corner-extension-bottom-right-horizontal'];
    const { x: blvX, y: blvY, h: blvH, w: blvW } = fancyFrameJson['corner-extension-bottom-left-vertical'];
    const { x: brvX, y: brvY, h: brvH, w: brvW } = fancyFrameJson['corner-extension-bottom-right-vertical'];
    const cornerWidth = thickness + (tlhW * frameScale);
    const cornerHeight = thickness + (tlvH * frameScale);
    const middleWidth = width - (cornerWidth * 2);
    const middleHeight = height - (cornerHeight * 2);
    // top left
    ctx.drawImage(frameSpriteSheet, tlhX, tlhY, tlhW, tlhH, startX + thickness, startY, (tlhW * frameScale) + 1, thickness);
    ctx.drawImage(frameSpriteSheet, trhX, trhY, trhW, trhH, width - cornerWidth - 1, startY, (trhW * frameScale) + 1, thickness);
    // top right
    ctx.drawImage(frameSpriteSheet, tlvX, tlvY, tlvW, tlvH, startX, startY + thickness, thickness, (tlvH * frameScale) + 1);
    ctx.drawImage(frameSpriteSheet, trvX, trvY, trvW, trvH, width - thickness, startY + thickness, thickness, (trvH * frameScale) + 1);

    // bottom left
    ctx.drawImage(frameSpriteSheet, blhX, blhY, blhW, blhH, startX + thickness, height - thickness, (blhW * frameScale) + 1, thickness);
    ctx.drawImage(frameSpriteSheet, brhX, brhY, brhW, brhH, width - cornerWidth - 1, height - thickness, (brhW * frameScale) + 1, thickness);
    // bottom right
    ctx.drawImage(frameSpriteSheet, blvX, blvY, blvW, blvH, startX, height - cornerHeight - 1, thickness, (blvH * frameScale) + 1);
    ctx.drawImage(frameSpriteSheet, brvX, brvY, brvW, brvH, width - thickness, height - cornerHeight - 1, thickness, (brvH * frameScale) + 1);

    // top middle
    repeatImageToFill({ ctx, thickness, frameScale, horizontal: true, x: startX + cornerWidth, y: startY, width: middleWidth, sliceImg: frameSpriteSheet, sliceData: fancyFrameJson['horizontal-slice-top'] })

    // bottom middle
    repeatImageToFill({ ctx, thickness, frameScale, horizontal: true, x: startX + cornerWidth, y: height - thickness, width: middleWidth, sliceImg: frameSpriteSheet, sliceData: fancyFrameJson['horizontal-slice-bottom'] })

    // left middle
    repeatImageToFill({ ctx, thickness, frameScale, vertical: true, x: startX, y: startY + cornerHeight, height: middleHeight, sliceImg: frameSpriteSheet, sliceData: fancyFrameJson['vertical-slice-left'] })

    // right middle
    repeatImageToFill({ ctx, thickness, frameScale, vertical: true, x: width - thickness, y: startY + cornerHeight, height: middleHeight, sliceImg: frameSpriteSheet, sliceData: fancyFrameJson['vertical-slice-right'] })

    drawFrameInnerEdges(ctx, startX, startY, width, height, thickness, frameDepth);
}

const repeatImageToFill = ({ ctx, thickness, frameScale, horizontal = false, vertical = false, x, y, width, height, sliceImg, sliceData }) => {

    const { x: sliceX, y: sliceY, h: sliceH, w: sliceW } = sliceData;

    if (horizontal) {
        const scaledSliceW = sliceW * frameScale;

        const slicesNeeded = Math.round(width / scaledSliceW);
        const adjustedSliceWidth = width / slicesNeeded;

        let xPos = x;

        for (let i = 0; i < slicesNeeded; i++) {
            ctx.drawImage(sliceImg, sliceX, sliceY, sliceW, sliceH, xPos - 1, y, adjustedSliceWidth + 1, thickness);
            xPos += adjustedSliceWidth;
        }
    }

    if (vertical) {
        const scaledSliceH = sliceH * frameScale;

        const slicesNeeded = Math.round(height / scaledSliceH);
        const adjustedSliceHeight = height / slicesNeeded;

        let yPos = y;

        for (let i = 0; i < slicesNeeded; i++) {
            ctx.drawImage(sliceImg, sliceX, sliceY, sliceW, sliceH, x, yPos - 1, thickness, adjustedSliceHeight + 1);
            yPos += adjustedSliceHeight;
        }
    }
}

const drawSimpleFrame = (ctx, startX, startY, width, height, thickness, frameDepth, frameColour) => {
    const { hue, saturation, lightness } = frameColour;

    if (thickness === 0) return;

    // if you don't draw a rectangle behind you get seams see:https://stackoverflow.com/questions/19319963/how-to-avoid-seams-between-filled-areas-in-canvas
    // ctx.fillStyle = '#4c4c4c';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
    ctx.fillRect(startX, startY, width, height);

    // top frame section
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
    drawPolygon(ctx,
        startX, startY,
        startX + width, startY,
        startX + width - thickness, startY + thickness,
        startX + thickness, startY + thickness);
    ctx.fill();

    // right frame section
    // ctx.fillStyle = '#3b3b3b';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 5}%, 1)`;
    drawPolygon(ctx,
        startX + width - thickness, startY + thickness,
        startX + width, startY,
        startX + width, startY + height,
        startX + width - thickness, startY + height - thickness);
    ctx.fill();

    // bottom frame section
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 1)`;
    drawPolygon(ctx,
        startX + thickness, startY + height - thickness,
        startX + width - thickness, startY + height - thickness,
        startX + width, startY + height,
        startX, startY + height);
    ctx.fill();

    // left frame section
    // ctx.fillStyle = '#3b3b3b';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 5}%, 1)`;
    drawPolygon(ctx,
        startX, startY,
        startX + thickness, startY + thickness,
        startX + thickness, startY + height - thickness,
        startX, startY + height);
    ctx.fill();

    // draw frame edges
    drawFrameInnerEdges(ctx, startX, startY, width, height, thickness, frameDepth);
};

const drawFrameInnerEdges = (ctx, startX, startY, width, height, thickness, edgeThickness) => {

    const innerTop = startY + thickness;
    const innerBottom = startY + height - thickness;
    const outerTop = innerTop - edgeThickness;
    const outerBottom = innerBottom + edgeThickness;

    const innerLeft = startX + thickness;
    const innerRight = startX + width - thickness;
    const outerLeft = innerLeft - edgeThickness;
    const outerRight = innerRight + edgeThickness;

    // top edge
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    drawPolygon(ctx, outerLeft, outerTop, outerRight, outerTop, innerRight, innerTop, innerLeft, innerTop);
    ctx.fill();

    // left edge
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    drawPolygon(ctx, outerLeft, outerTop, innerLeft, innerTop, innerLeft, innerBottom, outerLeft, outerBottom);
    ctx.fill();

    // right edge
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    drawPolygon(ctx, outerRight, outerTop, innerRight, innerTop, innerRight, innerBottom, outerRight, outerBottom);
    ctx.fill();

    // bottom edge
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    drawPolygon(ctx, innerLeft, innerBottom, innerRight, innerBottom, outerRight, outerBottom, outerLeft, outerBottom);
    ctx.fill();
}

const drawCanvasMount = (ctx, startX, startY, width, height, thickness, mountDepth, mountColour) => {
    const { hue, saturation, lightness } = mountColour;

    if (thickness === 0) return;

    // draw basic mount rect
    ctx.beginPath();
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
    ctx.fillRect(startX, startY, width, height);

    // draw mount edges
    const edgeThickness = mountDepth;

    const innerTop = startY + thickness;
    const innerBottom = startY + height - thickness;
    const outerTop = innerTop - edgeThickness;
    const outerBottom = innerBottom + edgeThickness;

    const innerLeft = startX + thickness;
    const innerRight = startX + width - thickness;
    const outerLeft = innerLeft - edgeThickness;
    const outerRight = innerRight + edgeThickness;

    // top edge
    // ctx.fillStyle = '#f1f1f1';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 15}%, 1)`;
    drawPolygon(ctx, outerLeft, outerTop, outerRight, outerTop, innerRight, innerTop, innerLeft, innerTop);
    ctx.fill();

    // left edge
    // ctx.fillStyle = '#cccccc';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 17}%, 1)`;
    drawPolygon(ctx, outerLeft, outerTop, innerLeft, innerTop, innerLeft, innerBottom, outerLeft, outerBottom);
    ctx.fill();

    // right edge
    // ctx.fillStyle = '#cccccc';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 6}%, 1)`;
    drawPolygon(ctx, outerRight, outerTop, innerRight, innerTop, innerRight, innerBottom, outerRight, outerBottom);
    ctx.fill();

    // bottom edge
    ctx.fillStyle = '#f1f1f1';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 6}%, 1)`;
    drawPolygon(ctx, innerLeft, innerBottom, innerRight, innerBottom, outerRight, outerBottom, outerLeft, outerBottom);
    ctx.fill();

};
const drawPolygon = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
};


const fancyFrameJson = {
    "corner-bottom-left": {
        "x": 1,
        "y": 1,
        "w": 153,
        "h": 150
    },
    "corner-bottom-right": {
        "x": 156,
        "y": 1,
        "w": 153,
        "h": 150
    },
    "corner-extension-bottom-left-horizontal": {
        "x": 311,
        "y": 1,
        "w": 34,
        "h": 150
    },
    "corner-extension-bottom-left-vertical": {
        "x": 1,
        "y": 153,
        "w": 153,
        "h": 41
    },
    "corner-extension-bottom-right-horizontal": {
        "x": 347,
        "y": 1,
        "w": 34,
        "h": 150
    },
    "corner-extension-bottom-right-vertical": {
        "x": 157,
        "y": 153,
        "w": 153,
        "h": 41
    },
    "corner-extension-top-left-horizontal": {
        "x": 383,
        "y": 1,
        "w": 34,
        "h": 150
    },
    "corner-extension-top-left-vertical": {
        "x": 1,
        "y": 196,
        "w": 153,
        "h": 41
    },
    "corner-extension-top-right-horizontal": {
        "x": 312,
        "y": 153,
        "w": 34,
        "h": 150
    },
    "corner-extension-top-right-vertical": {
        "x": 156,
        "y": 196,
        "w": 153,
        "h": 41
    },
    "corner-top-left": {
        "x": 1,
        "y": 239,
        "w": 153,
        "h": 150
    },
    "corner-top-right": {
        "x": 156,
        "y": 239,
        "w": 153,
        "h": 150
    },
    "horizontal-slice-bottom": {
        "x": 348,
        "y": 154,
        "w": 82,
        "h": 151
    },
    "horizontal-slice-top": {
        "x": 432,
        "y": 1,
        "w": 82,
        "h": 150
    },
    "vertical-slice-left": {
        "x": 311,
        "y": 306,
        "w": 153,
        "h": 77
    },
    "vertical-slice-right": {
        "x": 312,
        "y": 385,
        "w": 153,
        "h": 77
    }
}