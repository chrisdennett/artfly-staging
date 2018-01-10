// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './controlPanelButtStyles.css';
// components
import history from '../history';

const ControlPanelButt = function ({ icon, linkTo, onClick, label, isSelected, style }) {

    const selectedClass = isSelected ? 'controlPanelButt--selected' : '';

    const onClickFunction = linkTo ? () => history.push(linkTo) : onClick;

    return (
        <div className={`controlPanelButt ${selectedClass}`}
             style={style}
             onClick={onClickFunction}>

            <FontAwesomeIcon className={'controlPanelButt--icon'} icon={icon} fixedWidth/>

            <div className={'controlPanelButt--label'}>
                {label}
            </div>
        </div>
    )
};

export default ControlPanelButt;