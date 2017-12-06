// externals
import React from 'react';
// styles
import './page.css';
// components
import PageTitle from "./PageTitle";
// import GridLines from "./GridLines";

const Page = function ({ icon, title, children, hue, saturation, brightness }) {

    // Set defaults if no values provided
    /*const h = hue ? hue : 250;
    const s = saturation ? saturation : 98;
    const l = brightness ? brightness : 80;*/

    // Set colour values
    // const bgCol = `hsl(${h},${s}%,${l}%)`;
    // const borderCol = `hsl(250,28%,30%)`;
    // const textCol = borderCol;
    // const gridLinesCol = `hsla(250,28%,30%, 0.1)`;

    /*const pageStyle = {
        // backgroundColor: bgCol,
        color: textCol
    };*/

    const titleStyle = {
        // backgroundColor: bgCol,
        // borderBottom: `5px solid ${borderCol}`,
        // position: 'relative',
    };

    const InnerBoxStyle = {
        // border: `5px solid ${gridLinesCol}`,
        minHeight: '100vh'
    };

    return (
        <div className='page'>
            <div style={InnerBoxStyle}>
                <div className='page--content'>
                    {title &&
                    <PageTitle title={title}/>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Page;