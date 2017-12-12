// externals
import React from 'react';
// styles
import './controlPanelButtStyles.css';
// components
import history from '../history';

const ControlPanelButt = function ({ children, linkTo }) {
    return (
        <div className='controlPanelButt' onClick={() => {history.push(linkTo)}}>
            {children}
        </div>
    )
};

export default ControlPanelButt;