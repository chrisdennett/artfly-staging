import React from 'react';

const SaveProgressButton = function (props) {
    return (
        <button {...props}>
            {props.label}
        </button>
    )
};

export default SaveProgressButton;