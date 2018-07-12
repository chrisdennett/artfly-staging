import React from 'react';

const CircularProgressBar = ({ sqSize = 100, strokeWidth = 15, max = 200, progress = 50 }) => {

    const percentage = Math.round(100 * (progress / max));

    // original source: https://codepen.io/bbrady/pen/ozrjKE?editors=0100
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose circle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;

    const progressColour = '#4c2e67';

    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}>
            <circle
                className="circle-background"
                fill='none'
                stroke="#ddd"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}/>
            <circle
                className="circle-progress"
                fill={'none'}
                stroke={progressColour}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset
                }}/>
            <text
                className="circle-text"
                fill={progressColour}
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle">
                {`${percentage}%`}
            </text>
        </svg>
    )
};

export default CircularProgressBar;