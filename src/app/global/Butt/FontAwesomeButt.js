// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './fontAwesomeButt_styles.css';

const FontAwesomeButt = function ({ icon, linkTo, onClick, label, isSelected, disabled, style={} }) {

    return (
        <div className={`fontAwesomeButt`}
             style={style}
             onClick={onClick}>

            <FontAwesomeIcon className={'fontAwesomeButt--icon'} icon={icon} fixedWidth/>
        </div>
    )
};

export default FontAwesomeButt;