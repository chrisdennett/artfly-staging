import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
//
import './quickArtworkRoom_styles.css';
// import Flooring from "../../global/flooring/Flooring";
import QuickArtworkRoomFloor from "./quickArtworkRoom--floor/QuickArtworkRoomFloor";

// import BrickWall from '../../images/brickwall.png';

class QuickArtworkRoom extends Component {

    render() {

        const { height } = this.props.size;
        const floorPercentage = 0.15;
        const floorHeight = height * floorPercentage;

        return (
            <div className={'quickArtworkRoom'}>
                <div className={'quickArtworkRoom--floorHolder'}>
                    <QuickArtworkRoomFloor height={floorHeight}/>
                </div>
            </div>
        )
    }
}

export default sizeMe({ monitorHeight: true })(QuickArtworkRoom);