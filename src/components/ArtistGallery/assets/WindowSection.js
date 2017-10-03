import React, {Component} from 'react';
import _ from 'lodash';

import BuildingWindow from "./BuildingWindow";
import BuildingSection from "./BuildingSection";

class WindowSection extends Component {

    constructor(props) {
        super(props);
        this.sectionHeight = 0;
    }

    createBuildingWindows(artworkIds, artworks, wallColour, highlight, lowlight, galleryWidth, windowParams) {
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

        return _.map(artworkIds, (id) => {
            if (artworks[id]) {

                x = xStart + (colCount * windowWidthWithPadding);

                if (x + windowWidthWithPadding > windowHorizontalSpace) {
                    colCount = 0;
                    rowCount++;
                }

                x = xStart + (colCount * windowWidthWithPadding);
                y = yStart + (rowCount * windowHeightWithPadding);

                this.sectionHeight = y + windowHeightWithPadding + windowsSectionPadding.bottom;

                windowCount++;
                colCount++;

                return (
                    <BuildingWindow key={id}
                                    x={x}
                                    y={y}
                                    width={windowWidth}
                                    height={windowHeight}
                                    number={windowCount}
                                    artwork={artworks[id]}
                                    onThumbClick={this.props.onThumbClick.bind(this)}
                                    wallColour={wallColour}
                                    highlight={highlight}
                                    lowlight={lowlight}/>
                )
            }
        })

    }

    render() {
        const { galleryWidth, hue, saturation, lightness, artworks, artworkIds, windowParams } = this.props;

        const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
        const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
        const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

        const buildingWindows = this.createBuildingWindows(artworkIds, artworks, wallColour, highlight, lowlight, galleryWidth, windowParams);

        const buildingSectionProps = {
            galleryWidth, wallColour, featureColour, highlight, lowlight
        };

        return (
            <BuildingSection {...buildingSectionProps}
                             height={this.sectionHeight}
                             content={buildingWindows}/>
        )
    }
}

export default WindowSection;