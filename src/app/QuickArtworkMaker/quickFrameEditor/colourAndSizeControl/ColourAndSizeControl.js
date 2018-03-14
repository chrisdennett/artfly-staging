import React from 'react';
// comps
import Slider from "../../../global/slider/Slider";

import ColourPicker from "../../../global/colourPicker/ColourPicker";

const ColourAndSizeControl = function ({size, colour, title, id, onSizeChange, onColourChange}) {

    return (
        <div>
            <h2>{`${title} size:`}</h2>

            <Slider id={`${id}-size`}
                    min={0} max={0.2} step={0.001}
                    value={size}
                    colour={colour}
                    onChange={onSizeChange}/>

            <ColourPicker colour={colour}
                          id={`${id}-colour`}
                          onColourChange={onColourChange}/>
        </div>
    )
};

export default ColourAndSizeControl;