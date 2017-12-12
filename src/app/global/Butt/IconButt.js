import React from 'react';
// styles
import './iconButtStyles.css';
// components
import Icon from "../icon/Icon";

const IconButt = function ({ icon, fill, stroke, onClick, leftCorner, rightCorner}) {

    let classes = 'iconButt';

    if(leftCorner){
        classes += ' iconButt--leftCorner';
    }
    else if(rightCorner){
        classes += ' iconButt--rightCorner';
    }

    return (
        <div className={classes} onClick={onClick}>
            <div className='iconButt--icon'>
                <Icon type={icon} fill={fill} stroke={stroke}/>
            </div>
        </div>
    )
};

export default IconButt;