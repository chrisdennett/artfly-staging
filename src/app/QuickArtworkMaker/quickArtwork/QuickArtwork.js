import React, { Component } from "react";
// styles
import './quickArtwork_styles.css';
// images

import GuardRailTile from './../../images/guard-rail.png';
// import WallTile from './../../images/brickwall.png';
// import WallTile from './../../images/Concrete-8.jpg';
// import FloorboardsTile from './../../images/floor-boards.png';
// import People from './../../images/bench-girls-sillhouette-400-260.png';
// import People from './../../images/business-2089532_640.png';

class QuickArtwork extends Component {

    constructor(props) {
        super(props);

        this.setupCanvas = this.setupCanvas.bind(this);
        this.onCanvasInit = this.onCanvasInit.bind(this);
        this.loadImageTiles = this.loadImageTiles.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setupCanvas(nextProps);
    }

    onCanvasInit(canvas) {
        this.canvas = canvas;
        this.setupCanvas(this.props);
        if (this.props.onCanvasSetUp) this.props.onCanvasSetUp(canvas)
    }

    // TODO: Could be split out into helper function
    loadImageTiles(wallTileUrl, floorTileUrl) {
        this.setState({ wallTileUrl, floorTileUrl }, () => {
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous'); //
            // img.src = WallTile;
            img.src = wallTileUrl;

            img.onload = () => {
                this.wallTile = img;
                let img2 = new Image();
                img2.setAttribute('crossOrigin', 'anonymous'); //
                // img2.src = FloorboardsTile;
                img2.src = floorTileUrl;
                img2.onload = () => {

                    this.floorTile = img2;

                    let img3 = new Image();
                    img3.setAttribute('crossOrigin', 'anonymous'); //
                    img3.src = GuardRailTile;
                    img3.onload = () => {
                        this.guardTile = img3;
                        this.setupCanvas(this.props);
                    };
                }
            };

        })

    }

    setupCanvas(props) {
        const { width, height, artworkData, masterCanvas } = props;

        let { cropData, frameData, titlesData, roomData, widthToHeightRatio, heightToWidthRatio } = artworkData;
        // CROP DATA
        const { leftPercent, rightPercent, topPercent, bottomPercent } = cropData;
        // FRAME DATA
        const { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour } = frameData;
        // ROOM DATA
        const { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail } = roomData;

        // prevent errors by stopping if critical elements not available
        if (!this.canvas || width < 1 || height < 1 || !masterCanvas) {
            return null;
        }

        if (!this.wallTile || !this.floorTile || !this.guardTile || wallTileUrl !== this.state.wallTileUrl || floorTileUrl !== this.state.floorTileUrl) {
            this.loadImageTiles(wallTileUrl, floorTileUrl);
            return null;
        }

        const srcWidth = masterCanvas.width;
        const srcHeight = masterCanvas.height;

        const cropWidthPercent = leftPercent + (1 - rightPercent);
        const widthToCrop = srcWidth * cropWidthPercent;
        const croppedWidth = srcWidth - widthToCrop;

        const cropHeightPercent = topPercent + (1 - bottomPercent);
        const heightToCrop = srcHeight * cropHeightPercent;
        const croppedHeight = srcHeight - heightToCrop;

        widthToHeightRatio = croppedHeight / croppedWidth;
        heightToWidthRatio = croppedWidth / croppedHeight;

        const textWidthPercent = 0.3;
        const textPaddingPercent = 0.03;
        const maxTextWidth = 400;
        const textWidth = width * textWidthPercent < maxTextWidth ? width * textWidthPercent : maxTextWidth;

        const paddingWidth = width * textPaddingPercent;
        const pictureWidth = titlesData ? width - (textWidth + paddingWidth) : width;

        const artworkSizes = calculateCanvasArtworkSizes({ frameThicknessDecimal, mountThicknessDecimal, width: pictureWidth, height, widthToHeightRatio, heightToWidthRatio });

        let {
                imgX, imgY, imgWidth, imgHeight,
                frameX, frameY, frameWidth, frameHeight, frameThickness,
                mountX, mountY, mountWidth, mountHeight, mountThickness,
                skirtingY, skirtingHeight, floorY, floorHeight
            } = artworkSizes;

        this.canvas.width = width;
        this.canvas.height = height;

        const wallHeight = height - floorHeight;

        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        drawWall(ctx, this.wallTile, 0, 0, width, height);
        // add the floor
        drawFloor(ctx, this.floorTile, 0, floorY, width, floorHeight);

        drawRadialGradientOverlay(ctx, width, wallHeight);

        drawFrameShadow(ctx, frameX, frameY, frameWidth, frameHeight);

        if (frameThickness > 0) {
            drawFrame(ctx, frameX, frameY, frameWidth, frameHeight, frameThickness, frameColour);
        }

        if (mountThickness > 0) {
            drawMount(ctx, mountX, mountY, mountWidth, mountHeight, mountThickness, mountColour);
        }

        // add artwork
        drawArtworkImage(ctx, masterCanvas, this.canvas, imgX, imgY, imgWidth, imgHeight, cropData);

        // add skirting board
        if (includeSkirting) {
            drawSkirtingBoard(ctx, 0, skirtingY, width, skirtingHeight);
        }

        if (includeGuardRail) {
            drawGuardRail(ctx, this.guardTile, 0, floorY - 20, width, 64);
        }

        // add titlesData text
        if (titlesData) {
            const textX = frameX + frameWidth;
            addTitles(ctx, textWidth, frameHeight, textX, frameY, titlesData);
        }

        // add people
        // drawPeople(ctx, width, height);

        // add artfly.io bit to the bottom right;
        const branding = "ArtFly.io";
        ctx.font = `${20}px 'Stardos Stencil'`;
        const brandingLength = ctx.measureText(branding).width + 10;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillText(branding, width - brandingLength, height - 30);
    }

