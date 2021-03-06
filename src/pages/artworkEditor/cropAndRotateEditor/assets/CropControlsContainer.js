// externals
import React, { Component } from "react";
// Helpers
import {ROUND_TO} from '../../../../components/global/UTILS';
// components
import CropControls from "./CropControls";

class CropControlsContainer extends Component {
    constructor(props) {
        super(props);

        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);
        this.getCropData = this.getCropData.bind(this);
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY, width, height) {
        if (this.props.onCropUpdate) {
            const leftPercent = ROUND_TO(leftX / width, 3);
            const rightPercent = ROUND_TO(rightX / width, 3);
            const topPercent = ROUND_TO(topY / height, 3);
            const bottomPercent = ROUND_TO(bottomY / height, 3);

            this.props.onCropUpdate({ leftPercent, rightPercent, topPercent, bottomPercent });
        }
    }

    // converts percentages into actual numbers
    getCropData(w, h) {
        const { leftPercent, rightPercent, topPercent, bottomPercent } = this.props.cropData;
        let newLeftX, newRightX, newTopY, newBottomY;

        newLeftX = w * leftPercent;
        newRightX = w * rightPercent;
        newTopY = h * topPercent;
        newBottomY = h * bottomPercent;

        return { leftX: newLeftX, rightX: newRightX, topY: newTopY, bottomY: newBottomY, width: w, height: h }
    }

    render() {
        const { width = 100, height = 100, onRotateClick, cropData } = this.props;
        if(!cropData) return null;
        const currCropData = this.getCropData(width, height);

        return (
            <CropControls
                onRotateClick={onRotateClick}
                onChange={this.onCuttingOverlayChange}
                {...currCropData}/>
        );
    }
}

export default CropControlsContainer;