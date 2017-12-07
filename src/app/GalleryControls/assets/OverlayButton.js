import React from 'react';

const ZoomButton = function ({ onClick, isZoomedOut, textOnTop=false }) {

    const textStyle = {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)'
    };

    const iconStyle = { fill: 'rgba(255,255,255,0.8)' };

    const text = isZoomedOut ? 'zoom in' : 'zoom out';
    const plusStyle = isZoomedOut ? {} : { display: 'none' };
    const minusStyle = isZoomedOut ? { display: 'none' } : {};
    const buttonStyle = {
        cursor: 'pointer',
        padding: 0,
        margin: '10px 20px 10px 20px',
        border: 'none',
        outline: 'none',
        width: 65,
        display: 'inline-block',
        textAlign: 'center'
    };
    const svgStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    };



    return (
        <div style={buttonStyle}>
            <div style={textStyle}>
                {text}
            </div>
        </div>
    )
};

export default ZoomButton;