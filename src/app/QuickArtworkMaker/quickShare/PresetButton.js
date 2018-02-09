import React from 'react';
// styles
import './presetButt_styles.css';

const PresetButton = function ({ icon, label, width, height, onSelect }) {

    const onClick = () => {
        onSelect(width, height);
    };

    return (
        <button onClick={onClick} className={'presetButt'}>

            <div className={'presetButt--iconHolder'}>
                {icon}
            </div>

            <div className={'presetButt--label'}>
                {/*{label}<br/>*/}
                {width}×{height}
            </div>

        </button>
    )
};

export default PresetButton;