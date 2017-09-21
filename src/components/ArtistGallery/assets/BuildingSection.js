import React, { Component } from 'react';


class BuildingSection extends Component {

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


    render() {
        const { galleryWidth, height, hue, saturation, lightness, content } = this.props;

        const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
        const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
        const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

        const barHeight = 20;
        const barRoundedEdgeHeight = 10;

        const roundedCornerSize = 10;

        const topRoundedRect = this.getTopRoundedRect(0, height - (barHeight + barRoundedEdgeHeight), galleryWidth, barRoundedEdgeHeight, roundedCornerSize);
        const bottomRoundedRect = this.getBottomRoundedRect(0, barHeight, galleryWidth, barRoundedEdgeHeight, roundedCornerSize);

        return (
            <svg width={galleryWidth} height={height}>
                <rect fill={wallColour}
                      x={roundedCornerSize}
                      width={galleryWidth - (roundedCornerSize * 2)}
                      height={'100%'}/>

                <rect fill={featureColour}
                      width={'100%'}
                      height={barHeight}/>

                <path fill={lowlight}
                      d={bottomRoundedRect}/>

                {content}

                <path fill={highlight}
                      d={topRoundedRect}/>

                <rect fill={featureColour}
                      y={height - barHeight}
                      width={'100%'}
                      height={barHeight}/>
            </svg>
        )
    }
}

export default BuildingSection;