    render() {
        return (
            <canvas className={'quickArtwork--canvas'}
                    ref={this.onCanvasInit}
                    width={300}
                    height={300}/>
        );
    }
}

export default QuickArtwork;

const generateWrappedText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        }
        else {
            line = testLine;
        }
    }
    lines.push(line);

    return lines;
};

const addWrappedText = (ctx, lines, x, startY, lineHeight) => {
    let y = startY;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        ctx.fillText(line, x, y);
        y += lineHeight;
    }
};

const addTitles = (ctx, width, maxHeight, x, y, titlesData) => {
    const { title, artist, description, date } = titlesData;

    const titlePercent = 0.15;
    const artistPercent = 0.1;
    const descriptionPercent = 0.08;
    const paddingLeftPercent = 0.1;
    const paddingTextPercent = 0.08;

    const paddingLeft = Math.min(width * paddingLeftPercent, 30);
    const textPadding = Math.min(width * paddingTextPercent, 20);

    let titleFontSize = Math.min(width * titlePercent, 50);
    let artistFontTitleSize = Math.min(width * artistPercent, 20);
    const descriptionFontSize = Math.min(width * descriptionPercent, 20);

    ctx.font = `${descriptionFontSize}px 'Stardos Stencil'`;
    const lines = generateWrappedText(ctx, description, width);
    const descriptionLineHeight = descriptionFontSize * 1.3;
    const descriptionHeight = lines.length * descriptionLineHeight;

    const totalTitlesHeight = descriptionHeight + titleFontSize + artistFontTitleSize + (2 * textPadding);

    const textX = x + paddingLeft;
    const titleTextY = y + (maxHeight - totalTitlesHeight) / 2;
    const artistTextY = titleTextY + titleFontSize + textPadding;

    // Title
    ctx.textBaseline = 'top';
    ctx.fillStyle = "rgba(0,0,0,0.7)";

    ctx.font = `${titleFontSize}px 'Stardos Stencil'`;
    let titleWidth = ctx.measureText(title).width;
    let safetyCounter = 0;
    while (titleWidth > width) {
        titleFontSize -= 1;
        ctx.font = `${titleFontSize}px 'Stardos Stencil'`;
        titleWidth = ctx.measureText(title).width;

        safetyCounter++;
        if (safetyCounter > 100) break;
    }

    ctx.fillText(title, textX, titleTextY);

    // Artist
    if (artist.length > 0) {
        ctx.font = `${artistFontTitleSize}px 'Stardos Stencil'`;
        let artistWidth = ctx.measureText(artist).width;
        safetyCounter = 0;
        while (artistWidth > width) {
            artistFontTitleSize -= 1;
            ctx.font = `${artistFontTitleSize}px 'Stardos Stencil'`;
            artistWidth = ctx.measureText(artist).width;

            safetyCounter++;
            if (safetyCounter > 100) break;
        }

        ctx.fillStyle = 'rgba(255,250,3,0.55)';
        const polygonPadding = 0.3 * artistFontTitleSize;
        const polygonTop = artistTextY - polygonPadding;
        const polygonBottom = artistTextY + artistFontTitleSize + (polygonPadding * 1.5);
        const aSymmetricalJag = 0.4 * artistFontTitleSize;
        drawPolygon(ctx,
            textX - 5, polygonTop,
            textX + width - aSymmetricalJag, polygonTop,
            textX + width, polygonBottom,
            textX - 5, polygonBottom
        );
        ctx.fill();
        ctx.fillStyle = "rgba(0,0,0,0.7)";

        ctx.fillText(`By ${artist}`, textX + 5, artistTextY);
    }

    // Description
    const descriptionTextY = artist.length > 0 ? artistTextY + descriptionFontSize + textPadding : artistTextY;
    // const description = "All the world is a stage, and all the men and women merely players.  They have their exits and their entrances: And one man in his time plays many parts.";
    ctx.font = `${descriptionFontSize}px 'Stardos Stencil'`;
    // const lineHeight =
    addWrappedText(ctx, lines, textX, descriptionTextY, descriptionLineHeight);

    const dateY = description.length > 0 ? descriptionTextY + descriptionHeight + textPadding : descriptionTextY;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillText(date, textX, dateY);
};

