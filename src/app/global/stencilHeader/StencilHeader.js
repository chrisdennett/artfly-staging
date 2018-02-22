import React from 'react';
// styles
import './stencilHeader_styles.css';

const StencilHeader = function ({wording, icon, style={}}) {
    return (
        <h2 className={'stencilHeader'} style={style}>

            {icon &&
            <div className={'stencilHeader--iconHolder'}>{icon}</div>
            }

            {wording}
        </h2>
    )
};

export default StencilHeader;