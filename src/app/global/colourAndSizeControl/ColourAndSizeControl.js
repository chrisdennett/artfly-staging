import React from 'react';
// style
import './colourAndSizeControl_styles.css'
// comps
import Slider from "../slider/Slider";
import ColourPicker from "../colourPicker/ColourPicker";
import ToolControlPanelContent from "../toolControlPanel/ToolControlPanelContent";
import ToolControlPanelSection from "../toolControlPanel/ToolControlPanelSection";

const ColourAndSizeControl = function ({ size, colour, title, id, onSizeChange, onColourChange }) {

    return (
        <ToolControlPanelContent>
            <ToolControlPanelSection title={`${title} size:`}>
                <Slider id={`${id}-size`}
                        min={0} max={0.2} step={0.001}
                        value={size}
                        colour={colour}
                        onChange={onSizeChange}/>
            </ToolControlPanelSection>

            <ToolControlPanelSection title={`Custom colour:`}>
                <ColourPicker colour={colour}
                              id={`${id}-colour`}
                              onColourChange={onColourChange}/>
            </ToolControlPanelSection>

        </ToolControlPanelContent>
    )
};

export default ColourAndSizeControl;