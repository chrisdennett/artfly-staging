// externals
import React from "react";
// styles
import './artworkStyles.css';
// helpers

// components
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";
import { getAppropriateUrl } from "./artworkHelper";

const Artwork = function ({ artwork, width, height, artworkData, imageLoading, allowScrollbars = false }){

    if (!artworkData) return <div>No artwork data...</div>;

    const { artCanvas, imgWidth, imgHeight, skirtingY, skirtingHeight, floorY, floorHeight, paddingTop, paddingLeft, frameThickness, mountThickness } = artworkData;

    const { url, url_large, url_med, thumb_url } = artwork;
    const artworkUrl = getAppropriateUrl({ imgWidth, imgHeight, url, url_large, url_med, thumb_url });

    return (
        <ScrollbarRemover showScrollbars={allowScrollbars}>

                <svg width={width} height={height}>

                    {/*<Wall width={width} height={height}/>*/}

                    <Floor floorY={floorY} floorHeight={floorHeight}/>

                    <SkirtingBoard top={skirtingY} height={skirtingHeight}/>

                    <PictureFrame
                        top={paddingTop}
                        left={paddingLeft}
                        frameThickness={frameThickness}
                        mountThickness={mountThickness}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}/>

                    {!artCanvas &&
                    <image xlinkHref={artworkUrl}
                           x={paddingLeft + frameThickness + mountThickness}
                           y={paddingTop + frameThickness + mountThickness}
                           width={imgWidth}
                           height={imgHeight}>
                    </image>
                    }

                    {/*{artCanvas &&
                    <foreignObject width={imgWidth} height={imgHeight}>
                        <canvas width={imgWidth} height={imgHeight} id="thisCanvas"
                                style={{ border: '1px solid #000000' }}>
                            alternate content for browsers that do not support Canvas
                        </canvas>
                    </foreignObject>
                    }*/}

                </svg>

                {/* {!artCanvas &&
                <img alt="user artwork"
                     style={imgStyle}
                     src={imgSrc}/>
                }*/}


        </ScrollbarRemover>
    )
};

export default Artwork;