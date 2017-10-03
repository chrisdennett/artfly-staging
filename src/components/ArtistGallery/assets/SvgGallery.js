import React, { Component } from "react";

import Roof from "./Roof";
import WindowsSection from "./WindowSection";
import NameSection from "./NameSection";
import SvgGalleryBottom from './SvgGalleryBottom';

class SvgGallery extends Component {

    render() {
        const { artist, artworkIds, artworks, onThumbClick, galleryParams } = this.props;

        const {
                  hue, saturation, lightness, nameSectionHue, roofHeight,
                  nameHeight, windowsHeight, galleryWidth, galleryHeight,
                  windowParams
              } = galleryParams;

        return (
            <svg viewBox={`0,0,${galleryWidth}, ${galleryHeight}`}>
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
                                    windowParams={windowParams}
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