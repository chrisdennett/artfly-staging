import React from 'react';
// styles
import './checkBox_styles.css';

const CheckBox = function ({label, value, onChange, id}) {
    return (
        <label className={'checkbox-container'}>
            {label}
            <input
                name={id}
                type="checkbox"
                checked={value}
                onChange={onChange}/>
            <span className={'checkBox-checkMark'}/>
        </label>
    )
};

export default CheckBox;