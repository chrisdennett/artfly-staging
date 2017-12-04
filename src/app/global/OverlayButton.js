import React from 'react';

const OverlayButton = function ({children, label, onClick, linkTo }) {

    const textStyle = {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)'
    };

    const iconStyle = { fill: 'rgba(255,255,255,0.8)' };
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
            <svg style={svgStyle} onClick={onClick} width={32} height={32} viewBox="0 0 28 28">
                <g style={iconStyle}>
                    {children}
                </g>
            </svg>
            <div style={textStyle}>
                {label}
            </div>
        </div>
    )
};

export default OverlayButton;