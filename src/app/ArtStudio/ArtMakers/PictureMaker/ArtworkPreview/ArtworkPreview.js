import React from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";
// import * as ImageHelper from "../../../ImageHelper";

const ArtworkPreview = ({ maxWidth, maxHeight, artwork }) => {
    if (!artwork) return <div>no artwork data</div>;

    const { widthToHeightRatio, heightToWidthRatio } = artwork;
    const minimumPaddingTop = 15;
    const minimumPaddingSides = 15;
    const artworkWidth = maxWidth - 30;
    const artworkHeight = maxHeight - 60;


    let artworkData = calculateArtworkSizes(artworkWidth, artworkHeight, widthToHeightRatio, heightToWidthRatio, minimumPaddingTop, minimumPaddingSides);

    // artworkData.imgSrc = artwork.url_large ? artwork.url_large : imgSrc;

    /*const canvas = document.createElement('canvas');
    const { imgWidth, imgHeight } = artworkData;
    ImageHelper.drawToCanvas({
        sourceCanvas: artwork.img,
        outputCanvas: canvas,
        maxOutputCanvasWidth: imgWidth,
        maxOutputCanvasHeight: imgHeight
    });*/

    return (
        <div>
            <div className={'artworkPreview'} style={{ width: artworkWidth, height: artworkHeight }}>
                <Artwork width={artworkWidth}
                         height={artworkHeight}
                         artwork={artwork}
                         allowScrollbars={true}
                         artworkData={artworkData}/>
            </div>
        </div>

    );
};

export default ArtworkPreview;