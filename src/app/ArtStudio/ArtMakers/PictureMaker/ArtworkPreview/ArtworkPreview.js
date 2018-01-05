import React from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";

const ArtworkPreview = (props) => {
    if (!props.artwork) return <div>no artwork data</div>;

    const { maxWidth, maxHeight, artwork } = props;
    const { imgSrc, widthToHeightRatio, heightToWidthRatio } = artwork;
    const minimumPaddingTop = 15;
    const minimumPaddingSides = 15;
    let artworkData = calculateArtworkSizes(maxWidth, maxHeight, widthToHeightRatio, heightToWidthRatio, minimumPaddingTop, minimumPaddingSides);
    artworkData.imgSrc = imgSrc;

    return (
        <div className={'artworkPreview'}>
            <Artwork width={maxWidth}
                     height={maxHeight}
                     artworkData={artworkData}/>
        </div>
    );
}

export default ArtworkPreview;