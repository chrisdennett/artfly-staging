import React from 'react';
// styles
import './cuttingMat_styles.css';

//https://css-tricks.com/examples/HSLaExplorer/
//http://hslpicker.com/#0f615a

const CuttingMat = function ({ showSpinner = false, spinnerLabel = 'LOADING', width = 100, height = 100, colour = 'green', label = 'CROP & ROTATE' }) {

    const matMargin = 3;
    const matWidth = width - (matMargin * 2);
    const matHeight = height - (matMargin * 2);

    let fill;
    let lineColour = 'rgba(255,255,255,0.2)';
    const bgFill = '#363636';

    switch (colour) {
        case 'green':
            // ref = '#0f6059';
            fill = 'hsl(175, 73%, 22%)';
            break;

        case 'light-green':
            // ref = '#accc63';
            fill = 'hsl(78, 51%, 59%)';
            break;

        case 'pink':
            // ref = '#b75e78';
            fill = 'hsl(342, 38%, 54%)';
            break;

        case 'purple':
            // ref = '#9862a8';
            fill = 'hsl(286, 29%, 52%)';
            break;

        case 'red':
            // ref = '#b23e4d';
            fill = 'hsl(352, 48%, 47%)';
            break;

        case 'slate':
            // ref = '#52575c';
            fill = 'hsl(210, 6%, 34%)';
            break;

        case 'putty':
            // ref = '#c6c3a2';
            fill = 'hsl(55, 24%, 71%)';
            lineColour = 'rgba(0,0,0,0.1)';
            break;

        case 'yellow':
            // ref = '#c59e2f';
            fill = 'hsl(47,95%,40%)';
            lineColour = 'hsla(47,95%,10%,0.2)';
            break;

        default :
            break;
    }

    const gridPadding = 30;
    const leftPadding = 85;
    const gapForControls = 55;
    const gridWidth = width - (leftPadding + gridPadding);
    const gridHeight = height - (gapForControls + (gridPadding * 2));

    let hLines = getHGridLines(gridWidth, gridHeight, leftPadding, gridPadding, width, height, lineColour, fill);
    let vLines = getVGridLines(gridWidth, gridHeight, leftPadding, gridPadding, width, height, lineColour, fill);

    const diagonal = <line key={'diag'} x1={0} y1={gridHeight} x2={gridWidth} y2={0} strokeWidth={1}
                           stroke={lineColour}/>

    const titleBg = <rect x={30} y={30} width={240} height={62} fill={fill} stroke={lineColour}/>;
    const title = <text textAnchor={'middle'} width={240} x={150} y={60} fontSize={24} fontWeight={'bold'}
                        fill={lineColour}>{label}</text>;
    const subtitle = <text textAnchor={'middle'} width={240} x={150} y={82} fontSize={14} fill={lineColour}>--Artfly
        editing
        mat--</text>;

    const grid = <g transform={`translate(${leftPadding}, ${gridPadding})`}>
        {hLines}
        {vLines}
        {diagonal}
        {titleBg}
        {title}
        {subtitle}
    </g>;

    const matCenterX = width / 2;
    const matCenterY = height / 2;

    return (
        <svg className='cuttingMat--svg' width={width} height={height}>

            <defs>
                <radialGradient id="exampleGradient" cx={'30%'} cy={'40%'}>
                    <stop offset="10%" stopColor={'rgba(255,255,255,0.25)'}/>
                    <stop offset="85%" stopColor={'rgba(255,255,255,0)'}/>
                </radialGradient>
            </defs>

            <rect fill={bgFill}
                  width={width}
                  height={height}
            />

            <rect fill={fill}
                  x={matMargin}
                  y={matMargin}
                  width={matWidth}
                  height={matHeight}
                  rx={10}
                  ry={10}
            />

            {grid}

            {showSpinner &&
            <g transform={`translate(${matCenterX}, ${matCenterY})`}>

                <circle r="100" stroke={lineColour} strokeWidth="1" fill={fill}/>
                <text textAnchor={'middle'}
                      width={240}
                      fontSize={24}
                      opacity={0.7}
                      fill={'white'}>
                    {spinnerLabel}
                </text>

                <polygon className={'cuttingMat--spinner'}
                         points={`0,0, 100, 0, 100, 10`}
                         fill={lineColour} />
            </g>
            }


            <rect fill="url(#exampleGradient)"
                  x={matMargin}
                  y={matMargin}
                  width={matWidth}
                  height={matHeight}
                  rx={10}
                  ry={10}
            />

        </svg>
    )
};

