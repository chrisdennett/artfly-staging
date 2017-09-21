import React, {Component} from 'react';
import _ from 'lodash';

import BuildingWindow from "./BuildingWindow";
import BuildingSection from "./BuildingSection";

class WindowSection extends Component {

    constructor(props) {
        super(props);
        this.sectionHeight = 0;
    }

    createBuildingWindows(artworkIds, artworks, wallColour, highlight, lowlight, galleryWidth) {
        let windowCount = 0;
        const leftPadding = 40;
        const topPadding = 60;
        const windowHorizontalSpace = galleryWidth;
        const windowWidth = 250;
        const windowHeight = 250;
        let colCount = 0;
        let rowCount = 0;
        let x = 0;
        let y = 0;

        return _.map(artworkIds, (id) => {
            if (artworks[id]) {

                x = leftPadding + (colCount * windowWidth);

                if (x + windowWidth > windowHorizontalSpace) {
                    colCount = 0;
                    rowCount++;
                }

                x = leftPadding + (colCount * windowWidth);
                y = topPadding + (rowCount * windowHeight);

                this.sectionHeight = y + windowHeight + topPadding;

                windowCount++;
                colCount++;

                return (
                    <BuildingWindow key={id}
                                    x={x}
                                    y={y}
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
        const { galleryWidth, hue, saturation, lightness, artworks, artworkIds } = this.props;

        const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
        const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
        const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

        const buildingWindows = this.createBuildingWindows(artworkIds, artworks, wallColour, highlight, lowlight, galleryWidth);

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