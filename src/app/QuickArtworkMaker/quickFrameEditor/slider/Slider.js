import React from 'react';
// styles
import './slider_styles.css';

const Slider = function ({ value, label, id, min, max, step, onChange, swatches }) {
    return (
        <div className="sliderHolder">
            <div className={'slider--label'}>{label}:</div>

            {swatches &&
            swatches
            }

            <input type="range"
                   id={id}
                   className="slider"
                   min={min}
                   max={max}
                   step={step}
                   value={value}
                   onChange={onChange}/>
        </div>
    )
};

export default Slider;