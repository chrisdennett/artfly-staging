import React from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";

const ArtworkPreview = ({ maxWidth, maxHeight, artwork }) => {
    if (!artwork) return <div>no artwork data</div>;

    const { widthToHeightRatio, heightToWidthRatio } = artwork;
    const minimumPaddingTop = 15;
    const minimumPaddingSides = 15;
    const artworkWidth = maxWidth - (maxWidth/10); // give a 10% margin
    const artworkHeight = maxHeight - (maxHeight/10); // give a 10% margin

    let artworkData = calculateArtworkSizes(artworkWidth, artworkHeight, widthToHeightRatio, heightToWidthRatio, minimumPaddingTop, minimumPaddingSides);

    return (
        <div className={'artworkPreview--holder'}>
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