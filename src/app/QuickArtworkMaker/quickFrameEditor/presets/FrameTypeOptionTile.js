import React from 'react';
// styles
import './frameTypeOptionTile_styles.css';

const FrameTypeOptionTile = function ({label, onClick, isSelected}) {

    const tileStyle = isSelected ? {backgroundColor:'black', color:'white'} : {backgroundColor:'white'};

    return (
        <div className={'frameTypeOptionTile'} style={tileStyle} onClick={() => onClick(label)}>
            {label}
        </div>
    )
};

export default FrameTypeOptionTile;