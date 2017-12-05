// externals
import React, { Component } from 'react';
// helpers
import * as PhotoHelper from "./assets/PhotoHelper";

const maxImageWidth = 3000;
const maxImageHeight = 3000;

class PhotoUploadCanvas extends Component {

    componentDidMount() {
        const { img, orientation, onCanvasInit } = this.props;

        if (img && this.canvas) {
            PhotoHelper.drawImageToCanvas(img, this.canvas, orientation, maxImageWidth, maxImageHeight, (widthToHeightRatio, heightToWidthRatio) => {
                onCanvasInit(this.canvas, widthToHeightRatio, heightToWidthRatio);
            })
        }
    }

    render() {
        return (
            <div style={{ display: 'none' }}>
                <canvas ref={(canvas) => this.canvas = canvas}/>
            </div>
        )
    }
};

export default PhotoUploadCanvas;