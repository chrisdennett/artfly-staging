// externals
import React from "react";
// components
import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";

const Artwork = function(props) {

    const { artworkData, width, height, imageLoading, allowScrollbars = false } = props;

    if (!artworkData) return null;

    const { imgSrc, imgWidth, imgHeight, paddingTop, paddingLeft, frameThickness, mountThickness, spaceBelowPicture } = artworkData;

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

            <div style={{ position: 'absolute' }}>
                <Room width={width} height={height} spaceBelowPicture={spaceBelowPicture}/>
            </div>

            <div style={{ position: 'absolute', top: paddingTop, left: paddingLeft }}>
                <PictureFrame
                    frameThickness={frameThickness}
                    mountThickness={mountThickness}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}/>
            </div>

            <img alt="user artwork"
                 style={imgStyle}
                 src={imgSrc}/>

        </ScrollbarRemover>
    )
};

export default Artwork;