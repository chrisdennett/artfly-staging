import React from 'react';
// style
import './colourAndSizeControl_styles.css'
// comps
import Slider from "../slider/Slider";

import ColourPicker from "../colourPicker/ColourPicker";

const ColourAndSizeControl = function ({size, colour, title, id, onSizeChange, onColourChange}) {

    return (
        <div className={'colourAndSizeControls'}>
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