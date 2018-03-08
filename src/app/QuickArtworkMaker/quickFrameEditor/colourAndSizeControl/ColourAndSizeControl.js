import React from 'react';
// comps
import Slider from "../slider/Slider";
import ColourPicker from "../colourPicker/ColourPicker";

const ColourAndSizeControl = function ({size, colour, title, id, onSizeChange, onColourChange}) {

    return (
        <div>
            <Slider label={`${title} size`}
                    id={`${id}-size`}
                    min={0} max={0.2} step={0.001}
                    value={size}
                    onChange={onSizeChange}/>

            <ColourPicker colour={colour}
                          id={`${id}-colour`}
                          onColourChange={onColourChange}/>
        </div>
    )
};

export default ColourAndSizeControl;