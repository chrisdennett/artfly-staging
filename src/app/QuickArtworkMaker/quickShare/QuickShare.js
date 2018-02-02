import React, { Component } from "react";
// styles
import './quickShare_styles.css';
// images
import WallTile from './../../images/brickwall.png';
import FloorboardsTile from './../../images/floor-boards.png';

class QuickShare extends Component {

    constructor(props) {
        super(props);

        this.setupCanvas = this.setupCanvas.bind(this);
        this.onCanvasInit = this.onCanvasInit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setupCanvas(nextProps);
    }

    onCanvasInit(canvas) {
        this.canvas = canvas;
        this.setupCanvas(this.props);
    }

    setupCanvas(props) {
        const { artworkData, width, height } = props;

        // prevent errors by stopping if critical elements not available
        if (!this.canvas || width < 1 || height < 1 || !artworkData) {
            return null;
        }

        const { sourceImg, widthToHeightRatio, heightToWidthRatio } = artworkData;

        const artworkSizes = calculateCanvasArtworkSizes(width, height, widthToHeightRatio, heightToWidthRatio);
        const {
                  imgX, imgY, imgWidth, imgHeight,
                  frameX, frameY, frameWidth, frameHeight, frameThickness,
                  mountX, mountY, mountWidth, mountHeight, mountThickness,
                  skirtingY, skirtingHeight, floorY, floorHeight
              } = artworkSizes;

        this.canvas.width = width;
        this.canvas.height = height;

        const wallHeight = height - floorHeight;

        const ctx = this.canvas.getContext('2d');


        drawWall(ctx, 0, 0, width, height, () => {
            // add the floor
            drawFloor(ctx, 0, floorY, width, floorHeight, () => {

                drawRadialGradientOverlay(ctx, width, wallHeight);

                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.4)';
                ctx.shadowBlur = 25;
                ctx.shadowOffsetX = 9;
                ctx.shadowOffsetY = 15;

                ctx.fillStyle = 'white';
                ctx.fillRect(frameX, frameY, frameWidth, frameHeight);
                ctx.restore(); // clear it or will be added to everything

                drawFrame(ctx, frameX, frameY, frameWidth, frameHeight, frameThickness);
                drawMount(ctx, mountX, mountY, mountWidth, mountHeight, mountThickness);

                // add artwork
                ctx.drawImage(sourceImg, 0, 0, sourceImg.width, sourceImg.height, imgX, imgY, imgWidth, imgHeight);

                // add skirting board
                drawSkirtingBoard(ctx, 0, skirtingY, width, skirtingHeight);





            });
        });
    }

    render() {
        return (
            <canvas className={'quickShare--canvas'}
                    ref={this.onCanvasInit}
                    width={300}
                    height={300}/>
        );
    }
}

export default QuickShare;

const drawFrame = (ctx, startX, startY, width, height, thickness) => {
    // draw basic mount rect
    /*ctx.beginPath();
    ctx.fillStyle = '#64048b';
    ctx.fillRect(startX, startY, width, height);*/

    // top frame section
    ctx.fillStyle = '#d6b000';
    drawPolygon(ctx,
        startX, startY,
        startX + width, startY,
        startX + width - thickness, startY + thickness,
        startX + thickness, startY + thickness);
    ctx.fill();

    // right frame section
    ctx.fillStyle = '#64048b';
    drawPolygon(ctx,
        startX + width - thickness, startY +thickness,
        startX + width, startY,
        startX + width, startY + height,
        startX + width - thickness, startY + height - thickness);
    ctx.fill();

    // bottom frame section
    ctx.fillStyle = '#d6b000';
    drawPolygon(ctx,
        startX + thickness, startY + height - thickness,
        startX + width - thickness, startY + height - thickness,
        startX + width, startY + height,
        startX, startY + height);
    ctx.fill();

    // left frame section
    ctx.fillStyle = '#64048b';
    drawPolygon(ctx,
        startX, startY,
        startX + thickness, startY + thickness,
        startX + thickness, startY + height - thickness,
        startX, startY + height);
    ctx.fill();


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

const drawMount = (ctx, startX, startY, width, height, thickness) => {

    // draw basic mount rect
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(startX, startY, width, height);

    // draw mount edges
    const edgeThickness = 2;

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

const drawPolygon = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
};

const drawSkirtingBoard = (ctx, startX, startY, width, height) => {
    const topBarPercent = 0.16;
    const topBarShadowPercent = 0.04;
    const bottomShadowPercent = 0.01;
    const mainPanelPercent = 1 - (topBarPercent + topBarShadowPercent + bottomShadowPercent);

    const topBarHeight = height * topBarPercent;
    const topBarShadowHeight = height * topBarShadowPercent;
    const mainPanelHeight = height * mainPanelPercent;
    const bottomShadowHeight = height * bottomShadowPercent;

    const topBarShadowY = startY + topBarHeight;
    const mainPanelY = topBarShadowY + topBarShadowHeight;
    const bottomShadowY = mainPanelY + mainPanelHeight;

    // top bar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(startX, startY, width, topBarHeight);

    // main panel
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(startX, mainPanelY, width, mainPanelHeight);

    // top bar shadow
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(startX, topBarShadowY, width, topBarShadowHeight);

    // top bar shadow
    ctx.fillStyle = '#515151';
    ctx.fillRect(startX, bottomShadowY, width, bottomShadowHeight);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(0,0,0,0.08)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.08)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, startY, width, height);
};

const drawFloor = (ctx, startX, startY, width, height, callback) => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = FloorboardsTile;
    img.onload = () => {
        const pat = ctx.createPattern(img, "repeat");
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fillStyle = pat;
        ctx.fill();
        ctx.closePath();

        if (callback) callback();
    };
};

const drawWall = (ctx, startX, startY, width, height, callback) => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = WallTile;
    img.onload = () => {
        const pat = ctx.createPattern(img, "repeat");
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fillStyle = pat;
        ctx.fill();
        ctx.closePath();

        if (callback) callback();
    };
};

const drawRadialGradientOverlay = (ctx, width, height) => {
    let gradient = ctx.createRadialGradient(width / 2, height / 2, width / 2, width / 2, height / 2, width / 5);
    gradient.addColorStop(0, 'rgba(0,0,0,0.17)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
};


const calculateCanvasArtworkSizes = function (width, height, widthToHeightRatio, heightToWidthRatio, minPaddingTop = 10, minPaddingSides = 50) {
    const frameThicknessPercent = 0.04;
    const mountThicknessPercent = 0.06;
    const spaceBelowPicturePercent = 0.15;
    const maxPercentageTakenUpBySkirting = 0.3;
    const maxSkirtingHeight = 34;
    const minGapPercent = 0.3;

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

    let skirtingHeight = spaceBelowPicture * maxPercentageTakenUpBySkirting;
    if (skirtingHeight > maxSkirtingHeight) skirtingHeight = maxSkirtingHeight;
    const gapBetweenPictureAndSkirting = spaceBelowPicture * minGapPercent;

    const skirtingY = height - (spaceBelowPicture - gapBetweenPictureAndSkirting);
    const floorY = skirtingY + skirtingHeight;
    const floorHeight = height - floorY;

    return {
        skirtingY, skirtingHeight, floorY, floorHeight,
        imgX, imgY, frameX, frameY, mountX, mountY,
        frameWidth, frameHeight,
        mountWidth, mountHeight,
        imgWidth, imgHeight,
        frameThickness, mountThickness
    };
};