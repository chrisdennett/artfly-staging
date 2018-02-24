import React from 'react';
// styles
import './presetButt_styles.css';

const PresetButton = function ({ icon, presetName, width, height, onSelect }) {

    const onClick = () => {
        onSelect(width, height, presetName);
    };

    return (
        <button onClick={onClick} className={'presetButt'}>

            <div className={'presetButt--iconHolder'}>
                {icon}
            </div>

            <div className={'presetButt--label'}>
                {width}×{height}
            </div>

        </button>
    )
};

export default PresetButton;