// externals
import React from 'react';
// components
import LazyImage from '../../global/LazyImage';

const BuildingWindow = function (props) {
    const svgStyle = {
        cursor: 'pointer'
    };

    return (
        <svg onClick={() => {props.onThumbClick(props.artworkId)}} style={svgStyle} x={props.x} y={props.y} height={props.height} width={props.width}
             viewBox="0 0 212.31675 231.00558">
            <rect id="surroundHightlight" ry="10.55" height="231" width="212.3" x="-.003" fill={props.highlight}/>
            <path id="surroundLowlight"
                  d="M209.5 3.048s2.864 4.563 2.864 7.504v209.9c0 5.846-4.321 10.55-9.688 10.55H9.976c-2.857 0-7.187-3.462-7.187-3.462z"
                  fill={props.lowlight}/>
            <rect id="surround" ry="7.638" height="219.1" width="199.7" y="5.517" x="5.515" fill={props.wallColour}/>
            <rect id="surroundInnerLowlight" ry="5.352" height="165.4" width="165.4" y="22.5" x="24.12"
                  fill={props.lowlight}/>
            <path id="surroundInnderHighlight"
                  d="M25.38 185.9c.741 1.008 2.221 1.913 4.087 1.913h154.6a5.341 5.341 0 0 0 5.352-5.354v-154.6c0-1.865-.474-2.554-1.479-3.656z"
                  fill={props.highlight}/>
            <text id="artworkNumber" fill={props.lowlight}>
                <tspan fontWeight="900" fontSize="36" y="218.372" x="93.878"
                       fontFamily="'Source Code Pro'">{props.number}</tspan>
            </text>
            <path id="windowInside" fill="#fff" d="M31.53 27.47h150.3v151H31.53z"/>

            <g id="blinds">
                <path fill="#ececec" d="M33.51 33.15h145.2v14.93H33.51z"/>
                <path fill="#ececec" d="M33.51 47.46h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-48.67h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 61.29h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-62.5h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 75.12h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-76.33h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 89.18h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-90.39h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 103.7h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-104.9h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 146.2h145.2v14.93H33.51zM33.51 118.3h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3" d="M33.51-119.5h145.2v1.324H33.51z"/>
                <path fill="#ececec" d="M33.51 160h145.2v14.93H33.51zM33.51 132.3h145.2v14.93H33.51z"/>
                <path transform="scale(1 -1)" fill="#b3b3b3"
                      d="M33.51-161.2h145.2v1.324H33.51zM33.51-133.6h145.2v1.324H33.51zM33.51-175.5h145.2v1.324H33.51zM33.51-147.4h145.2v1.324H33.51z"/>
            </g>

            <LazyImage url={props.artworkThumbUrl} imgDelay={props.imgDelay}/>

            <g id="frameGroup">
                <g id="frameLowlights" fill="#444">
                    <path
                        d="M37.96 34.5v12.51h2V36.5h11.4v-2h-13.4zM55.36 34.5v12.51h2V36.5h102v-2h-104zM163.4 34.5v12.51h2V36.5h10.51v-2H163.4zM37.96 51v105.4h2V53h11.4v-2h-13.4zM55.36 51v105.4h2V53h102v-2h-104zM163.4 51v105.4h2V53h10.51v-2H163.4zM37.96 160.4v12.74h2V162.4h11.4v-2h-13.4zM55.36 160.4v12.74h2V162.4h102v-2h-104zM163.4 160.4v12.74h2V162.4h10.51v-2H163.4z"/>
                </g>
                <path id="frame"
                      d="M29.09 26.31v155h155.7v-155H29.09zm8.881 8.19h13.4v12.51h-13.4V34.5zm17.4 0h104v12.51h-104V34.5zm108 0h12.51v12.51h-12.51V34.5zm-125.4 16.51h13.4v105.4h-13.4V51.01zm17.4 0h104v105.4h-104V51.01zm108 0h12.51v105.4h-12.51V51.01zm-125.4 109.4h13.4v12.74h-13.4v-12.74zm17.4 0h104v12.74h-104v-12.74zm108 0h12.51v12.74h-12.51v-12.74z"
                      fill="gray"/>
                <g id="frameHighlights" fill="#aaa">
                    <path
                        d="M49.36 34.48v10.51h-11.4v2h13.4V34.48h-2zM157.4 34.48v10.51h-102v2h104V34.48h-2zM173.9 34.48v10.51h-10.51v2h12.51V34.48h-2zM49.36 50.99v103.4h-11.4v2h13.4V50.99h-2zM157.4 50.99v103.4h-102v2h104V50.99h-2zM173.9 50.99v103.4h-10.51v2h12.51V50.99h-2zM49.36 160.4v10.74h-11.4v2h13.4V160.4h-2zM157.4 160.4v10.74h-102v2h104V160.4h-2zM173.9 160.4v10.74h-10.51v2h12.51V160.4h-2z"/>
                </g>
            </g>
        </svg>
    )
};

export default BuildingWindow;