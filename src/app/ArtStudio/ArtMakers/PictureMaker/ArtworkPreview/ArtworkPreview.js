import React from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";
// import * as ImageHelper from "../../../ImageHelper";

const ArtworkPreview = (props) => {
    if (!props.artwork) return <div>no artwork data</div>;

    const { maxWidth, maxHeight, artwork } = props;
    const { imgSrc, widthToHeightRatio, heightToWidthRatio } = artwork;
    const minimumPaddingTop = 15;
    const minimumPaddingSides = 15;
    let artworkData = calculateArtworkSizes(maxWidth, maxHeight, widthToHeightRatio, heightToWidthRatio, minimumPaddingTop, minimumPaddingSides);

    // TODO: I should really check which image is the correct size here. Medium might be better.
    artworkData.imgSrc = artwork.url_large ? artwork.url_large : imgSrc;

    /*const canvas = document.createElement('canvas');
    const { imgWidth, imgHeight } = artworkData;
    ImageHelper.drawToCanvas({
        sourceCanvas: artwork.img,
        outputCanvas: canvas,
        maxOutputCanvasWidth: imgWidth,
        maxOutputCanvasHeight: imgHeight
    });*/

    return (
        <div className={'artworkPreview'}>
            <Artwork width={maxWidth}
                     height={maxHeight}
                     artworkData={artworkData}/>
        </div>
    );
}

export default ArtworkPreview;