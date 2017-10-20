// externals
import React, { Component } from "react";
// components
import DragHandle from "./assets/DragHandle";

class ImageCuttingBoard extends Component {
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const canvasHeight = 600;
        const canvasWidth = 800;
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const verticalCropLine1 = 200;
        const verticalCropLine2 = 600;
        const horizontalCropLine1 = 100;
        const horizontalCropLine2 = 500;

        line({ ctx, startX: verticalCropLine1, startY: 0, endX: verticalCropLine1, endY: canvasHeight });
        line({ ctx, startX: verticalCropLine2, startY: 0, endX: verticalCropLine2, endY: canvasHeight });
        line({ ctx, startX: 0, startY: horizontalCropLine1, endX: canvasWidth, endY: horizontalCropLine1 });
        line({ ctx, startX: 0, startY: horizontalCropLine2, endX: canvasWidth, endY: horizontalCropLine2 });
    }

    render() {
        const containerStyle = {
            backgroundColor: '#939393',
            padding: '80px 20px 60px 20px',
            textAlign: 'center'
        };

        const canvasStyle = {
            border: '#fff 1px solid',
            margin: '0 auto'
        };

        return (
            <div style={containerStyle}>
                <DragHandle/>
                <canvas style={canvasStyle} ref="canvas" width={800} height={600}/>
            </div>
        );
    }
}

export default ImageCuttingBoard;

// HELPER functions
function line({ ctx, startX, startY, endX, endY }) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ee00ee';
    ctx.stroke();
}