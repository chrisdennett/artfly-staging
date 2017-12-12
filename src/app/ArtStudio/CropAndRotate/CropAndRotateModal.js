// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// components
import CropAndRotate from "./CropAndRotate";

class CropAndRotateModal extends Component {
    render() {
        const { screenWidth, screenHeight, width, height, ...rest } = this.props;
        const { initialCropData, loadedImg, onCancel, onDone, orientation, imgUrl } = rest;

        const w = width ? width : screenWidth;
        const h = height ? height : screenHeight;

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
