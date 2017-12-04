import React from 'react';
import history from './history';
import OverlayButton from "./OverlayButton";

const OverlayLinkButton = function (props) {

    return (

        <OverlayButton onClick={() => {history.push(props.linkTo)}} {...props}/>

    )
};

export default OverlayLinkButton;