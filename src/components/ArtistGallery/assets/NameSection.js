import React, { Component } from 'react';

import BuildingSection from "./BuildingSection";
import SectionText from "./SectionText";
import SectionLine from "./SectionLine";

class NameSection extends Component {

    constructor(props) {
        super(props);
        this.sectionHeight = 0;
    }

    createNameContent(galleryWidth, featureColour, lowlight, highlight) {
        return (
            <svg y={20} height="350" width="800" viewBox="0 0 800 350">

                <SectionLine x={40} y={32} width={720} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>
                <SectionLine x={40} y={40} width={720} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={100}
                             text={"GALLERY OF AWESOME ART BY"}
                             fontSize={45}
                             shadingOffset={1}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={180}
                             text={"CHRISTOPHER"}
                             fontSize={100}
                             shadingOffset={2}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionText x={400}
                             y={260}
                             text={"DENNETT"}
                             fontSize={100}
                             shadingOffset={2}
                             featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

                <SectionLine x={40} y={290} width={720} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>
                <SectionLine x={40} y={298} width={720} featureColour={featureColour} lowlight={lowlight} highlight={highlight}/>

            </svg>
        )
    }

    render() {

        const { galleryWidth, hue, saturation, lightness } = this.props;

        const wallColour = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const featureColour = `hsl(${hue}, ${saturation}%, ${lightness - 5}%)`;
        const highlight = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
        const lowlight = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;

        const nameContent = this.createNameContent(galleryWidth, featureColour, lowlight, highlight);

        const buildingSectionProps = {
            galleryWidth, wallColour, featureColour, highlight, lowlight
        };

        return (
            <BuildingSection {...buildingSectionProps}
                             height={370}
                             content={nameContent}/>
        )
    }
}

export default NameSection;