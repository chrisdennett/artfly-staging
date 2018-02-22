// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './controlPanelButtStyles.css';
// components
import history from '../history';

const ControlPanelButt = function ({ icon, linkTo, onClick, label, isSelected, disabled, style={} }) {

    const selectedClass = isSelected ? 'controlPanelButt--selected' : '';
    const disabledClass = disabled ? 'controlPanelButt--disabled' : '';

    let onClickFunction;
    if(disabled){
        onClickFunction = null;
    }
    else if(linkTo){
        onClickFunction = () => history.push(linkTo);
    }
    else {
        onClickFunction = onClick;
    }

    return (
        <div className={`controlPanelButt ${selectedClass} ${disabledClass}`}
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