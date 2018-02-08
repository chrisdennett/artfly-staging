import React from 'react';
// comps
import Butt from "../../global/Butt/Butt";

const PresetButton = function ({icon, label, width, height, onSelect}) {

    const onClick = () => {
        onSelect(width, height);
    };

    return (
        <Butt onClick={onClick} svgIcon={icon}>{label}</Butt>
    )
};

export default PresetButton;