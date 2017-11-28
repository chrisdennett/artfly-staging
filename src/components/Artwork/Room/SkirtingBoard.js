import React from 'react';

const SkirtingBoard = function ({top, height}) {

    const topBarPercent = 0.16;
    const topBarShadowPercent = 0.04;
    const bottomShadowPercent = 0.02;
    const mainPanelPercent = 1 - (topBarPercent + topBarShadowPercent + bottomShadowPercent);

    const topBarHeight = height * topBarPercent;
    const topBarShadowHeight = height * topBarShadowPercent;
    const mainPanelHeight = height * mainPanelPercent;
    const bottomShadowHeight = height * bottomShadowPercent;

    const topBarShadowY = topBarHeight;
    const mainPanelY = topBarShadowY + topBarShadowHeight;
    const bottomShadowY = mainPanelY + mainPanelHeight;

    return (
        <g transform={`translate(0, ${top})`}>
            <rect fill="#ffffff" width="100%" height={topBarHeight}/>
            <rect fill="#f7f7f7" y={mainPanelY} width="100%" height={mainPanelHeight}/>
            <rect fill="#d3d3d3" y={topBarShadowY} width="100%" height={topBarShadowHeight}/>
            <rect fill="#515151" y={bottomShadowY} width="100%" height={bottomShadowHeight}/>
        </g>
    )
};

export default SkirtingBoard;