import React from 'react';
import { Link } from 'react-router-dom'
import OverlayButton from "./OverlayButton";

const OverlayLinkButton = function (props) {

    const linkStyle = {textDecoration: 'none'};

    return (
        <Link to={props.linkTo} style={linkStyle}>
            <OverlayButton {...props}/>
        </Link>
    )
};

export default OverlayLinkButton;