// externals
import React from 'react';
import _ from 'lodash';
// components
import BuildingWindow from "./BuildingWindow";
import BuildingSection from "./BuildingSection";

const WindowSection = (props) => {
    const { galleryWidth, hue, saturation, lightness, windowsHeight, onThumbClick, artworkIds, artworks, windowParams } = props;

    const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
    const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
    const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

    // TODO: currently this is called every time a new bit of artwork data is loaded in
    // TODO: ...cont separate out the generation of the windows and adding the image (might not be worth it though)
    const buildingWindows = createBuildingWindows(wallColour, highlight, lowlight, artworkIds, artworks, galleryWidth, windowParams, onThumbClick);

    const buildingSectionProps = {
        galleryWidth, wallColour, featureColour, highlight, lowlight
    };

    return (
        <BuildingSection {...buildingSectionProps}
                         content={buildingWindows}
                         height={windowsHeight}/>
    )
};

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

    const delayOffset = 100;
    let count = 0;
    let imgLoadDelay;

    return _.map(artworkIds, (date, id) => {

        imgLoadDelay = count * delayOffset;

        x = xStart + (colCount * windowWidthWithPadding);

        if (x + windowWidthWithPadding > windowHorizontalSpace) {
            colCount = 0;
            rowCount++;
        }

        x = xStart + (colCount * windowWidthWithPadding);
        y = yStart + (rowCount * windowHeightWithPadding);

        windowCount++;
        colCount++;

        if (artworks && artworks[id]) {
            const artwork = artworks[id];

            return (
                <BuildingWindow key={date}
                                artworkThumbUrl={artwork.url_thumb}
                                artworkId={id}
                                imgDelay={imgLoadDelay}
                                x={x}
                                y={y}
                                width={windowWidth}
                                height={windowHeight}
                                number={windowCount}
                                onThumbClick={onThumbClick}
                                wallColour={wallColour}
                                highlight={highlight}
                                lowlight={lowlight}/>
            )
        }
        else {
            return (
                <BuildingWindow key={date}
                                x={x}
                                y={y}
                                width={windowWidth}
                                height={windowHeight}
                                number={windowCount}
                                onThumbClick={onThumbClick}
                                wallColour={wallColour}
                                highlight={highlight}
                                lowlight={lowlight}/>
            )
        }
    })
};