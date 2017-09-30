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
        const { artist, artworkIds, artworks, onThumbClick, pageWidth, pageHeight } = this.props;
        let galleryHeight = 0;
        const minGalleryPadding = 0;
        let galleryWidth = 800;
        if ((pageWidth - (minGalleryPadding * 2)) < galleryWidth) {
            galleryWidth = pageWidth - (minGalleryPadding * 2);
        }
        const galleryX = ((pageWidth - galleryWidth) / 2);


        if (this.refs.section) {
            galleryHeight = this.refs.section.sectionHeight;
        }

        if (pageHeight < 1 || pageWidth < 1) {
            return <div>Loading gallery...</div>
        }

        const maxGalleryWidth = 800;
        let viewBoxWidth = pageWidth < maxGalleryWidth ? maxGalleryWidth : pageWidth;
        const fullGalleryHeight = 3156;
        let currentHeight = fullGalleryHeight;
        const showFullGallery = false;

        if (showFullGallery) {
            currentHeight = pageHeight;
            viewBoxWidth = pageWidth;
            document.body.classList.toggle('no-scroll-bars', true);
        }

        const currentGalleryScale = currentHeight / fullGalleryHeight;
        console.log("currentGalleryScale: ", currentGalleryScale);

        return (

            <svg viewBox={`0 0 ${viewBoxWidth} ${currentHeight}`}>

                {/*<g>
                    <rect y={currentHeight - 20} width={viewBoxWidth} height={20} fill={'#ff00ff'}/>
                    <rect x={0} width={viewBoxWidth} height={20} fill={'#0000ff'}/>
                    <rect x={0} width={20} height={currentHeight} fill={'#00ff00'}/>
                    <rect x={viewBoxWidth - 20} width={20} height={currentHeight} fill={'#ff0000'}/>
                </g>*/}

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