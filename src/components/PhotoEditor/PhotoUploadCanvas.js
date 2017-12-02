import React, { Component } from 'react';
import * as PhotoHelper from "./assets/PhotoHelper";

const maxImageWidth = 3000;
const maxImageHeight = 3000;

class PhotoUploadCanvas extends Component {

    componentDidMount() {
        const { img, orientation, onCanvasInit } = this.props;

        console.log("orientation: ", orientation);

        if (img && this.canvas) {
            PhotoHelper.drawImageToCanvas(img, this.canvas, orientation, maxImageWidth, maxImageHeight, () => {
                onCanvasInit(this.canvas);
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