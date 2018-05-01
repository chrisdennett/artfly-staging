import React from "react";
import { Slider } from 'rmwc/Slider';
// styles
import './frameEditor_styles.css';

const FrameColourOptions = ({ frameData, onDataChange } ) => {

    const { frameColour } = frameData;

    const onHueChange = (hue) => {
        const { frameColour } = frameData;
        const newFrameColour = { ...frameColour, hue };
        const newFrameData = { ...frameData, frameColour: newFrameColour };

        onDataChange({ frameData: newFrameData });
    };

    const onSaturationChange = (saturation) => {
        const { frameColour } = frameData;
        const newFrameColour = { ...frameColour, saturation };
        const newFrameData = { ...frameData, frameColour: newFrameColour };

        onDataChange({ frameData: newFrameData });
    };

    const onLightnessChange = (lightness) => {
        const { frameColour } = frameData;
        const newFrameColour = { ...frameColour, lightness };
        const newFrameData = { ...frameData, frameColour: newFrameColour };

        onDataChange({ frameData: newFrameData });
    };

    return (
        <div style={{ padding: 10 }} className={'pretty-scroll'}>
            Hue:
            <Slider
                min={0} max={255}
                value={frameColour.hue}
                onInput={e => onHueChange(e.detail.value)}
            />

            Saturation:
            <Slider
                min={0} max={100}
                value={frameColour.saturation}
                onInput={e => onSaturationChange(e.detail.value)}
            />

            Lightness:
            <Slider
                min={0} max={100}
                value={frameColour.lightness}
                onInput={e => onLightnessChange(e.detail.value)}
            />

        </div>
    );
};

export default FrameColourOptions;