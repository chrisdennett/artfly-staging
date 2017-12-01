import React from 'react';
import PageTitle from "./PageTitle";
import GridLines from "./GridLines";

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
        minHeight: '100vh',
        color: 'hsl(250,28%,30%)'
    };

    const titleStyle = {
        backgroundColor: bgCol,
        borderBottom: '5px solid hsl(250,28%,30%)',
        position: 'relative',
    };

    const contentStyle = {
        maxWidth: 960,
        margin: '50px auto',
        padding: '0 40px'
    };

    const InnerBoxStyle = {
        border: '5px solid hsl(250,28%,30%)',
        minHeight: '100vh'
    };

    const gridStroke = 'hsla(250,28%,30%, 0.1)';

    return (
        <div style={pageStyle}>
            <div style={InnerBoxStyle}>
                <div style={titleStyle}>
                    <GridLines stroke={gridStroke}/>

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