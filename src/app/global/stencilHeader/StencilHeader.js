import React from 'react';
// styles
import './stencilHeader_styles.css';

const StencilHeader = function ({wording}) {
    return (
        <h2 className={'stencilHeader'}>
            {wording}
        </h2>
    )
};

export default StencilHeader;