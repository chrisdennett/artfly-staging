import React from 'react';
import { Link } from 'react-router-dom'

import Butt from "./Butt";

const LinkButt = function ({linkTo, fullWidth, ...rest}) {
    let linkStyle = {
        textDecoration: 'none',
        color: '#fff'
    };

    if(fullWidth){
        linkStyle.flexGrow = 1;
        linkStyle.display = "flex";
    }

    return (
        <Link to={linkTo} style={linkStyle}>
            <Butt {...rest} fullWidth={fullWidth}/>
        </Link>
    )
};

export default LinkButt;