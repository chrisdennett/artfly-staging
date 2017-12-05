import React from 'react';

const ZoomButton = function ({ onClick, isZoomedOut }) {

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
            <svg style={svgStyle} onClick={onClick} width={32} height={32} viewBox="0 0 28 28">
                <g style={iconStyle}>
                    <path
                        d="M29.15 27.54l-1.605 1.605a1.356 1.356 0 0 1-1.923 0l-5.661-5.656a1.36 1.36 0 0 1-.397-.964V21.6a11.738 11.738 0 0 1-7.261 2.496c-6.52 0-11.8-5.28-11.8-11.8 0-6.519 5.28-11.8 11.8-11.8 6.518 0 11.8 5.281 11.8 11.8 0 2.74-.93 5.258-2.496 7.261h.925c.363 0 .709.142.964.397l5.655 5.656a1.373 1.373 0 0 1 0 1.93zM20.01 12.3c0-4.266-3.449-7.715-7.715-7.715S4.58 8.034 4.58 12.3s3.449 7.715 7.715 7.715 7.715-3.449 7.715-7.715z"/>

                    <path id="minus" style={minusStyle}
                          d="M17.74 11.43v1.702c0 .35-.308.638-.684.638H7.482c-.376 0-.684-.287-.684-.638V11.43c0-.35.308-.638.684-.638h9.574c.376 0 .684.287.684.638z"/>

                    <path id="plus" style={plusStyle}
                          d="M17.77 11.37v1.815c0 .374-.306.68-.68.68h-3.178v3.178c0 .374-.306.68-.68.68h-1.815a.683.683 0 0 1-.681-.68v-3.177H7.559a.683.683 0 0 1-.68-.681V11.37c0-.374.306-.68.68-.68h3.177V7.511c0-.374.306-.68.68-.68h1.816c.374 0 .68.306.68.68v3.177h3.177c.375 0 .681.307.681.681z"/>
                </g>
            </svg>
            <div style={textStyle}>
                {text}
            </div>
        </div>
    )
};

export default ZoomButton;