import React from 'react';
// comps
import './quickArtworkRoom_styles.css';
import QuickArtworkRoomFloor from "./quickArtworkRoom--floor/QuickArtworkRoomFloor";

const QuickArtworkRoom = ({ height, floorHeight }) => {

    const vignetteStyle = { height: height - floorHeight };

    return (
        <div className={'quickArtworkRoom'}>
            <div className={'quickArtworkRoom--vignette'} style={vignetteStyle}/>

            <div className={'quickArtworkRoom--floorHolder'}>
                <QuickArtworkRoomFloor height={floorHeight}/>
            </div>
        </div>
    )
};

export default QuickArtworkRoom;