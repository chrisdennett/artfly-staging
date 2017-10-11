import React from 'react';
import './artistGallery.css';

import ScrollbarRemover from "../global/ScrollbarRemover";
import SvgBackground from "./assets/SvgBackground";
import SvgGallery from "./assets/SvgGallery";

const ArtistGallery = function (props) {
    const { artist, artistArtworkIds, artworks, onThumbClick, pageWidth, pageHeight, galleryParams, galleryIsZoomedOut } = props;

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
        <ScrollbarRemover showScrollbars={!galleryIsZoomedOut}>
            <svg viewBox={`0 0 ${viewBoxWidth} ${currentHeight}`}>

                <SvgBackground height={currentHeight} width={viewBoxWidth} galleryScale={currentGalleryScale}/>

                <SvgGallery artist={artist}
                            galleryParams={galleryParams}
                            artworkIds={artistArtworkIds}
                            artworks={artworks}
                            pageWidth={pageWidth}
                            onThumbClick={onThumbClick}/>
            </svg>
        </ScrollbarRemover>
    )
};

export default ArtistGallery;