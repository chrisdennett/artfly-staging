import React, { Component } from 'react';
import _ from 'lodash';

import Window from "../BuildingWindow";

class BuildingSection extends Component {

    constructor(props) {
        super(props);
        this.sectionHeight = 42;
    }

    getTopRoundedRect(x, y, width, height, radius) {
        return `  M${x} ${y}
                   V${y + radius}
                   Q${x} ${y} ${x + radius} ${y}
                   H${(x + width) - radius}
                   Q${x + width} ${y} ${x + width} ${y + radius}
                   V${y + height}
                   H${x}
                   z    `
    }

    getBottomRoundedRect(x, y, width, height, radius) {
        return `  M${x} ${y}
                   H${x + width}
                   V${y + (height - radius)}
                   Q${x + width} ${y + height} ${width - radius} ${y + height}
                   H${x + radius}
                   Q${x} ${y + height} ${x} ${y + (height - radius)}
                   z    `
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
                    <Window key={id}
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

        const barHeight = 20;
        const barRoundedEdgeHeight = 10;

        const roundedCornerSize = 10;

        const topRoundedRect = this.getTopRoundedRect(0, this.sectionHeight - (barHeight + barRoundedEdgeHeight), galleryWidth, barRoundedEdgeHeight, roundedCornerSize);
        const bottomRoundedRect = this.getBottomRoundedRect(0, barHeight, galleryWidth, barRoundedEdgeHeight, roundedCornerSize);

        const buildingWindows = this.createBuildingWindows(artworkIds, artworks, wallColour, highlight, lowlight, galleryWidth);

        return (

            <svg width={galleryWidth} height={this.sectionHeight}>

                <rect fill={wallColour}
                      x={roundedCornerSize}
                      width={galleryWidth - (roundedCornerSize * 2)}
                      height={'100%'}/>

                <rect fill={featureColour}
                      width={'100%'}
                      height={barHeight}/>

                <path fill={lowlight}
                      d={bottomRoundedRect}/>

                <path fill={highlight}
                      d={topRoundedRect}/>

                <rect fill={featureColour}
                      y={this.sectionHeight - barHeight}
                      width={'100%'}
                      height={barHeight}/>

                <g ref="windowGroup" height={'100%'}>
                    {buildingWindows}
                </g>

            </svg>
        )
    }
}

export default BuildingSection;