export default CuttingMat;


const getHGridLines = (gridWidth, gridHeight, leftPadding, gridPadding, width, height, lineColour, fill) => {
    const targetSpacing = 30;
    const totalLines = Math.round(gridHeight / targetSpacing);
    const actualSpacing = gridHeight / totalLines;
    const largeDivLength = 10;
    const smallDivLength = 5;

    let lines = [];
    for (let i = 0; i <= totalLines; i++) {
        const y = i * actualSpacing;
        const y2 = y + (actualSpacing / 2);

        // full line
        lines.push(<line key={`v${y}`}
                         x1={-largeDivLength}
                         x2={gridWidth + largeDivLength}
                         y1={y}
                         y2={y}
                         strokeWidth={1}
                         stroke={lineColour}/>);

        // sub-division lines LEFT & RIGHT
        if (i < totalLines) {
            lines.push(<line key={`leftSubV${y2}`} x1={-smallDivLength} y1={y2} x2={0} y2={y2} strokeWidth={1}
                             stroke={lineColour}/>);
            lines.push(<line key={`rightSubV${y2}`} x1={gridWidth} y1={y2} x2={gridWidth + smallDivLength} y2={y2}
                             strokeWidth={1}
                             stroke={lineColour}/>);
        }

        if (i % 2 === 1 && i > 0 && i < totalLines) {
            lines.push(<rect key={`tfBgH${y}`} x={7} y={y - 5} height={10} width={16} fill={fill}/>);
            lines.push(<text key={`tfH${y}`} x={15} y={y + 5} fill={lineColour} textAnchor={'middle'}
                             fontSize="12">{totalLines - i}</text>);

            lines.push(<rect key={`tfBgH2${y}`} x={gridWidth - 17} y={y - 5} height={10} width={16} fill={fill}/>);
            lines.push(<text key={`tfH2${y}`} x={gridWidth - 10} y={y + 5} fill={lineColour} textAnchor={'middle'}
                             fontSize="12">{totalLines - i}</text>)

        }
    }

    return lines;
};

const getVGridLines = (gridWidth, gridHeight, leftPadding, gridPadding, width, height, lineColour, fill) => {
    const targetSpacing = 30;
    const totalLines = Math.round(gridWidth / targetSpacing);
    const actualSpacing = gridWidth / totalLines;
    const largeDivLength = 10;
    const smallDivLength = 5;

    let lines = [];
    for (let i = 0; i <= totalLines; i++) {
        const x = i * actualSpacing;
        const x2 = x + (actualSpacing / 2);

        // full line
        lines.push(<line key={`v${x}`}
                         x1={x}
                         x2={x}
                         y1={-largeDivLength}
                         y2={gridHeight + largeDivLength}
                         strokeWidth={1}
                         stroke={lineColour}/>);

        // sub-division lines TOP & BOTTOM
        if (i < totalLines) {
            lines.push(<line key={`topSubV${x2}`} x1={x2} y1={-smallDivLength} x2={x2} y2={0} strokeWidth={1}
                             stroke={lineColour}/>);

            lines.push(<line key={`bottomSubV${x2}`} x1={x2} y1={gridHeight} x2={x2} y2={gridHeight + smallDivLength}
                             strokeWidth={1}
                             stroke={lineColour}/>);
        }

        if (i % 2 === 0 && i > 0 && i < totalLines) {
            // add numbers at the top
            lines.push(<rect key={`tfBgV${x}`} x={x - 5} y={7} height={14} width={10} fill={fill}/>);
            lines.push(<text key={`tfV${x}`} x={x} y={18} fill={lineColour} textAnchor={'middle'}
                             fontSize="12">{i}</text>)

            // add numbers at the bottom
            lines.push(<rect key={`tfBgV2${x}`} x={x - 5} y={gridHeight - 17} height={14} width={10} fill={fill}/>);
            lines.push(<text key={`tfV2${x}`} x={x} y={gridHeight - 7} fill={lineColour} textAnchor={'middle'}
                             fontSize="12">{i}</text>)
        }
    }

    return lines;
};