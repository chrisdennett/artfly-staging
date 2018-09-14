import React from 'react';
import { Typography } from "rmwc/Typography";
import { Slider } from "rmwc/Slider";

const SliderControl = ({ label = '', min = 0, max = 100, step=1, value, onChange, discrete=true }) => {
    return (
        <div className={'sliderControl'}>
            <Typography use={'button'} tag={'div'}
                        className={'sliderControl--label'}>
                {label}
            </Typography>
            <div className={'sliderControl--sliderHolder'}>
                <Slider
                    discrete={discrete}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onInput={e => onChange(e.detail.value)}
                />
            </div>
        </div>
    )
};

export default SliderControl;