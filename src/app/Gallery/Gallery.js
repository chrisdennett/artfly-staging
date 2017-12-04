// externals
import React from 'react';
// styles
import './gallery.css';
// components
import ScrollbarRemover from "../global/ScrollbarRemover";
import SvgBackground from "./assets/SvgBackground";
import SvgGallery from "./assets/SvgGallery";

const Gallery = function (props) {
    const { artist, artworks, onThumbClick, pageWidth, pageHeight, galleryParams, galleryIsZoomedOut } = props;

    const galleryHeight = galleryParams.galleryHeight;
    const maxGalleryWidth = galleryParams.galleryWidth;
    let viewBoxWidth = pageWidth < maxGalleryWidth ? maxGalleryWidth : pageWidth;
    let currentHeight = galleryHeight ? galleryHeight : 0;
    let svgHeight = currentHeight;

    if (galleryIsZoomedOut) {
        currentHeight = pageHeight;
        viewBoxWidth = pageWidth;
        svgHeight = currentHeight;
    }
    else {
        const scale = pageWidth / viewBoxWidth;
        svgHeight = galleryHeight * scale;
    }

    const currentGalleryScale = currentHeight / galleryHeight;

    return (
        <ScrollbarRemover showScrollbars={!galleryIsZoomedOut}>
            <svg width={pageWidth}
                 height={svgHeight}
                 viewBox={`0 0 ${viewBoxWidth} ${currentHeight}`}>

                <SvgBackground height={currentHeight}
                               width={viewBoxWidth}
                               galleryScale={currentGalleryScale}/>

                <SvgGallery artist={artist}
                            galleryParams={galleryParams}
                            artworks={artworks}
                            pageWidth={pageWidth}
                            onThumbClick={onThumbClick}/>
            </svg>
        </ScrollbarRemover>
    )
};

export default Gallery;