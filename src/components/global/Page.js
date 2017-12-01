import React from 'react';
import PageTitle from "./PageTitle";

const Page = function ({ icon, title, children, hue, saturation, brightness }) {

    // Set defaults if no values provided
    const h = hue ? hue : 250;
    const s = saturation ? saturation : 98;
    const l = brightness ? brightness : 80;

    // Set colour values
    const bgCol = `hsl(${h},${s}%,${l}%)`;
    // const lighterBg = `hsl(${h},${s}%,${l-2}%)`;

    const pageStyle = {
        backgroundColor: bgCol,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    };

    const titleStyle = {
        margin: '0 0 4rem 0',
        backgroundColor: bgCol,
        borderBottom: '5px solid rgba(0,0,0,0.5)'
    };

    const contentStyle = {
        width: '100%',
        maxWidth: 960,
        margin: '6vh auto'
    };

    const InnerBoxStyle = {
        border: '5px solid rgba(0,0,0,0.5)',
        minHeight: '100vh'
    };

    return (
        <div style={pageStyle}>
            <div style={InnerBoxStyle}>
                <div style={titleStyle}>
                    {/*<h1 style={headingStyle}>{icon} {title}</h1>*/}
                    <PageTitle title={title}/>
                </div>
                <div style={contentStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Page;