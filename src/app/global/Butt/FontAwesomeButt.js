// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './fontAwesomeButt_styles.css';

const FontAwesomeButt = function ({ icon, linkTo, onClick, label, isSelected, disabled, style={} }) {

    const iconStyle = label ? {marginRight:5} : {};

    return (
        <div className={`fontAwesomeButt`}
             style={style}
             onClick={onClick}>

            <FontAwesomeIcon style={iconStyle} className={'fontAwesomeButt--icon'} icon={icon} fixedWidth/>

            {label}

        </div>
    )
};

export default FontAwesomeButt;