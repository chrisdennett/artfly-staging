import React from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";

const ArtworkPreview = (props) => {
    // const { artworkData } = this.state;
    if (!props.artwork) return <div>no artwork data</div>;

    const { maxWidth, maxHeight, artwork } = props;
    const { imgSrc, widthToHeightRatio, heightToWidthRatio } = artwork;
    let artworkData = calculateArtworkSizes(maxWidth, maxHeight, widthToHeightRatio, heightToWidthRatio, 5);
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