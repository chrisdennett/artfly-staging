import React from 'react';
// styles
import './pictureMakerToolControls_styles.css';

const PictureMakerToolControls = function ({butts}) {
        console.log("butts: ", butts);
    return (

        <div className="pictureMakerToolControls">
            {butts}
        </div>
    )
};

export default PictureMakerToolControls;