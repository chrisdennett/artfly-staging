import React from 'react';
import Icon from "./Icon";

const IconButt = function ({ icon, label, isSelected }) {

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
        fontSize: 20,
        display: 'inline-block'
    };

    return (
        <div style={buttonStyle}>
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