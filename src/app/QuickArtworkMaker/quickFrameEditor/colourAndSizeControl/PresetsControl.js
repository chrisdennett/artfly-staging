import React from 'react';
// comps
import Slider from "../slider/Slider";

const PresetsControl = function ({frameSize, mountSize, onFrameSizeChange, onMountSizeChange}) {

    return (
        <div>
            <Slider label={`Frame size`}
                    id={`preset-frame-size`}
                    min={0.01} max={0.2} step={0.001}
                    value={frameSize}
                    onChange={onFrameSizeChange}/>

            <Slider label={`Mount size`}
                    id={`preset-mount-size`}
                    min={0.01} max={0.2} step={0.001}
                    value={mountSize}
                    onChange={onMountSizeChange}/>

        </div>
    )
};

export default PresetsControl;