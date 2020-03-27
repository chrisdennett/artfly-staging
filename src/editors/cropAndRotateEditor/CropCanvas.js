import React, { Component } from "react";
// styles
import './cropAndRotate_styles.css';
// helper
import {
    copyToCanvas,
    createMaxSizeCanvas,
    createOrientatedCanvas
} from "../canvasCreators";
import CropControls from "./CropControls";

class CropCanvas extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedHandle: null };

        this.updateCanvas = this.updateCanvas.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.orientation !== this.props.orientation) {
            this.updateCanvas();
        }
    }

    onCropChange(newCropData) {
        const { onChange, canvasW, canvasH } = this.props;
        const cropDataAsFractions = getFractionDimensions({ w: canvasW, h: canvasH, ...newCropData })

        onChange(cropDataAsFractions);
    }

    updateCanvas() {
        const { sourceImg, orientation, canvasW, canvasH } = this.props;
        if (!this.canvas || !sourceImg) return null;
        if (!this.sourceImg) this.sourceImg = sourceImg;

        const orientatedCanvas = createOrientatedCanvas(sourceImg, orientation);
        const resizedCanvas = createMaxSizeCanvas(orientatedCanvas, canvasW, canvasH);
        copyToCanvas(resizedCanvas, this.canvas);
    }

    render() {
        const { cropData, canvasW, canvasH, canvasX, canvasY } = this.props;
        if (!canvasW || !canvasH) return null;

        const canvasHolderStyle = {
            position: 'absolute',
            width: canvasW,
            height: canvasH,
            top: canvasY,
            left: canvasX,
            flex: 1,
            display: 'flex',
        }

        const overLayControlsHolder = { ...canvasHolderStyle };

        const { topY = 0, bottomY = 1, leftX = 0, rightX = 1 } = getDimensionsFromFractions({ ...cropData, w: canvasW, h: canvasH });

        return (
            <React.Fragment>

                <div style={canvasHolderStyle}>

                    {/*
                TODO: apparently touchAction isn't supported on safari
                I've used it to stop the page scrolling when dragging your
                finger.  This happens because the way phones scroll down the
                content to show the search bar.
            */}
                    <canvas ref={c => this.canvas = c}
                        className={'responsiveCanvas'}
                        style={{ userSelect: 'none', touchAction: 'none' }}
                    />
                </div>

                {cropData &&
                    <div style={overLayControlsHolder}>
                        <CropControls
                            onChange={this.onCropChange}
                            width={canvasW}
                            height={canvasH}
                            leftX={leftX}
                            rightX={rightX}
                            topY={topY}
                            bottomY={bottomY}
                        />
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default CropCanvas;

const getFractionDimensions = ({ w, h, leftX, rightX, topY, bottomY }) => {
    const topPercent = topY / h;
    const bottomPercent = bottomY / h;
    const leftPercent = leftX / w;
    const rightPercent = rightX / w;

    return { topPercent, bottomPercent, leftPercent, rightPercent };
}

const getDimensionsFromFractions = ({ w, h, topPercent = 0, bottomPercent = 1, leftPercent = 0, rightPercent = 1 }) => {
    const topY = topPercent * h;
    const bottomY = bottomPercent * h;
    const leftX = leftPercent * w;
    const rightX = rightPercent * w;

    return { topY, bottomY, leftX, rightX };
}