import React, { Component } from 'react';
// comps
import ArtworkCanvas from "./ArtworkCanvas";
import LoadingThing from "../loadingThing/LoadingThing";
import Shadow from "../../pages/gallery/Shadow";

class FramedArtworkCanvas extends Component {

    constructor(props) {
        super(props);

        this.drawFrame = this.drawFrame.bind(this);
        this.onFrameCanvasInit = this.onFrameCanvasInit.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { maxWidth: currMaxWidth, maxHeight: currMaxHeight, artworkData } = prevProps;
        const { maxWidth: newMaxWidth, maxHeight: newMaxHeight } = this.props;

        const newArtwork = artworkData !== this.props.artworkData;
        const screenSizeChange = currMaxHeight !== newMaxHeight || currMaxWidth !== newMaxWidth;

        if ((newArtwork || screenSizeChange) && newArtwork.isDeleted !== true) {
            this.drawFrame(this.props);
        }
    }

    // TODO: Don't think I can be sure artworkData will be available here
    onFrameCanvasInit(c) {
        if (c) {
            this.frameCanvas = c;
            this.drawFrame(this.props);
        }
    }

    drawFrame(props) {
        const ctx = this.frameCanvas.getContext('2d');

        const { artworkData, maxWidth, maxHeight } = props;
        if (!artworkData || !maxWidth || !maxHeight || artworkData.isDeleted) return;

        const { frameData, widthToHeightRatio:sourceWidthToHeightRatio, heightToWidthRatio:sourceHeightToWidthRatio, outputWidthToHeightRatio, outputHeightToWidthRatio } = artworkData;

        // use the edited values if set, otherwise use the values from the source image.
        const widthToHeightRatio = outputWidthToHeightRatio ? outputWidthToHeightRatio : sourceWidthToHeightRatio;
        const heightToWidthRatio = outputHeightToWidthRatio ? outputHeightToWidthRatio : sourceHeightToWidthRatio;

        const { frameThicknessDecimal, mountThicknessDecimal, frameColour, mountColour } = frameData;
        const { frameWidth, frameHeight, frameThickness, mountWidth, mountHeight, mountThickness } = calculateDimensions(maxWidth, maxHeight, heightToWidthRatio, widthToHeightRatio, frameThicknessDecimal, mountThicknessDecimal);

        this.frameCanvas.width = frameWidth;
        this.frameCanvas.height = frameHeight;

        drawCanvasFrame(ctx, 0, 0, frameWidth, frameHeight, frameThickness, frameColour);
        drawCanvasMount(ctx, frameThickness, frameThickness, mountWidth, mountHeight, mountThickness, mountColour)
    }

    render() {
        const { artworkData, maxWidth = 300, maxHeight = 300 } = this.props;

        if (!artworkData || artworkData.isDeleted) return (
            <LoadingThing/>
        );

        // use the edited values if set, otherwise use the values from the source image.
        const { frameData, widthToHeightRatio:sourceWidthToHeightRatio, heightToWidthRatio:sourceHeightToWidthRatio, outputWidthToHeightRatio, outputHeightToWidthRatio } = artworkData;

        // use the edited values if set, otherwise use the values from the source image.
        const widthToHeightRatio = outputWidthToHeightRatio ? outputWidthToHeightRatio : sourceWidthToHeightRatio;
        const heightToWidthRatio = outputHeightToWidthRatio ? outputHeightToWidthRatio : sourceHeightToWidthRatio;

        const { frameThicknessDecimal, mountThicknessDecimal } = frameData;

        if (!heightToWidthRatio || !widthToHeightRatio) return null;

        const { imgWidth, imgHeight, frameThickness, mountThickness, frameHeight, frameWidth, mountWidth } = calculateDimensions(maxWidth, maxHeight, heightToWidthRatio, widthToHeightRatio, frameThicknessDecimal, mountThicknessDecimal);
        const totalFrameThickness = frameThickness + mountThickness;

        const holderStyle = { position: 'relative', display: 'inline-block' };
        const artworkCanvasStyle = { position: 'absolute', left: totalFrameThickness, top: totalFrameThickness };

        const shadowHeightBelowBottomFrame = Math.min(frameHeight, frameWidth) * 0.03;
        const shadowHeightBelowBottomMount = Math.min(frameHeight, frameWidth) * 0.004;
        const shadowHeightBelowTopFrame = Math.min(frameHeight, frameWidth) * 0.008;

        const calcFrameHeight = imgHeight + (frameThickness + mountThickness) + (frameThickness + mountThickness);

        return (
            <div style={holderStyle}>
                <canvas ref={this.onFrameCanvasInit}/>

                <ArtworkCanvas artworkData={artworkData}
                               style={artworkCanvasStyle}
                               height={imgHeight} width={imgWidth}/>

                {frameThickness > 0 &&
                <Shadow height={shadowHeightBelowTopFrame}
                        width={mountWidth}
                        x={frameThickness}
                        y={frameThickness}/>
                }

                {mountThickness > 0 &&
                <Shadow height={shadowHeightBelowBottomMount}
                        width={imgWidth}
                        opacity={0.3}
                        x={frameThickness+mountThickness}
                        y={frameThickness+mountThickness}/>
                }

                <Shadow height={shadowHeightBelowBottomFrame}
                        width={frameWidth}
                        y={calcFrameHeight}
                        doubled={true}
                        angled={true}/>
            </div>
        )
    }
}

