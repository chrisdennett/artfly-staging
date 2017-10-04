import React from 'react';
import { Link } from 'react-router-dom'
import OverlayButton from "./OverlayButton";

const OverlayLinkButton = function (props) {

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

    const linkStyle = {textDecoration: 'none'};

    return (
        <Link to={props.linkTo} style={linkStyle}>
            <OverlayButton {...props}/>
        </Link>
    )
};

export default OverlayLinkButton;