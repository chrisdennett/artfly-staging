// externals
import React from "react";
// components
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";

const Artwork = function (props) {

    const { artworkData, width, height, imageLoading, allowScrollbars = false } = props;

    if (!artworkData) return null;

    const { imgSrc, imgWidth, imgHeight, skirtingY, skirtingHeight, floorY, floorHeight,  paddingTop, paddingLeft, frameThickness, mountThickness } = artworkData;

    // const { imgSrc, imgWidth, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness, spaceBelowPicture } = artworkData;

    let imgStyle = {
        position: 'absolute',
        width: imgWidth,
        height: imgHeight,
        top: paddingTop + frameThickness + mountThickness,
        left: paddingLeft + frameThickness + mountThickness
    };

    if (imageLoading) {
        imgStyle.display = 'none';
    }

    return (
        <ScrollbarRemover showScrollbars={allowScrollbars}>
            <div style={{ position: 'relative', height:height }}>
                {imageLoading
                    ? <div style={{
                        position: 'absolute',
                        zIndex: 2000,
                        top: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>Loading artwork...</div>
                    : ""
                }

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

                <img alt="user artwork"
                     style={imgStyle}
                     src={imgSrc}/>
            </div>

        </ScrollbarRemover>
    )
};

export default Artwork;