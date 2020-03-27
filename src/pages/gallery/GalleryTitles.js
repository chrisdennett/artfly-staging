import React from 'react';
import GallerySwitcher from './gallerySwitcher/GallerySwitcher';

const GalleryTitles = ({title, subtitle}) => {
    return (
        <div className={'gallery--header'}>
            <h1 className={'gallery--title'} >
                {title}
            </h1>

            <h2 className={'gallery--subtitle'}>
                {subtitle}
            </h2>

            <GallerySwitcher />

        </div>
    )
};

export default GalleryTitles;