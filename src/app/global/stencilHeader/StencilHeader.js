import React from 'react';
// styles
import './stencilHeader_styles.css';

const StencilHeader = function ({wording, icon}) {
    return (
        <h2 className={'stencilHeader'}>

            {icon &&
            <div className={'stencilHeader--iconHolder'}>{icon}</div>
            }

            {wording}
        </h2>
    )
};

export default StencilHeader;