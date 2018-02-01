import React, { Component } from "react";
// styles
import './quickShare_styles.css';

const drawFrame = (ctx, startX, startY, width, height, thickness) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + width, startY);
    ctx.lineTo(startX + width, startY + height);
    ctx.lineTo(startX, startY + height);
    ctx.lineTo(startX, startY);
    ctx.fill();
};

const drawMount = (ctx, startX, startY, width, height, thickness) => {

    // draw basic mount rect
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(startX, startY, width, height);

    // draw mount edges
    const edgeThickness = 5;

    const innerTop = startY + thickness;
    const innerBottom = startY + height - thickness;
    const outerTop = innerTop - edgeThickness;
    const outerBottom = innerBottom + edgeThickness;

    const innerLeft = startX + thickness;
    const innerRight = startX + width - thickness;
    const outerLeft = innerLeft - edgeThickness;
    const outerRight = innerRight + edgeThickness;

    // top edge
    ctx.fillStyle = '#f1f1f1';
    drawPolygon(ctx, outerLeft, outerTop, outerRight, outerTop, innerRight, innerTop, innerLeft, innerTop);
    ctx.fill();

    // right edge
    ctx.fillStyle = '#cccccc';
    drawPolygon(ctx, outerRight, outerTop, innerRight, innerTop, innerRight, innerBottom, outerRight, outerBottom);
    ctx.fill();

    // bottom edge
    ctx.fillStyle = '#f1f1f1';
    drawPolygon(ctx, innerLeft, innerBottom, innerRight, innerBottom, outerRight, outerBottom, outerLeft, outerBottom);
    ctx.fill();

    // left edge
    ctx.fillStyle = '#cccccc';
    drawPolygon(ctx, outerLeft, outerTop, innerLeft, innerTop, innerLeft, innerBottom, outerLeft, outerBottom);
    ctx.fill();
};

const drawPolygon = (ctx,x1,y1,x2,y2,x3,y3,x4,y4)=>{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
};

class QuickShare extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("this.canvas: ", this.canvas);
        console.log("this.nextProps: ", nextProps);

        const { artworkData, width, height } = nextProps;
        const { sourceImg, widthToHeightRatio, heightToWidthRatio } = artworkData;
        const artworkSizes = calculateCanvasArtworkSizes(width, height, widthToHeightRatio, heightToWidthRatio);
        const { imgX, imgY, imgWidth, imgHeight, frameX, frameY, frameWidth, frameHeight, mountWidth, mountHeight, mountX, mountY, frameThickness, mountThickness } = artworkSizes;

        this.canvas.width = width;
        this.canvas.height = height;

        const ctx = this.canvas.getContext('2d');
        drawFrame(ctx, frameX, frameY, frameWidth, frameHeight, frameThickness);
        drawMount(ctx, mountX, mountY, mountWidth, mountHeight, mountThickness);


        ctx.drawImage(sourceImg, 0, 0, sourceImg.width, sourceImg.height, imgX, imgY, imgWidth, imgHeight);
    }

    render() {
        return (
            <canvas className={'quickShare--canvas'}
                    ref={(c) => this.canvas = c}
                    width={300}
                    height={300}/>
        );
    }
}

export default QuickShare;

const calculateCanvasArtworkSizes = function (width, height, widthToHeightRatio, heightToWidthRatio, minPaddingTop = 10, minPaddingSides = 10) {
    const frameThicknessPercent = 0.03;
    const mountThicknessPercent = 0.06;
    const spaceBelowPicturePercent = 0.02;

    const spaceBelowPicture = spaceBelowPicturePercent * height;

    let minPaddingLeft = minPaddingSides;
    const minPaddingRight = minPaddingSides;
    const minPaddingBottom = spaceBelowPicture;

    const maxWidth = width - (minPaddingLeft + minPaddingRight);
    const maxHeight = height - (minPaddingTop + minPaddingBottom);

    // calculate to maximise width
    let frameThickness = maxWidth * frameThicknessPercent;
    let mountThickness = maxWidth * mountThicknessPercent;
    let totalFrameAndMountThickness = (frameThickness * 2) + (mountThickness * 2);
    let imgWidth = maxWidth - totalFrameAndMountThickness;
    let imgHeight = imgWidth * widthToHeightRatio;
    let frameHeight = imgHeight + totalFrameAndMountThickness;

    // if it doesn't fit the height, calculate to maximise height
    if (frameHeight > maxHeight) {
        frameThickness = maxHeight * frameThicknessPercent;
        mountThickness = maxHeight * mountThicknessPercent;
        totalFrameAndMountThickness = (frameThickness * 2) + (mountThickness * 2);
        imgHeight = maxHeight - totalFrameAndMountThickness;
        imgWidth = imgHeight * heightToWidthRatio;
        frameHeight = imgHeight + totalFrameAndMountThickness;
    }

    let frameWidth = imgWidth + totalFrameAndMountThickness;
    // work out the padding around the picture
    const totalFramedPictureWidth = imgWidth + totalFrameAndMountThickness;
    const extraHorizontalSpace = width - (totalFramedPictureWidth + minPaddingLeft + minPaddingRight);
    const paddingLeft = minPaddingLeft + (extraHorizontalSpace / 2);

    const extraVerticalSpace = height - (imgHeight + totalFrameAndMountThickness + minPaddingTop + minPaddingBottom);
    const paddingTop = minPaddingTop + (extraVerticalSpace / 2);

    const frameX = paddingLeft;
    const frameY = paddingTop;
    const mountX = frameX + frameThickness;
    const mountY = frameY + frameThickness;
    const imgX = mountX + mountThickness;
    const imgY = mountY + mountThickness;
    const mountWidth = frameWidth - (frameThickness * 2);
    const mountHeight = frameHeight - (frameThickness * 2);

    return {
        imgX, imgY, frameX, frameY, mountX, mountY,
        frameWidth, frameHeight,
        mountWidth, mountHeight,
        imgWidth, imgHeight,
        frameThickness, mountThickness
    };
};