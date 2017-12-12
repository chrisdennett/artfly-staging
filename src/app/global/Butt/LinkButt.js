import React from 'react';
// import { Link } from 'react-router-dom'
import history from '../history';

import Butt from "./Butt";

const LinkButt = function ({ children, linkTo, fullWidth, ...rest }) {
    return (
        <Butt onClick={() => {history.push(linkTo)}} {...rest} fullWidth={fullWidth}>
            {children}
        </Butt>
    )
};

export default LinkButt;