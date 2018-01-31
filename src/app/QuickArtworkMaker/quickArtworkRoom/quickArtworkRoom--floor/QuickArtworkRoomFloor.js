import React from 'react';
// styles
import './quickArtworkRoom_floor_styles.css';
import QuickArtworkRoomFloorSkirting from "./QuickArtworkRoomFloorSkirting";

const QuickArtworkRoomFloor = function ({ height }) {

    const floorStyles = {height:height};
    const floorboardsHeight = height - 42;
    const floorboardStyles = { height: floorboardsHeight};

    return (
        <div className={'quickArtworkRoom_floor'} style={floorStyles}>
            <QuickArtworkRoomFloorSkirting/>
            <div className={'quickArtworkRoom_floor--floorBoards'} style={floorboardStyles}/>
        </div>
    )
};

export default QuickArtworkRoomFloor;