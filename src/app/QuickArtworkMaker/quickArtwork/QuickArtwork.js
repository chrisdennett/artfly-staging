import React from 'react';
import PictureFrame from "../../Artwork/PictureFrame/PictureFrame";

const QuickArtwork = function ({ artworkData, height, width }) {

    const { sourceImg, widthToHeightRatio, heightToWidthRatio } = artworkData;

    const { imgX, imgY, imgWidth, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness } = calculateArtworkSizes(width, height, widthToHeightRatio, heightToWidthRatio, 20, 5)

    if (height < 1 || width < 1) return null;

    return (
        <svg height={height} width={width}>

            <PictureFrame
                top={paddingTop}
                left={paddingLeft}
                frameThickness={frameThickness}
                mountThickness={mountThickness}
                imgWidth={imgWidth}
                imgHeight={imgHeight}/>

            <image xlinkHref={sourceImg.src}
                   x={imgX}
                   y={imgY}
                   width={imgWidth}
                   height={imgHeight}>
            </image>

        </svg>
    )
};

export default QuickArtwork;

const calculateArtworkSizes = function (width, height, widthToHeightRatio, heightToWidthRatio, minPaddingTop = 60, minPaddingSides = 10) {
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
    }

    // work out the padding around the picture
    const totalFramedPictureWidth = imgWidth + totalFrameAndMountThickness;
    const extraHorizontalSpace = width - (totalFramedPictureWidth + minPaddingLeft + minPaddingRight);
    const paddingLeft = minPaddingLeft + (extraHorizontalSpace / 2);

    const extraVerticalSpace = height - (imgHeight + totalFrameAndMountThickness + minPaddingTop + minPaddingBottom);
    const paddingTop = minPaddingTop + (extraVerticalSpace / 2);

    const imgX = paddingLeft + frameThickness + mountThickness;
    const imgY = paddingTop + frameThickness + mountThickness;

    return { imgX, imgY, imgWidth, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness };
};