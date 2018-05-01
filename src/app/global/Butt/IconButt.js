import React from 'react';
import { Ripple } from 'rmwc/Ripple';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
// styles
import './iconButtStyles.css';
// components

const IconButt = function ({ onClick, label }) {

    return (
        <Ripple>
            <div className={'iconButt'} onClick={onClick}>
                <FontAwesomeIcon icon={faObjectGroup}/>

                {label &&
                <div>{label}</div>
                }
            </div>
        </Ripple>
    )
};

export default IconButt;