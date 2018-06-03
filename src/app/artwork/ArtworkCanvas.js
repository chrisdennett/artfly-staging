import React from 'react';
import LoadingThing from "../loadingThing/LoadingThing";

const ArtworkCanvas = function ({artworkData, imgSrc}) {

    let src = artworkData ? artworkData.thumbUrl : imgSrc;

    const imgStyle = {maxWidth:300,maxHeight:300};

    return (
        <div style={{width:300, height:300}}>
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