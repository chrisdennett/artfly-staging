import React from 'react';

const LinkExternalButt = function ({children, linkTo, style, isPrimary, target='_self' }) {

    let bgColour = '#fff';
    let fontColour = '#000';
    if (isPrimary) {
        bgColour = '#994fac';
        fontColour = '#fff'
    }

    const defaultStyle = {
        padding: 10,
        fontSize: '1.1rem',
        color: fontColour,
        background: bgColour,
        border: '1px solid rgba(0,0,0,0.2)',
        cursor: 'pointer',
    };

    const combinedStyle = { ...defaultStyle, ...style };

    return (
        <a href={linkTo}
           style={combinedStyle}
           target={target}
           rel="noopener noreferrer">
            {children}
        </a>
    )
};

export default LinkExternalButt;