import React from 'react';
import { BLUE, GREEN, PURPLE, RED, YELLOW } from "../../Themes";

const IconAddArt = ({ width = 38, height = 38, fill, stroke = 'none' }) => {

    const skyFill = BLUE;
    const sunFill = YELLOW;
    const mountainFill = GREEN;
    const plusSymbolBgFill = '#fff';
    const plusSymbolFill = '#000';

    return (
        <svg height={width} width={height} viewBox="0 0 21 21">

            <path stroke={stroke} fill={skyFill}
                d="M16.89 20.51H2.19c-.936 0-1.696-.744-1.696-1.663V6.457c0-.918.76-1.663 1.696-1.663h14.696c.934 0 1.696.744 1.696 1.663v12.39c0 .918-.76 1.663-1.696 1.663z"/>

            <path stroke={stroke} fill={sunFill}
                d="M4.789 7.679c-1.093 0-1.978.868-1.978 1.94 0 1.071.886 1.94 1.978 1.94 1.093 0 1.978-.868 1.978-1.94 0-1.071-.886-1.94-1.978-1.94z"/>

            <path stroke={stroke} fill={mountainFill}
                  d="M2.759 18.3h13.57v-3.879l-3.092-3.548a.43.43 0 0 0-.6 0l-4.793 5.21-1.962-1.92a.43.43 0 0 0-.6 0L2.758 16.64z"/>

            <rect fill={plusSymbolBgFill} stroke={stroke}
                  height="8.28" strokeWidth=".8"
                  ry="1.39" width="8.584"
                  strokeOpacity=".99" y=".412" x="12.01" color="#000"/>

            <path fill={plusSymbolFill}
                  d="M15.7 1.682v2.265h-2.264v1.208H15.7v2.266h1.208V5.155h2.265V3.947h-2.265V1.682z" color="#000"/>
        </svg>
    )
};

export default IconAddArt;