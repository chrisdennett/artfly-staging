import React, { Component } from "react";
// components
// import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';
// import ScrollbarRemover from "../global/ScrollbarRemover";
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";

class EmptyArtwork extends Component {


    calculateArtworkData(widthToHeightRatio, heightToWidthRatio) {
        let { width, height } = this.props;

        const frameThicknessPercent = 0.03;
        const mountThicknessPercent = 0.06;
        const spaceBelowPicturePercent = 0.15;
        const maxPercentageTakenUpBySkirting = 0.3;
        const maxSkirtingHeight = 34;
        const minGapPercent = 0.3;

        const spaceBelowPicture = spaceBelowPicturePercent * height;

        let minPaddingLeft = 10;
        const minPaddingRight = 10;
        let minPaddingTop = 60;
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

        let skirtingHeight = spaceBelowPicture * maxPercentageTakenUpBySkirting;
        if(skirtingHeight > maxSkirtingHeight) skirtingHeight = maxSkirtingHeight;
        const gapBetweenPictureAndSkirting = spaceBelowPicture * minGapPercent;

        const skirtingY = height - (spaceBelowPicture - gapBetweenPictureAndSkirting);
        const floorY = skirtingY + skirtingHeight;
        const floorHeight = height - floorY;

        return { imgWidth, skirtingY, skirtingHeight, floorY, floorHeight, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness };
    }


    render() {
        const { width, height } = this.props;

        let artworkData;
        if(width > 0 || height > 0){
            artworkData = this.calculateArtworkData(1,1);
        }
        else{
            return <svg width={'100%'} height={'100%'}><Wall /></svg>;
        }

        const { imgWidth, skirtingY, skirtingHeight, floorY, floorHeight, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness } = artworkData;


        return (
                <svg width={'100%'} height={'100%'}>

                    <Wall />

                    <Floor floorY={floorY} floorHeight={floorHeight} />

                    <SkirtingBoard top={skirtingY} height={skirtingHeight}/>

                    <PictureFrame
                        top={paddingTop}
                        left={paddingLeft}
                        frameThickness={frameThickness}
                        mountThickness={mountThickness}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}/>

                </svg>

        );
    }
}

export default EmptyArtwork;