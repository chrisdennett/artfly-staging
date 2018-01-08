import React from 'react';

const LoadingOverlay = function () {
    return (
        <div style={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div style={{margin:'auto', width:200, paddingTop:50, color:'#fff'}}>
                <svg viewBox="0 0 160 160" style={{width:'100%'}}>
                    <g color="#000">
                        <g>
                            <path
                                d="M148 111.7c4.976-5.58 4.014-18-7.768-21.43-11.43-3.331-23.78-3.472-23.78-3.472-3.168 17.84 23.85 34.04 31.55 24.9z"
                                stroke="#000" strokeWidth="3" fill="#fff"/>
                            <path
                                d="M159.2 52.05c5.223 12.99-.272 31.26-15.38 34.46-14.65 3.104-29.52.619-29.52.619 1.245-30.82 32.35-60.06 44.9-35.08zM14.62 111.7c-4.976-5.6-4.01-18.03 7.77-21.46 11.42-3.33 23.78-3.47 23.78-3.47 3.17 17.83-23.84 34.03-31.55 24.93z"
                                stroke="#000" strokeWidth="3" fill="#fff"/>
                            <path
                                d="M3.442 52.05c-5.223 12.99.272 31.26 15.38 34.46 14.65 3.104 29.52.619 29.52.619-1.24-30.81-32.35-60.06-44.9-35.08z"
                                stroke="#000" strokeWidth="3" fill="#fff"/>
                            <path stroke="#000" strokeWidth="3.148" fill="#e9ddaf"
                                  transform="matrix(1.165 0 0 .7797 -57.96 -300.7)"
                                  d="M148.7 437.5H91.06l14.41-24.96 14.41-24.96 14.41 24.96z"/>
                            <path d="M68.17 17.26c8.326-2.324 17.25-2.784 27.21 0L81.78 1.49z" stroke="#000"
                                  strokeWidth="3"
                                  fill="red"/>
                            <path d="M67.06 41.94c10.95-8.918 20.5-6.5 29.54 0v87.38H67.06z" stroke="#000"
                                  strokeWidth="3"
                                  fill="#fc0"/>
                            <path
                                d="M47.02 41.94c7.498-8.918 14.03-6.5 20.22 0v87.38H47.02zM96.42 41.94c7.498-8.918 14.03-6.5 20.22 0v87.38H96.42z"
                                stroke="#000" strokeWidth="3" fill="#f60"/>
                            <ellipse rx="20.44" ry="20.7" stroke="#000" cy="71.01" cx="60.8" strokeWidth="3"
                                     fill="#fff"/>
                            <ellipse rx="9.527" ry="9.646" cy="71.01" cx="60.8"/>
                            <ellipse rx="20.44" ry="20.7" stroke="#000" cy="71.01" cx="101.4" strokeWidth="3"
                                     fill="#fff"/>
                            <ellipse rx="9.527" ry="9.646" cy="71.01" cx="101.4"/>
                            <path d="M64.32 144.4l-17.37-12.97 17.37-12.73 34.82-.08 17.21 12.65L99.06 144z"
                                  stroke="#000"
                                  strokeWidth="3" fill="#e9ddaf"/>
                            <ellipse rx="10.24" ry="2.497" stroke="#000" cy="131.5" cx="81.86" strokeWidth="3"
                                     fill="red"/>
                        </g>
                    </g>
                </svg>
                <h1>Loading...</h1>
            </div>
        </div>
    )
};

export default LoadingOverlay;