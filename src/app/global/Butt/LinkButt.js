import React from 'react';
import { Ripple } from 'rmwc/Ripple';
// comp
import history from '../history';

const LinkButt = function ({ children, linkTo, isPrimary = false, style = {} }) {

    //isPositive = false, isNegative = false, // consider for go / no go butts
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
        cursor: 'pointer'
    };

    const combinedStyle = { ...defaultStyle, ...style };

    return (
        <Ripple>
            <button style={combinedStyle} onClick={() => {history.push(linkTo)}}>
                {children}
            </button>
        </Ripple>
    )
};

export default LinkButt;