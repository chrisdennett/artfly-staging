// externals
import React from "react";
// styles
import './artworkStyles.css';
// components
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";

const Artwork = function (props) {

    const { artworkData, imageLoading, allowScrollbars = false } = props;

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
            <div className='artwork'>
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

                    <foreignObject width={imgWidth} height={imgHeight}>
                        <canvas width={imgWidth} height={imgHeight} id="thisCanvas"
                                style={{border:'1px solid #000000'}}>
                            alternate content for browsers that do not support Canvas
                        </canvas>
                    </foreignObject>

                </svg>

                <img alt="user artwork"
                     style={imgStyle}
                     src={imgSrc}/>
            </div>

        </ScrollbarRemover>
    )
};

export default Artwork;