// externals
import React from 'react';
// components
import Brick from "./Brick";

const BuildingSection = ({ galleryWidth, height, wallColour, featureColour, highlight, lowlight, content }) => {
        const getTopRoundedRect = (x, y, width, height, radius) => {
            return `  M${x} ${y}
                   V${y + radius}
                   Q${x} ${y} ${x + radius} ${y}
                   H${(x + width) - radius}
                   Q${x + width} ${y} ${x + width} ${y + radius}
                   V${y + height}
                   H${x}
                   z    `
        };
        const getBottomRoundedRect = (x, y, width, height, radius) => {
            return `  M${x} ${y}
                   H${x + width}
                   V${y + (height - radius)}
                   Q${x + width} ${y + height} ${width - radius} ${y + height}
                   H${x + radius}
                   Q${x} ${y + height} ${x} ${y + (height - radius)}
                   z    `
        };
        const getBricks = (alignRight, galleryWidth, height, featureColour, highlight, lowlight) => {
            let bricks = [];
            let y = 35;
            const brickHeight = 18;
            const gap = 3;
            let x = 3;

            if (alignRight) {
                x = galleryWidth-3;
            }
            const totalBrickHeight = height - y;

            while (y+(brickHeight+gap) < totalBrickHeight) {
                bricks.push(<Brick key={y} x={x} y={y} alignRight={alignRight} width={25} height={brickHeight} featureColour={featureColour} highlight={highlight} lowlight={lowlight}/>);

                y += brickHeight + gap;

                if(y+(brickHeight+gap) < totalBrickHeight){
                    bricks.push(<Brick key={y} x={x} y={y} alignRight={alignRight} width={18} height={brickHeight} featureColour={featureColour} highlight={highlight} lowlight={lowlight}/>);
                    y += brickHeight + gap;
                }
            }

            return bricks;
        };

        const barHeight = 20;
        const barRoundedEdgeHeight = 10;
        const roundedCornerSize = 10;
        const leftBricks = getBricks(false, galleryWidth, height, featureColour, highlight, lowlight);
        const rightBricks = getBricks(true, galleryWidth, height, featureColour, highlight, lowlight);
        const topRoundedRect = getTopRoundedRect(0, height - (barHeight + barRoundedEdgeHeight), galleryWidth, barRoundedEdgeHeight, roundedCornerSize);
        const bottomRoundedRect = getBottomRoundedRect(0, barHeight, galleryWidth, barRoundedEdgeHeight, roundedCornerSize);

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

                { leftBricks  }
                { rightBricks  }

            </svg>
        )
};

export default BuildingSection;