import React from 'react';
import PixelTypeIcon from "./PixelTypeIcon";

const PixelTypeButt = ({data:pixelType}) => {
    return (
        <div style={{display:'flex', alignItems:'center'}}>
            <PixelTypeIcon type={pixelType.key} />

            <div style={{marginLeft:10}}>
                {pixelType.name}
            </div>
        </div>
    )
};

export default PixelTypeButt;