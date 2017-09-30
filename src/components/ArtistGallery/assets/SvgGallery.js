import React, { Component } from "react";

import Roof from "./Roof";
import WindowsSection from "./WindowSection";
import NameSection from "./NameSection";
import SvgGalleryBottom from './SvgGalleryBottom';

class SvgGallery extends Component {


    render() {

        const { artist, artworkIds, artworks, onThumbClick, pageWidth } = this.props;
        const hue = 185;
        const saturation = 34;
        const lightness = 61;

        const nameSectionHue = 290;
        const maxGalleryWidth = 800;
        const galleryWidth = 800;//pageWidth < maxGalleryWidth ? pageWidth : maxGalleryWidth;

        const roofHeight = 364;
        const nameHeight = 422;
        const windowsHeight = 1870;
        const bottomHeight = 500;
        const totalHeight = roofHeight+nameHeight+windowsHeight+bottomHeight;
        console.log("totalHeight: ", totalHeight);


        return (
            <svg viewBox={`0,0,${galleryWidth}, ${totalHeight}`}>
                <g transform={`translate(0,0)`}>
                    <Roof/>
                </g>

                <g transform={`translate(0,${roofHeight})`}>
                    <NameSection galleryWidth={galleryWidth}
                                 firstName={artist.firstName}
                                 lastName={artist.lastName}
                                 hue={nameSectionHue}
                                 saturation={saturation}
                                 lightness={lightness}/>
                </g>

                <g transform={`translate(0,${roofHeight + nameHeight})`}>
                    <WindowsSection galleryWidth={galleryWidth}
                                    ref={'section'}
                                    artworkIds={artworkIds}
                                    artworks={artworks}
                                    hue={hue}
                                    saturation={saturation}
                                    lightness={lightness}
                                    onThumbClick={onThumbClick.bind(this)}/>
                </g>

                <g transform={`translate(0,${roofHeight + nameHeight + windowsHeight})`}>
                    <SvgGalleryBottom/>
                </g>
            </svg>
        );
    }
}

export default SvgGallery;