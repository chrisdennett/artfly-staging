import React from 'react';
// styles
import './quickArtworkRoom_floor_styles.css';
import QuickArtworkRoomFloorSkirting from "./QuickArtworkRoomFloorSkirting";

const QuickArtworkRoomFloor = function ({ height }) {

    const floorStyles = { height };
    const minSkirtingHeight = 20;
    const maxSkirtingHeight = 32;
    const skirtingPercentage = 0.3;

    // set skirting height by percentage only if within allowed range of heights
    const proposedSkirtingHeight = height * skirtingPercentage;
    let skirtingHeight;
    if (proposedSkirtingHeight > maxSkirtingHeight) skirtingHeight = maxSkirtingHeight;
    else if (proposedSkirtingHeight < minSkirtingHeight) skirtingHeight = minSkirtingHeight;
    else skirtingHeight = proposedSkirtingHeight;


    const floorboardsHeight = height - skirtingHeight;
    const floorboardStyles = { height: floorboardsHeight };

    return (
        <div className={'quickArtworkRoom_floor'} style={floorStyles}>
            <QuickArtworkRoomFloorSkirting height={skirtingHeight}/>
            <div className={'quickArtworkRoom_floor--floorBoards'} style={floorboardStyles}/>
        </div>
    )
};

export default QuickArtworkRoomFloor;