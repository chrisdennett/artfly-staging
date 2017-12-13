import React, { Component } from "react";
// components
// import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';
// import ScrollbarRemover from "../global/ScrollbarRemover";
import Wall from "./assets/Wall";
import Floor from "./assets/Floor";
import SkirtingBoard from "./assets/SkirtingBoard";

class EmptyArtwork extends Component {

    render() {
        const { width, height } = this.props;

        return (
                <svg width={'100%'} height={'100%'}>

                    <Wall />

                    <Floor floorY={850} floorHeight={'100%'} />

                    <SkirtingBoard top={820} height={30}/>

                    <PictureFrame
                        top={20}
                        left={50}
                        frameThickness={20}
                        mountThickness={40}
                        imgWidth={800}
                        imgHeight={600}/>

                </svg>

        );
    }
}

export default EmptyArtwork;