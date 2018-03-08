import React from 'react';
// styles
import './frameTypeOptionTile_styles.css';

const FrameTypeOptionTile = function ({label, index, onClick, isSelected}) {

    const tileStyle = isSelected ? {backgroundColor:'red'} : {backgroundColor:'white'};

    return (
        <div className={'frameTypeOptionTile'} style={tileStyle} onClick={() => onClick(index)}>
            {label}
        </div>
    )
};

export default FrameTypeOptionTile;