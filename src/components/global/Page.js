import React from 'react';

const Page = function ({icon, title, children, backgroundHue}) {

    const hue = backgroundHue;
    const saturation = 72;
    const lightness = 42;
    const bgCol = `hsl(${hue},${saturation}%,${lightness}%)`;
    const lighterBg = `hsl(${hue},${saturation}%,${lightness-2}%)`;

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
        maxWidth: 960,
        margin: '40px auto'
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