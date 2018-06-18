import React from 'react';

const GalleryTitles = ({title, subtitle}) => {
    return (
        <div className={'gallery--header'}>
            <h1 className={'gallery--title'} >
                {title}
            </h1>

            <h2 className={'gallery--subtitle'}>
                {subtitle}
            </h2>
        </div>
    )
};

export default GalleryTitles;