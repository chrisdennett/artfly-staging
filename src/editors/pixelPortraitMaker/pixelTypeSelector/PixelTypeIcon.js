import React from 'react';
import {
    drawTubePixel,
    drawRoundPixel,
    drawSquarePixel,
    drawBoxPixel,
    drawDiagonalPixel,
    drawCrossPixel,
    drawTextPixel
} from "../createPixelatedCanvas";

const iconSize = 15;
const getPixelFunction = (type) => {
    if (type === 'round') return drawRoundPixel;
    if (type === 'tube') return drawTubePixel;
    if (type === 'box') return drawBoxPixel;
    if (type === 'diagonal') return drawDiagonalPixel;
    if (type === 'cross') return drawCrossPixel;
    if (type === 'text') return drawTextPixel;
    else return drawSquarePixel;
};
const drawCanvas = (type, canvas) => {
    if (canvas) {
        const createPixelFunc = getPixelFunction(type);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, iconSize, iconSize);
        createPixelFunc(ctx, '#000000', 0, 0, iconSize, {});
    }
};

class PixelTypeIcon extends React.Component {

    componentDidMount() {
        drawCanvas(this.props.type, this.canvas);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.type !== this.props.type) {
            drawCanvas(this.props.type, this.canvas);
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <canvas width={iconSize}
                        height={iconSize}
                        ref={c => this.canvas = c}/>
            </div>
        )
    }
};

export default PixelTypeIcon;

