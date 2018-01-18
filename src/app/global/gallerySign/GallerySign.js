import React from 'react';
// styles
import './gallerySign_styles.css';

const GallerySign = function ({children}) {
    return (
        <div className={'gallerySign'}>
            {children}
        </div>
    )
};

export default GallerySign;