const drawArtworkImage = (ctx, sourceImg, outputCanvas, imgX, imgY, imgWidth, imgHeight, cropData) => {

    const srcW = sourceImg.width;
    const srcH = sourceImg.height;
    const srcRight = srcW * cropData.rightPercent;
    const srcLeft = srcW * cropData.leftPercent;
    const croppedW = srcRight - srcLeft;

    const srcTop = srcH * cropData.topPercent;
    const srcBottom = srcH * cropData.bottomPercent;
    const croppedH = srcBottom - srcTop;

    ctx.drawImage(sourceImg, srcLeft, srcTop, croppedW, croppedH, imgX, imgY, imgWidth, imgHeight);
};

const drawFrame = (ctx, startX, startY, width, height, thickness, frameColour) => {

    const { hue, saturation, lightness } = frameColour;

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

const drawMount = (ctx, startX, startY, width, height, thickness, mountColour) => {
    const { hue, saturation, lightness } = mountColour;

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

const drawGuardRail = (ctx, guardRailTile, startX, startY, width, height) => {
    const pat = ctx.createPattern(guardRailTile, "repeat-x");

    ctx.beginPath();
    ctx.save();
    ctx.translate(0, startY);
    ctx.rect(startX, 0, width, height);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
};

const drawFloor = (ctx, floorTile, startX, startY, width, height) => {
    const pat = ctx.createPattern(floorTile, "repeat");
    ctx.save();
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
};

const drawWall = (ctx, wallTile, startX, startY, width, height) => {
    const pat = ctx.createPattern(wallTile, "repeat");

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.closePath();
};

const drawRadialGradientOverlay = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusOfStartCircle = Math.max(width / 2, height / 2); // outer shadow circle
    const radiusOfEndCircle = Math.max(width / 5, height / 5); // inner shadow circle

    let gradient = ctx.createRadialGradient(centerX, centerY, radiusOfStartCircle, centerX, centerY, radiusOfEndCircle);
    gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(0.4, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
};

const drawFrameShadow = (ctx, x, y, width, height) => {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    ctx.restore(); // clear it or will be added to everything
};

/*const drawPeople = (ctx, width, height, callback) => {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = People;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 400, 260, 300, height-240, 400, 260);

        if (callback) callback();
    };
};*/

const calculateCanvasArtworkSizes = ({ frameThicknessDecimal = 0.04, mountThicknessDecimal = 0.06, width, height, widthToHeightRatio, heightToWidthRatio, minPaddingTop = 30, minPaddingSides = 20 }) => {
    // const mountThicknessPercent = 0.06;
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
    let frameThickness = Math.round(maxWidth * frameThicknessDecimal);
    let mountThickness = Math.round(maxWidth * mountThicknessDecimal);
    let totalFrameAndMountThickness = (frameThickness * 2) + (mountThickness * 2);
    let imgWidth = maxWidth - totalFrameAndMountThickness;
    let imgHeight = imgWidth * widthToHeightRatio;
    let frameHeight = Math.round(imgHeight + totalFrameAndMountThickness);

    // if it doesn't fit the height, calculate to maximise height
    if (frameHeight > maxHeight) {
        frameThickness = Math.round(maxHeight * frameThicknessDecimal);
        mountThickness = Math.round(maxHeight * mountThicknessDecimal);
        totalFrameAndMountThickness = (frameThickness * 2) + (mountThickness * 2);
        imgHeight = maxHeight - totalFrameAndMountThickness;
        imgWidth = imgHeight * heightToWidthRatio;
        frameHeight = Math.round(imgHeight + totalFrameAndMountThickness);
    }

    let frameWidth = Math.round(imgWidth + totalFrameAndMountThickness);
    // work out the padding around the picture
    const totalFramedPictureWidth = imgWidth + totalFrameAndMountThickness;
    const extraHorizontalSpace = width - (totalFramedPictureWidth + minPaddingLeft + minPaddingRight);
    const paddingLeft = minPaddingLeft + (extraHorizontalSpace / 2);

    const extraVerticalSpace = height - (imgHeight + totalFrameAndMountThickness + minPaddingTop + minPaddingBottom);
    const paddingTop = minPaddingTop + (extraVerticalSpace / 2);

    const frameX = Math.round(paddingLeft);
    const frameY = Math.round(paddingTop);
    const mountX = Math.round(frameX + frameThickness);
    const mountY = Math.round(frameY + frameThickness);
    const imgX = Math.round(mountX + mountThickness);
    const imgY = Math.round(mountY + mountThickness);
    const mountWidth = Math.round(frameWidth - (frameThickness * 2));
    const mountHeight = Math.round(frameHeight - (frameThickness * 2));

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