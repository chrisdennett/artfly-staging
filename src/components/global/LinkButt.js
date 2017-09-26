import React from 'react';
import { Link } from 'react-router-dom'

import Butt from "./Butt";

const LinkButt = function ({linkTo, ...rest}) {
    const linkStyle = {
        textDecoration: 'none',
        color: '#fff',
        flexGrow: 1,
        display: 'flex',
    };

    return (
        <Link to={linkTo} style={linkStyle}>
            <Butt {...rest}/>
        </Link>
    )
};

export default LinkButt;