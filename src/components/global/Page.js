import React from 'react';

const Page = function ({icon, title, children, hue, saturation, brightness}) {

    // Set defaults if no values provided
    const h = hue ? hue : 233;
    const s = saturation ? saturation : 51;
    const l = brightness ? brightness : 42;

    // Set colour values
    const bgCol = `hsl(${h},${s}%,${l}%)`;
    const lighterBg = `hsl(${h},${s}%,${l-2}%)`;

    const pageStyle = {
        backgroundColor: lighterBg,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    };

    const titleStyle = {
        backgroundColor: bgCol,
        borderBottom: '1px solid rgba(0,0,0,0.2)'
    };

    const headingStyle = {
        padding: '60px 30px 20px 30px',
        marginBottom: '60px',
        textAlign: 'center'
    };

    const contentStyle = {
        width: '100%',
        maxWidth: 960,
        margin: '6vh auto'
    };

    return (
        <div style={pageStyle}>
            <div style={titleStyle}>
                <h1 style={headingStyle}>{icon} {title}</h1>
            </div>
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    )
};

export default Page;