// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// components
import CropAndRotate from "./CropAndRotate";

class CropAndRotateModal extends Component {
    render() {
        const { screenWidth, screenHeight, ...rest } = this.props;
        const { initialCropData, loadedImg, onCancel, onDone, orientation, imgUrl } = rest;

        // on screens wider than 800 there's a nav bar at the side - 100px
        // for screens less than 800 the bar is at the top - 91px
        const navBarOnTheSide = screenWidth > 800;
        const w = navBarOnTheSide ? screenWidth - 100 : screenWidth;
        const h = navBarOnTheSide ? screenHeight : screenHeight - 91;

        return (
            <CropAndRotate width={w}
                           height={h}
                           initialCropData={initialCropData}
                           imgUrl={imgUrl}
                           loadedImg={loadedImg}
                           onCancel={onCancel}
                           onDone={onDone}
                           orientation={orientation}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenWidth: state.ui.windowSize.windowWidth,
        screenHeight: state.ui.windowSize.windowHeight
    }
};

export default connect(mapStateToProps)(CropAndRotateModal);
