import React from 'react';
import LoadingThing from "../loadingThing/LoadingThing";

const ArtworkCanvas = function ({artworkData, width='100%', height, style}) {

    const src = width < 250 ? artworkData.thumbUrl : artworkData.largeUrl;

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