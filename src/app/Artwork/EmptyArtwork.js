// externals
import React, { Component } from "react";
// helpers
import { calculateArtworkSizes } from './assets/ArtworkCalculations';
// components
// import Room from './Room/Room';
// import PictureFrame from './PictureFrame/PictureFrame';
// import ScrollbarRemover from "../global/ScrollbarRemover";
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";

class EmptyArtwork extends Component {

    render() {
        const { width, height } = this.props;

        let artworkData;
        if(width > 0 || height > 0){
            artworkData = calculateArtworkSizes(width, height, 1,1);
        }
        else{
            return <svg width={'100%'} height={'100%'}><Wall /></svg>;
        }

        const { skirtingY, skirtingHeight, floorY, floorHeight } = artworkData;
        // const { imgWidth, imgHeight, skirtingY, skirtingHeight, floorY, floorHeight, paddingTop, paddingLeft, frameThickness, mountThickness } = artworkData;

        return (
                <svg width={'100%'} height={'100%'}>

                    <Wall />

                    <Floor floorY={floorY} floorHeight={floorHeight} />

                    <SkirtingBoard top={skirtingY} height={skirtingHeight}/>

                    {/*<PictureFrame
                        top={paddingTop}
                        left={paddingLeft}
                        frameThickness={frameThickness}
                        mountThickness={mountThickness}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}/>*/}

                </svg>

        );
    }
}

export default EmptyArtwork;