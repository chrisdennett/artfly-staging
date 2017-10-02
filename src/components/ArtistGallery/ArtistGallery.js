import React, { Component } from 'react';
import './artistGallery.css';

import SvgBackground from "./assets/SvgBackground";
import SvgGallery from "./assets/SvgGallery";

class ArtistGallery extends Component {

    componentDidMount() {
        // document.body.classList.toggle('no-scroll-bars', true);
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }


    render() {
        const { artist, artworkIds, artworks, onThumbClick, pageWidth, pageHeight, galleryHeight } = this.props;

        if (pageHeight < 1 || pageWidth < 1) {
            return <div>Loading gallery...</div>
        }

        const maxGalleryWidth = 800;
        let viewBoxWidth = pageWidth < maxGalleryWidth ? maxGalleryWidth : pageWidth;
        let currentHeight = galleryHeight ? galleryHeight : 0;
        const showFullGallery = false;

        if (showFullGallery) {
            currentHeight = pageHeight;
            viewBoxWidth = pageWidth;
            document.body.classList.toggle('no-scroll-bars', true);
        }

        const currentGalleryScale = currentHeight / galleryHeight;

        return (

            <svg viewBox={`0 0 ${viewBoxWidth} ${currentHeight}`}>

                <SvgBackground height={currentHeight} width={viewBoxWidth} galleryScale={currentGalleryScale}/>

                <SvgGallery artist={artist}
                            artworkIds={artworkIds}
                            artworks={artworks}
                            pageWidth={pageWidth}
                            onThumbClick={onThumbClick}/>
            </svg>
        )
    }
};

export default ArtistGallery;