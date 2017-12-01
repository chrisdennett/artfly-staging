import React from 'react';
import Icon from "./Icon";

const IconButt = function ({ icon, label, isSelected, ...rest }) {

    let buttonStyle = {
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        display: 'inline-block',
        margin: '5px 15px',
        padding: '15px 0 10px 0'
    };

    if (isSelected) {
        buttonStyle.borderBottom = '4px solid rgba(0,0,0,0.2)'
    }

    const iconStyle = {
        paddingTop: 5,
        verticalAlign: 'middle',
        display: 'inline-block'
    };

    const labelStyle = {
        marginLeft: 10,
        fontSize: 14,
        display: 'inline-block',
        fontWeight: 700
    };

    return (
        <div style={buttonStyle} {...rest}>
            <div style={iconStyle}>
                <Icon type={icon}/>
            </div>
            <div style={labelStyle}>
                {label}
            </div>
        </div>
    )
};

export default IconButt;