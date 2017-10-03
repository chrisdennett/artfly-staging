import React, { Component } from 'react';
// import Cloud from "./Cloud";
// import Sun from "./Sun";
// import Ground from "./Ground";

class SvgBackground extends Component {

    render() {
        const { height, width, galleryScale } = this.props;

        let backgroundHeight = height + (150 * galleryScale);
        if(isNaN(backgroundHeight)) return null;

        const treesHeight = 314 * galleryScale;
        const bollardsHeight = 126 * galleryScale;
        const roadHeight = 130 * galleryScale;
        const kerbHeight = 24 * galleryScale;
        const pavementHeight = 95 * galleryScale;
        const pathHeight = 70 * galleryScale;
        const cityscapeHeight = 744 * galleryScale;

        const roadY = backgroundHeight - roadHeight;
        const kerbY = roadY - kerbHeight;
        const pavementY = kerbY - pavementHeight;
        const pathY = pavementY - pathHeight;
        const bollardsY = pathY - (80 * galleryScale);
        const treesY = bollardsY - (200 * galleryScale);
        const cityscapeY = pathY - cityscapeHeight;

        return (
            <g>
                <rect id="sky" height={backgroundHeight} width={width} fill="url(#skyGradient)"/>

                <g transform={`translate(0 ${cityscapeY})`}>
                    <rect fill="url(#cityscape)" width={width} height={cityscapeHeight}/>
                </g>

                <rect id="path" y={pathY} height={pathHeight} width={width} fill="#a6bdca"/>
                <rect id="pavement" y={pavementY} height={pavementHeight} width={width} fill="#ccd7dd"/>
                <rect id="kerb" y={kerbY} height={kerbHeight} width={width} fill="#b5c5ce"/>
                <rect id="road" y={roadY} height={roadHeight} width={width} fill="#8aa3b2"/>

                <path stroke="#ffcc00" d={`M0 ${roadY + 8} H${width}`} strokeWidth={4}/>
                <path stroke="#ffcc00" d={`M0 ${roadY + 15} H${width}`} strokeWidth={4}/>

                <path stroke="#fff" d={`M0 ${roadY + 75} H${width}`} strokeWidth={8} strokeDasharray="64, 32"/>

                <g transform={`translate(0 ${treesY})`}>
                    <rect fill="url(#trees)" width={width} height={treesHeight}/>
                </g>

                <g transform={`translate(0 ${bollardsY})`}>
                    <rect fill="url(#bollards)" width={width} height={bollardsHeight}/>
                </g>

                <defs>
                    <linearGradient id={'skyGradient'} x1="0" x2="0" y1="1" y2="0">
                        <stop offset={'0%'} stopColor={'#f3f7fa'}/>
                        <stop offset={'50%'} stopColor={'#f3f7fa'}/>
                        <stop offset={'100%'} stopColor={'#90e4ff'}/>
                    </linearGradient>

                    <pattern id="bollards" width={167 * galleryScale} height={126 * galleryScale} patternUnits="userSpaceOnUse">
                        <g transform={`scale(${galleryScale})`}>
                            <path fillOpacity=".2" d="M28.49 120.6h137.7v2.916H28.49z"/>
                            <path fill="#6a707d" d="M4.789 32.6h19.21v87.69H4.789z"/>
                            <path fill="#6a707d" d="M8.547 20.91h11.69v20.88H8.547z"/>
                            <path d="M26.7 37.81s53 60 139 0" stroke="#6a707d" strokeWidth="2" fill="none"/>
                            <path fill="#ff8080"
                                  d="M.196 32.6h28.39v9.186H.196zM.196 112.6h28.39v9.186H.196z"/>
                            <path fill="#40434b"
                                  d="M4.782 41.78h19.2v1.332h-19.2zM8.547 29.19a17.95 17.95 0 0 0 .54.197 17.95 17.95 0 0 0 1.74.444 17.95 17.95 0 0 0 1.772.27 17.95 17.95 0 0 0 1.793.09 17.95 17.95 0 0 0 1.27-.048 17.95 17.95 0 0 0 1.783-.215 17.95 17.95 0 0 0 1.75-.392 17.95 17.95 0 0 0 1.043-.348v-8.846H8.548v8.848z"/>
                            <circle cx="14.3" cy="14.3" r="14.3" fill="#6a707d"/>
                            <path
                                d="M14.3 0C6.402 0 0 6.402 0 14.3l.012.3c6.934-2.96 20.19-3.84 28.59-.3 0-7.898-6.4-14.3-14.3-14.3z"
                                fill="#7c818f"/>
                            <path fillOpacity=".2" d="M.196 121.6h28.39v3.679H.196z"/>
                        </g>
                    </pattern>
                    <pattern id="trees" width={607.7 * galleryScale} height={316 * galleryScale} patternUnits="userSpaceOnUse">
                        <g transform={`scale(${galleryScale})`}>
                            <path fill="gray" d="M378.2 294.1h70v5.965h-70z"/>
                            <rect ry="3.769" height="7.537" width="70" y="295.3" x="378.2" fill="gray"/>
                            <rect ry="3.769" height="7.537" width="70" y="289.3" x="378.2" fill="#fff"/>
                            <rect ry="1.67" height="3.34" width="60.83" y="291.3" x="382.2" fill="#4d4d4d"/>
                            <path
                                d="M431 293l-8.342-156.2 43.8-29.75-14.6-5.312-30.24 19.12-8.342-10.62 12.51-32.93-9.385 1.062-11.47 21.25-14.6-30.81-10.43 8.499 23.98 47.8-33.37-20.18-11.47-1.062 41.71 37.18-7.3 151.9z"
                                fill="#947b68"/>
                            <path
                                d="M362.4 1.876a49.97 43.68 0 0 1 39.86 17.43 51.18 38.34 0 0 1 32.39-8.69 51.18 38.34 0 0 1 51.18 38.34 51.18 38.34 0 0 1-1.977 10.51 49.97 42.71 0 0 1 28.47 38.51 49.97 42.71 0 0 1-9.949 25.5 48.77 33.01 0 0 1 .316 3.62 48.77 33.01 0 0 1-48.77 33.01 48.77 33.01 0 0 1-39.33-13.55 45.16 32.03 0 0 1-43.75 24.23 45.16 32.03 0 0 1-45.16-32.03 45.16 32.03 0 0 1 .742-5.717 37.33 33.01 0 0 1-16.39-27.29 37.33 33.01 0 0 1 18.25-28.32 49.97 43.68 0 0 1-15.84-31.86 49.97 43.68 0 0 1 49.97-43.68z"
                                fill="#86ab6b"/>
                            <path fill="gray" d="M71.55 305.1h70v5.965h-70z"/>
                            <rect ry="3.769" height="7.537" width="70" y="306.4" x="71.55" fill="gray"/>
                            <rect ry="3.769" height="7.537" width="70" y="300.4" x="71.55" fill="#fff"/>
                            <rect ry="1.67" height="3.34" width="60.83" y="302.4" x="75.53" fill="#4d4d4d"/>
                            <path
                                d="M159.3 0A53.12 45.58 0 0 0 117 18.18a54.4 40.01 0 0 0-34.45-9.066 54.4 40.01 0 0 0-54.39 40.01 54.4 40.01 0 0 0 2.1 10.97A53.12 44.56 0 0 0 0 100.304a53.12 44.56 0 0 0 10.57 26.6 51.84 34.44 0 0 0-.336 3.776 51.84 34.44 0 0 0 51.84 34.44 51.84 34.44 0 0 0 41.81-14.14 48 33.42 0 0 0 46.5 25.28 48 33.42 0 0 0 48-33.42 48 33.42 0 0 0-.788-5.964 39.68 34.44 0 0 0 17.43-28.47 39.68 34.44 0 0 0-19.4-29.58 53.12 45.58 0 0 0 16.9-33.24 53.12 45.58 0 0 0-53.2-45.58z"
                                fill="#c39734"/>
                            <path
                                d="M86.45 303.7l8.867-162.9-46.55-31.03 15.52-5.542 32.14 19.95 8.867-11.08-13.3-34.36 9.975 1.108 12.19 22.17 15.52-32.14 11.08 8.867-25.49 49.88 35.47-21.06 12.19-1.108-44.33 38.79 7.758 158.5z"
                                fill="#947b68"/>
                        </g>
                    </pattern>
                    <pattern id="cityscape" height={746 * galleryScale} width={300 * galleryScale}
                             patternUnits="userSpaceOnUse">
                        <g transform={`scale(${galleryScale})`}>
                            <path
                                d="M129 87.31c-1.008 0-1.82.939-1.82 2.105v121.3h-18.62V1.915c0-1.056-.735-1.906-1.648-1.906h-85.3c-.96-.014-1.57.844-1.7 1.892v159.7l-20 16.53v563.8c0 1.056.775 2.173 1.648 1.906H298.535c.764 0 1.378-.712 1.378-1.595v-658.3c0-.883-.615-1.594-1.378-1.594h-56.32c-.764 0-1.379.71-1.379 1.594v200.7h-18.62v-195.2c0-1.166-.812-2.105-1.82-2.105z"
                                fill="#e0e9ee"/>
                            <path
                                d="M89.04 187.4c-1.008 0-1.82.939-1.82 2.105v261.3H68.6v-208.8c0-1.056-.735-1.906-1.648-1.906h-65.3c-.913 0-1.648.85-1.648 1.906v500c0 1.056.735 1.906 1.648 1.906H298.627c.764 0 1.378-.712 1.378-1.595v-331.7l-20-19.54v-67.07c0-.883-.615-1.594-1.378-1.594h-74.32c-.764 0-1.379.71-1.379 1.594v68.73l-18.62 12v-215.2c0-1.166-.812-2.105-1.82-2.105z"
                                fill="#cddce4"/>
                            <path
                                d="M300 671.5c.274-24.34-34.07-25.69-37.2-24.18-5.937-16.97-15.54-18.77-29.4-18.79-17.78.03-35.87 8.655-38.48 32.48-.145-.011-.29-.019-.435-.027-6.428.01-12.42 2.655-17.24 7.174-5.77-11.25-14.37-18.32-23.89-18.33-8.892.022-17.35 6.283-23.29 17.22-4.347-13.32-14.48-22-25.73-22.01-3.337.01-6.647.783-9.774 2.29-5.937-16.96-18.55-27.78-32.4-27.8-17.78.03-32.86 17.67-35.47 41.5-.145-.01-.29-.021-.436-.029-5.932.01-11.49 2.265-16.1 6.162-3.52.183-6.93 3.354-10.16 4.347v72.41h300z"
                                fill="#a7c1d0"/>
                        </g>
                    </pattern>
                </defs>
            </g>
        );
    }
}

export default SvgBackground;