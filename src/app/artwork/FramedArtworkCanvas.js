import React from 'react';
import ArtworkCanvas from "./ArtworkCanvas";

const FramedArtworkCanvas = function ({artworkData, imgSrc}) {

    // console.log("artworkData: ", artworkData);

    return (
        <div>
            <ArtworkCanvas artworkData={artworkData} imgSrc={imgSrc}/>
        </div>
    )
};

export default FramedArtworkCanvas;