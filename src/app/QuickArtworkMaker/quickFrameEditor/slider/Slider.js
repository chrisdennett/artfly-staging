import React from 'react';
// styles
import './slider_styles.css';

const Slider = function ({value, label, min, max, onChange}) {
    return (
        <div className="sliderHolder">
            <div className={'slider--label'}>{label}: </div>
            <input type="range"
                   className="slider"
                   min={min}
                   max={max}
                   value={value}
                   onChange={onChange}/>
        </div>
    )
};

export default Slider;