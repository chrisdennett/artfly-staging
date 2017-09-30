import React, { Component } from 'react';

import BuildingSection from "./BuildingSection";
import SectionText from "./SectionText";
import SectionLine from "./SectionLine";

class NameSection extends Component {

    constructor(props) {
        super(props);
        this.sectionHeight = 0;
    }

    createNameContent(featureColour, lowlight, highlight, firstName, lastName) {

        const lineWidth = 720;

        return (
            <svg viewBox="0 0 800 350">

                <SectionLine x={40} y={32} width={lineWidth} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>
                <SectionLine x={40} y={40} width={lineWidth} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={90}
                             text={"GALLERY OF AWESOME ART BY"}
                             fontSize={45}
                             shadingOffset={1}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={180}
                             text={firstName}
                             fontSize={100}
                             shadingOffset={2}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={260}
                             text={lastName}
                             fontSize={100}
                             shadingOffset={2}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionLine x={40} y={290} width={lineWidth} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>
                <SectionLine x={40} y={298} width={lineWidth} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

            </svg>
        )
    }

    render() {

        const { galleryWidth, hue, saturation, lightness, firstName, lastName } = this.props;

        const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
        const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
        const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

        const nameContent = this.createNameContent(featureColour, lowlight, highlight, firstName, lastName);

        const maxHeight = 370;
        const maxWidth = 700;
        const percentageSize = galleryWidth / maxWidth;
        const currentHeight = maxHeight * percentageSize;
        // const currentY = 34;


        const buildingSectionProps = {
            galleryWidth, wallColour, featureColour, highlight, lowlight
        };

        return (
            <BuildingSection {...buildingSectionProps}
                             height={currentHeight}
                             content={nameContent}/>
        )
    }
}

export default NameSection;