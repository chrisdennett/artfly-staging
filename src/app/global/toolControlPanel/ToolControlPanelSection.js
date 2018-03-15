import React from 'react';

const ToolControlPanelSection = function ({children, title}) {
    return (
        <div className={'toolControlPanelSection'}>
            <h2 className={'toolControlPanelSection--title'}>{title}</h2>
            {children}
        </div>
    )
};

export default ToolControlPanelSection;