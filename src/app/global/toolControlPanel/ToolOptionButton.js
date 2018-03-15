import React from 'react';

const ToolOptionButton = function ({ icon, onClick, label, isSelected, disabled, style = {} }) {
    const selectedClass = isSelected ? 'toolOptionButton--selected' : '';
    const disabledClass = disabled ? 'toolOptionButton--disabled' : '';

    let onClickFunction;
    if (disabled) {
        onClickFunction = null;
    }
    else {
        onClickFunction = onClick;
    }

    return (
        <div className={`toolOptionButton ${selectedClass} ${disabledClass}`}
             style={style}
             onClick={onClickFunction}>

            {label}

        </div>
    )
};

export default ToolOptionButton;