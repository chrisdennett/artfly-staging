import React from 'react';
// styles
import './cuttingMat_styles.css';

const CuttingMat = function ({ width = 100, height = 100 }) {

    const matMargin = 3;
    const matWidth = width - (matMargin * 2);
    const matHeight = height - (matMargin * 2);

    /*const gridTop = matMargin + 15;
    const gridRight = matMargin + 15;
    const gridBottom = matMargin + 15;
    const gridLeft = 80;
    const gridWidth = width - (gridLeft + gridRight);
    const gridHeight = height - (gridTop + gridBottom);*/

    const fill = '#0f6059';
    // const origFill = '#04906a';
    const bgFill = '#044f34';

    const stroke = '#afad3b';
    // const oldStroke = '#a2c656';

    const gridPadding = 30;
    const leftPadding = 85;
    const gridWidth = width - (leftPadding + gridPadding);
    const gridHeight = height - (gridPadding * 2);

    let hLines = getHGridLines(gridWidth, gridHeight, leftPadding, gridPadding, width, height, stroke);
    let vLines = getVGridLines(gridWidth, gridHeight, leftPadding, gridPadding, width, height, stroke);

    const diagonal = <line key={'diag'} x1={0} y1={gridHeight} x2={gridWidth} y2={0} strokeWidth={1} stroke={stroke}/>

    /*let vLines = [];
    for(let j=0; j<vGridLines+1; j++){
        const y = j * actualSpacing;
        hLines.push(<line key={y} x1={0} y1={y} x2={gridWidth-30} y2={y} strokeWidth={1} stroke={stroke}/>)
    }*/

    const grid = <g transform={`translate(${leftPadding}, ${gridPadding})`}>
        {hLines}
        {vLines}
        {diagonal}
    </g>;


    return (

        <svg className='cuttingMat--svg' width={width} height={height}>

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

        </svg>
    )


    /*return (

        <svg className='cuttingMat--svg' width={width} height={height}>
            <defs>
                <pattern id="minorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke={stroke} strokeWidth="1"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#minorGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke={stroke} strokeWidth="2"/>
                </pattern>
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

            <rect fill="url(#grid)"
                  x={gridLeft}
                  y={gridTop}
                  width={gridWidth}
                  height={gridHeight}
            />

        </svg>
    )*/
};

export default CuttingMat;


const getHGridLines = (gridWidth, gridHeight, leftPadding, gridPadding, width, height, stroke) => {
    const targetSpacing = 30;
    const totalLines = Math.round(gridHeight / targetSpacing);
    const actualSpacing = gridHeight / totalLines;
    const largeDivLength = 10;
    const smallDivLength = 5;

    let lines = [];
    for (let i = 0; i <= totalLines; i++) {
        const y = i * actualSpacing;
        const y2 = y + (actualSpacing / 2);

       /* let dashArray = i % 2 === 1 ? '10, 2' : '';

        if(i===totalLines){
            dashArray = '';
        }
                         strokeDasharray={dashArray}*/

        // full line
        lines.push(<line key={`v${y}`}
                         x1={-largeDivLength}
                         x2={gridWidth+largeDivLength}
                         y1={y}
                         y2={y}
                         strokeWidth={1}
                         stroke={stroke}/>)

        // sub-division lines LEFT & RIGHT
        if (i < totalLines) {
            lines.push(<line key={`leftSubV${y2}`} x1={-smallDivLength} y1={y2} x2={0} y2={y2} strokeWidth={1} stroke={stroke}/>)
            lines.push(<line key={`rightSubV${y2}`} x1={gridWidth} y1={y2} x2={gridWidth + smallDivLength} y2={y2} strokeWidth={1}
                             stroke={stroke}/>)
        }
    }

    return lines;
};

const getVGridLines = (gridWidth, gridHeight, leftPadding, gridPadding, width, height, stroke) => {
    const targetSpacing = 30;
    const totalLines = Math.round(gridWidth / targetSpacing);
    const actualSpacing = gridWidth / totalLines;
    const largeDivLength = 10;
    const smallDivLength = 5;

    let lines = [];
    for (let i = 0; i <= totalLines; i++) {
        const x = i * actualSpacing;
        const x2 = x + (actualSpacing / 2);

       /* let dashArray = i % 2 === 1 ? '10, 2' : '';

        if(i===totalLines){
            dashArray = '';
                         strokeDasharray={dashArray}
        }*/

        // full line
        lines.push(<line key={`v${x}`}
                         x1={x}
                         x2={x}
                         y1={-largeDivLength}
                         y2={gridHeight+largeDivLength}
                         strokeWidth={1}
                         stroke={stroke}/>);

        // sub-division lines TOP & BOTTOM
        if (i < totalLines) {
            lines.push(<line key={`topSubV${x2}`} x1={x2} y1={-smallDivLength} x2={x2} y2={0} strokeWidth={1} stroke={stroke}/>)
            lines.push(<line key={`bottomSubV${x2}`} x1={x2} y1={gridHeight} x2={x2} y2={gridHeight+smallDivLength} strokeWidth={1}
                             stroke={stroke}/>)
        }
    }

    return lines;
};