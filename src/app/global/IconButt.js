import React from 'react';
import Icon from "./Icon";

const IconButt = function ({ icon, label, isSelected, bgColour, fill, stroke, ...rest }) {

    let buttonStyle = {
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        width: 95,
        textAlign: 'center',
        padding: '15px 0 10px 0',
        display: 'inline-block'
    };

    if (isSelected) {
        buttonStyle.borderBottom = '4px solid rgba(0,0,0,0.2)'
    }

    const iconStyle = {
        verticalAlign: 'middle',
    };

    const labelStyle = {
        fontSize: 14,
        display: 'inline-block',
        fontWeight: 700
    };

    if(bgColour){
        buttonStyle.backgroundColor = bgColour;
    }

    return (
        <div style={buttonStyle} {...rest}>
            <div style={iconStyle}>
                <Icon type={icon} fill={fill} stroke={stroke}/>
            </div>
            <div style={labelStyle}>
                {label}
            </div>
        </div>
    )
};

export default IconButt;