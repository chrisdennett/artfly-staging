// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './controlPanelButtStyles.css';
// components
import history from '../history';

const ControlPanelButt = function ({ icon, linkTo, label }) {
    return (
        <div className='controlPanelButt' onClick={() => {history.push(linkTo)}}>

            <FontAwesomeIcon className={'controlPanelButt--icon'} icon={icon} fixedWidth/>

            <div className={'controlPanelButt--label'}>
                {label}
            </div>
        </div>
    )
};

export default ControlPanelButt;