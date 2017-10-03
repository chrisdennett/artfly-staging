import React from 'react';
import './artistGallery.css';

import SvgBackground from "./assets/SvgBackground";
import SvgGallery from "./assets/SvgGallery";

const ArtistGallery = function (props) {
    const { artist, artworkIds, artworks, onThumbClick, pageWidth, pageHeight, galleryParams, galleryIsZoomedOut } = props;

    if (pageHeight < 1 || pageWidth < 1 || !galleryParams) {
        return <div>Loading gallery...</div>
    }

    const galleryHeight = galleryParams.galleryHeight;
    const maxGalleryWidth = galleryParams.galleryWidth;
    let viewBoxWidth = pageWidth < maxGalleryWidth ? maxGalleryWidth : pageWidth;
    let currentHeight = galleryHeight ? galleryHeight : 0;

    if (galleryIsZoomedOut) {
        currentHeight = pageHeight;
        viewBoxWidth = pageWidth;
    }

    const currentGalleryScale = currentHeight / galleryHeight;

    return (
        <svg viewBox={`0 0 ${viewBoxWidth} ${currentHeight}`}>

            <SvgBackground height={currentHeight} width={viewBoxWidth} galleryScale={currentGalleryScale}/>

            <SvgGallery artist={artist}
                        galleryParams={galleryParams}
                        artworkIds={artworkIds}
                        artworks={artworks}
                        pageWidth={pageWidth}
                        onThumbClick={onThumbClick}/>
        </svg>
    )
};

export default ArtistGallery;