import React from 'react';
// ui
import { CircularProgress } from "@rmwc/circular-progress";
import { Typography } from "@rmwc/typography";

const EditorCanvas = ({ canvasInit, dimensions, sourceCanvas }) => {

    if (!dimensions) return null;

    let holderStyle = {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: dimensions.top,
        height: dimensions.height,
        width: dimensions.width,
    };

    if (sourceCanvas) {
        const { w, h, x, y } = getCanvasDimensions({
            sourceWidth: sourceCanvas.width,
            sourceHeight: sourceCanvas.height,
            availableHeight: dimensions.height,
            availableWidth: dimensions.width,
        });

        holderStyle.top = dimensions.top + y;
        holderStyle.left = x;
        holderStyle.width = w;
        holderStyle.height = h;
    }

    return (
        <div style={holderStyle}>
            {sourceCanvas &&
                <canvas ref={canvas => canvasInit(canvas)}
                    className={'responsiveCanvas'} />
            }

            {!sourceCanvas &&
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress size="large" />
                    <Typography use={'button'} tag={'div'}>
                        Loading source image
                </Typography>
                </div>
            }
        </div>
    )
};

export default EditorCanvas;

const getCanvasDimensions = ({ availableHeight, availableWidth, sourceHeight, sourceWidth }) => {

    const hToWRatio = sourceWidth / sourceHeight;
    const wToHRatio = sourceHeight / sourceWidth;

    const maxW = sourceWidth ? Math.min(availableWidth, sourceWidth) : availableWidth;
    const maxH = sourceHeight ? Math.min(availableHeight, sourceHeight) : availableHeight;

    let w = maxW;
    let h = w * wToHRatio;

    if (h > maxH) {
        h = maxH;
        w = h * hToWRatio;
    }

    const x = (availableWidth - w) / 2;
    const y = (availableHeight - h) / 2;

    return { w, h, x, y };
}