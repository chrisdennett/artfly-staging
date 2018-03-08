import React from 'react';
// comps
import Slider from "../slider/Slider";
import FramePresetOption from "./FramePresetOption";

const preset = {
    frameColour: {hue:300,saturation:50,lightness:50},
    mountColour: {hue:30,saturation:0,lightness:99},
    frameThicknessDecimal: 0.01,
    mountThicknessDecimal: 0.1
};

const PresetsControl = function ({frameSize, mountSize, onFrameSizeChange, onMountSizeChange, onPresetSelect}) {
    return (
        <div>
            <Slider label={`Frame size`}
                    id={`preset-frame-size`}
                    min={0} max={0.2} step={0.001}
                    value={frameSize}
                    onChange={onFrameSizeChange}/>

            <Slider label={`Mount size`}
                    id={`preset-mount-size`}
                    min={0} max={0.2} step={0.001}
                    value={mountSize}
                    onChange={onMountSizeChange}/>

            <div>
                <FramePresetOption {...preset} onClick={onPresetSelect}/>
            </div>

        </div>
    )
};

export default PresetsControl;