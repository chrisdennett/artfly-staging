// externals
import React from 'react';
import _ from 'lodash';
// components
import BuildingWindow from "./BuildingWindow";
import BuildingSection from "./BuildingSection";

const WindowSection = (props) => {
    const { galleryWidth, hue, saturation, lightness, windowsHeight } = props;

    const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
    const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
    const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

    const { artworkIds, artworks, windowParams } = props;
    const buildingWindows = createBuildingWindows(wallColour, highlight, lowlight, artworkIds, artworks, galleryWidth, windowParams, props.onThumbClick);

    const buildingSectionProps = {
        galleryWidth, wallColour, featureColour, highlight, lowlight
    };

    return (
        <BuildingSection {...buildingSectionProps}
                         content={buildingWindows}
                         height={windowsHeight}/>
    )

    /*return (
        <BuildingSection {...buildingSectionProps}
                         height={windowsHeight}/>
    )*/
}

export default WindowSection;

// HELP FUNCTIONS
const createBuildingWindows = (wallColour, highlight, lowlight, artworkIds, artworks, galleryWidth, windowParams, onThumbClick) => {
    //const {artworkIds, artworks, galleryWidth, windowParams} = props;
    // () => {props.onThumbClick(id)}

    const {
              windowWidth, windowsSectionPadding, windowPadding, windowHeight,
              windowWidthWithPadding, windowHeightWithPadding,
          } = windowParams;

    let windowCount = 0;
    const windowHorizontalSpace = galleryWidth;
    let colCount = 0;
    let rowCount = 0;
    let x = 0;
    let y = 0;

    let xStart = windowsSectionPadding.left + windowPadding.left;
    let yStart = windowsSectionPadding.top + windowPadding.top;

    return _.map(artworkIds, (date, id) => {
        if (artworks[id]) {

            x = xStart + (colCount * windowWidthWithPadding);

            if (x + windowWidthWithPadding > windowHorizontalSpace) {
                colCount = 0;
                rowCount++;
            }

            x = xStart + (colCount * windowWidthWithPadding);
            y = yStart + (rowCount * windowHeightWithPadding);

            windowCount++;
            colCount++;

            return (
                <BuildingWindow key={date}
                                x={x}
                                y={y}
                                width={windowWidth}
                                height={windowHeight}
                                number={windowCount}
                                artwork={artworks[id]}
                                onThumbClick={onThumbClick}
                                wallColour={wallColour}
                                highlight={highlight}
                                lowlight={lowlight}/>
            )
        }
    })

}