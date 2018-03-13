import React from 'react';
// styles
import './swatch_styles.css';

const Swatch = function ({label, onClick, isSelected}) {

    const tileStyle = isSelected ? {backgroundColor:'black', color:'white'} : {backgroundColor:'white'};

    return (
        <div className={'swatch'} style={tileStyle} onClick={() => onClick(label)}>
            {label}
        </div>
    )
};

export default Swatch;