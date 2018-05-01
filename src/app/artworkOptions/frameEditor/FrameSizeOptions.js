import React from "react";
import { Slider } from 'rmwc/Slider';
// styles
import './frameEditor_styles.css';

const FrameSizeOptions = ({ frameData, onDataChange }) => {

    const { frameThicknessDecimal, mountThicknessDecimal } = frameData;

    const onFrameThicknessChange = (frameThicknessDecimal) => {
        const newFrameData = { ...frameData, frameThicknessDecimal };
        onDataChange({ frameData: newFrameData });
    };

    const onMountThicknessChange = (mountThicknessDecimal) => {
        const newFrameData = { ...frameData, mountThicknessDecimal };
        onDataChange({ frameData: newFrameData });
    };

    return (
        <div style={{ padding: 10 }} className={'pretty-scroll'}>
            Frame width:
            <Slider
                min={0} max={0.2}
                value={frameThicknessDecimal}
                onInput={e => onFrameThicknessChange(e.detail.value)}
            />

            Mount width:
            <Slider
                min={0} max={0.2}
                value={mountThicknessDecimal}
                onInput={e => onMountThicknessChange(e.detail.value)}
            />

        </div>
    );
}

export default FrameSizeOptions;