import React from 'react';
// comps
import Butt from "../../global/Butt/Butt";

const PresetButton = function ({icon, label, width, height, onSelect}) {

    const onClick = () => {
        onSelect(width, height, label);
    };

    return (
        <Butt onClick={onClick} svgIcon={icon} />
    )
};

export default PresetButton;