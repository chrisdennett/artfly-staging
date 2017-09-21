import React, { Component } from 'react';
import './artistGallery.css';

import SvgGalleryBottom from './assets/SvgGalleryBottom';
import SvgBackground from "./assets/SvgBackground";
import BuildingSection from "./assets/buildingSection/BuildingSection";
import Roof from "./assets/source_files/Roof";

class ArtistGallery extends Component {
    render() {
        const { artist, artworkIds, artworks, onThumbClick, pageWidth, pageHeight } = this.props;
        let galleryHeight = 0;
        let windowsHeight = 0;
        const minGalleryPadding = 25;
        let galleryWidth = 800;
        if ((pageWidth - (minGalleryPadding * 2)) < galleryWidth) {
            galleryWidth = pageWidth - (minGalleryPadding * 2);
        }
        const galleryX = ((pageWidth - galleryWidth) / 2);


        if (this.refs.gallery) {
            galleryHeight = this.refs.gallery.offsetHeight;
        }

        if (this.refs.middleWindows) {
            windowsHeight = 20;
        }

        const hue = 185;
        const saturation = 34;
        const lightness = 61;
        // const alpha = 255;

        return (
            <div>

                <SvgBackground galleryHeight={galleryHeight} pageWidth={pageWidth} pageHeight={pageHeight}/>

                <div className="gallery" ref='gallery' style={{ paddingLeft: galleryX }}>


                    <div className="gallery-top">

                        <Roof/>
                        {/*<SvgGalleryTitle firstName={artist.firstName} lastName={artist.lastName}/>*/}
                    </div>

                    {/*<div className="gallery-middle">

                        <SvgLeftWall height={windowsHeight}/>

                        <div className="gallery-middle-windows" ref='middleWindows'>
                            {
                                _.map(artworkIds, (id) => {
                                    if (artworks[id]) {
                                        return (
                                            <SvgWindow key={id}
                                                       viewBox={`${windowX} 0 ${windowWidth} 109.72265`}
                                                       className="galleryTitle"
                                                       onThumbClick={onThumbClick.bind(this)}
                                                       artwork={artworks[id]}/>
                                        )
                                    }
                                })
                            }
                        </div>

                        <SvgRightWall height={windowsHeight}/>


                    </div>*/}

                    <BuildingSection galleryWidth={galleryWidth}
                                     artworkIds={artworkIds}
                                     artworks={artworks}
                                     hue={hue}
                                     saturation={saturation}
                                     lightness={lightness}
                                     onThumbClick={onThumbClick.bind(this)}/>

                    <div className="gallery-bottom">
                        <SvgGalleryBottom />
                    </div>
                </div>


            </div>
        )
    }
};

export default ArtistGallery;