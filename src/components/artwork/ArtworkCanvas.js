import React from 'react';
import LoadingThing from "../loadingThing/LoadingThing";
import { THUMB_SIZE } from "../../GLOBAL_CONSTANTS";

const ArtworkCanvas = function ({artworkData, width='100%', height, style}) {

    const src = width < THUMB_SIZE ? artworkData.thumbUrl : artworkData.largeUrl;

    const containerStyle = {width:width, height:height, ...style};
    const imgStyle = {width:width, height:height};

    return (
        <div style={containerStyle}>
            {!src &&
            <LoadingThing label={'Loading artwork'}/>
            }

            {src &&
            <img style={imgStyle} src={src} alt={'user artwork'} />
            }
        </div>
    )
};

export default ArtworkCanvas;