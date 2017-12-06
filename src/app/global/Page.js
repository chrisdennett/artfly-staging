// externals
import React from 'react';
// styles
import './page.css';
// components
import PageTitle from "./PageTitle";
// import GridLines from "./GridLines";

const Page = function ({ icon, title, children, hue, saturation, brightness }) {

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