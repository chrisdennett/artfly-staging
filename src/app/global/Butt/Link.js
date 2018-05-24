import React from 'react';
import history from '../history';

const Link = function ({linkTo, children, ...rest}) {

    const style = {
        display: 'inline-block',
        cursor: 'pointer',
    };

    return (
        <div style={style} onClick={() => {history.push(linkTo)}} {...rest}>
            {children}
        </div>
    )
};

export default Link;