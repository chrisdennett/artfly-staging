import React from 'react';

const Page = function (props) {

    const pageStyle = {
        backgroundColor: '#2dc1b0',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    };

    const titleStyle = {
        backgroundColor: '#2cb1a0',
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
                <h1 style={headingStyle}>{props.icon} {props.title}</h1>
            </div>
            <div style={contentStyle}>
                {props.children}
            </div>
        </div>
    )
};

export default Page;