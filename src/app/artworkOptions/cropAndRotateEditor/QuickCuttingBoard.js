// externals
import React, { Component } from "react";
// components
import QuickCuttingOverlay from "./assets/QuickCuttingOverlay";

class QuickCuttingBoard extends Component {
    constructor(props) {
        super(props);

        this.onCuttingOverlayChange = this.onCuttingOverlayChange.bind(this);
        this.getCropData = this.getCropData.bind(this);
    }

    // Update on Handle move to store values and ensure image can be
    onCuttingOverlayChange(leftX, rightX, topY, bottomY, width, height) {
        if (this.props.onCropUpdate) {
            const leftPercent = leftX / width;
            const rightPercent = rightX / width;
            const topPercent = topY / height;
            const bottomPercent = bottomY / height;

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
        const { width = 100, height = 100, onRotateClick } = this.props;
        const cropData = this.getCropData(width, height);

        return (

            <QuickCuttingOverlay
                onRotateClick={onRotateClick}
                onChange={this.onCuttingOverlayChange}
                {...cropData}/>

        );
    }
}

export default QuickCuttingBoard;