export default FramedArtworkCanvas;

const calculateDimensions = (maxWidth, maxHeight,
                             heightToWidthRatio, widthToHeightRatio,
                             frameThicknessDecimal, mountThicknessDecimal) => {

    const totalFrameAndMountProportion = frameThicknessDecimal + mountThicknessDecimal;
    const maxImageAreaDecimal = 1 - totalFrameAndMountProportion;

    const maxImgWidth = Math.round(maxWidth * maxImageAreaDecimal);
    const maxImgHeight = Math.round(maxHeight * maxImageAreaDecimal);

    const imgWidth = Math.round(Math.min(maxImgWidth, maxImgHeight * heightToWidthRatio));
    const imgHeight = Math.round(imgWidth * widthToHeightRatio);

    const largestSide = Math.max(imgWidth, imgHeight);

    let frameThickness = Math.round(largestSide * frameThicknessDecimal);
    let mountThickness = Math.round(largestSide * mountThicknessDecimal);

    const mountWidth = imgWidth + (mountThickness * 2);
    const mountHeight = imgHeight + (mountThickness * 2);

    const frameWidth = mountWidth + (frameThickness * 2);
    const frameHeight = mountHeight + (frameThickness * 2);

    return { frameWidth, frameHeight, frameThickness, mountWidth, mountHeight, mountThickness, imgWidth, imgHeight }
};


const drawCanvasFrame = (ctx, startX, startY, width, height, thickness, frameColour) => {
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
    const edgeThickness = 3;

    const innerTop = startY + thickness;
    const innerBottom = startY + height - thickness;
    const outerTop = innerTop - edgeThickness;
    const outerBottom = innerBottom + edgeThickness;

    const innerLeft = startX + thickness;
    const innerRight = startX + width - thickness;
    const outerLeft = innerLeft - edgeThickness;
    const outerRight = innerRight + edgeThickness;

    // top edge
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    drawPolygon(ctx, outerLeft, outerTop, outerRight, outerTop, innerRight, innerTop, innerLeft, innerTop);
    ctx.fill();

    // right edge
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    drawPolygon(ctx, outerRight, outerTop, innerRight, innerTop, innerRight, innerBottom, outerRight, outerBottom);
    ctx.fill();

    // bottom edge
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    drawPolygon(ctx, innerLeft, innerBottom, innerRight, innerBottom, outerRight, outerBottom, outerLeft, outerBottom);
    ctx.fill();

    // left edge
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    drawPolygon(ctx, outerLeft, outerTop, innerLeft, innerTop, innerLeft, innerBottom, outerLeft, outerBottom);
    ctx.fill();
};

const drawCanvasMount = (ctx, startX, startY, width, height, thickness, mountColour) => {
    const { hue, saturation, lightness } = mountColour;

    if (thickness === 0) return;

    // draw basic mount rect
    ctx.beginPath();
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
    ctx.fillRect(startX, startY, width, height);

    // draw mount edges
    const edgeThickness = 3;

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
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 6}%, 1)`;
    drawPolygon(ctx, outerLeft, outerTop, outerRight, outerTop, innerRight, innerTop, innerLeft, innerTop);
    ctx.fill();

    // right edge
    // ctx.fillStyle = '#cccccc';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 12}%, 1)`;
    drawPolygon(ctx, outerRight, outerTop, innerRight, innerTop, innerRight, innerBottom, outerRight, outerBottom);
    ctx.fill();

    // bottom edge
    ctx.fillStyle = '#f1f1f1';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 6}%, 1)`;
    drawPolygon(ctx, innerLeft, innerBottom, innerRight, innerBottom, outerRight, outerBottom, outerLeft, outerBottom);
    ctx.fill();

    // left edge
    // ctx.fillStyle = '#cccccc';
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 12}%, 1)`;
    drawPolygon(ctx, outerLeft, outerTop, innerLeft, innerTop, innerLeft, innerBottom, outerLeft, outerBottom);
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