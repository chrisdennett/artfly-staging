import React from 'react';

const ArtworkThumb = function ({artwork, onThumbClick}) {
    return (
        <div onClick={() => {onThumbClick(artwork.id)}}>
            <img src={artwork.url_thumb} alt="artwork"/>
        </div>
    )
};

export default ArtworkThumb;