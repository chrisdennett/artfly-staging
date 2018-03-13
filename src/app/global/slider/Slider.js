import React from 'react';
import Slider from 'rc-slider'; //http://react-component.github.io/slider/examples/slider.html
import 'rc-slider/assets/index.css';
// styles
import './slider_styles.css';

const MySlider = function ({ value, label, colour='rgba(0,0,0,0.4)', id, min, max, step, onChange, swatches }) {

    return (
        <div className="sliderHolder">
            <div className={'slider--label'}>{label}:</div>

            {swatches &&
            swatches
            }

            <div className={'slider-wrapper'}>

                <Slider
                    style={{ width: '100%' }}
                    step={step}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    trackStyle={{ background: 'none', height: 10 }}
                    handleStyle={{
                        borderColor: 'white',
                        height: 36,
                        width: 36,
                        marginLeft: -17,
                        marginTop: -14,
                        backgroundColor: 'hsla(312, 65%, 63%, 0.57)'
                    }}
                    railStyle={{ backgroundColor: 'rgba(0,0,0,0.4)', height: 10 }}
                />
            </div>

            {/*<input type="range"
                   id={id}
                   className="slider"
                   min={min}
                   max={max}
                   step={step}
                   value={value}
                   onChange={onChange}/>*/}
        </div>
    )
};

export default MySlider;