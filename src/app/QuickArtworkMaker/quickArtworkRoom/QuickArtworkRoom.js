import React from 'react';
//
import './quickArtworkRoom_styles.css';
// import Flooring from "../../global/flooring/Flooring";
import QuickArtworkRoomFloor from "./quickArtworkRoom--floor/QuickArtworkRoomFloor";
// import BrickWall from '../../images/brickwall.png';

const QuickArtworkRoom = function (props) {


    return (
        <div className={'quickArtworkRoom'}>
            <div className={'quickArtworkRoom--floorHolder'}>
                <QuickArtworkRoomFloor height={130}/>
            </div>
        </div>
    )
};

export default QuickArtworkRoom;