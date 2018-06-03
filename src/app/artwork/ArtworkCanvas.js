import React from 'react';
import LoadingThing from "../loadingThing/LoadingThing";

const ArtworkCanvas = function ({artworkData, imgSrc, width='100%', height, style}) {

    let src = artworkData ? artworkData.thumbUrl : imgSrc;
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