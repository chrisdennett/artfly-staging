import React, { Component } from "react";
import { connect } from 'react-redux';

import Roof from "./Roof";
import WindowsSection from "./WindowSection";
import NameSection from "./NameSection";
import SvgGalleryBottom from './SvgGalleryBottom';
import { setGalleryHeight } from '../../../actions/UiActions';

class SvgGallery extends Component {

    componentDidMount() {
        const windowSectionsHeight = this.getWindowSectionHeight();

        const roofHeight = 364;
        const nameHeight = 422;
        const bottomHeight = 500;

        const totalHeight = roofHeight + nameHeight + windowSectionsHeight + bottomHeight;

        this.props.setGalleryHeight(totalHeight);
    }

    getWindowSectionHeight(){
        const windowHeight = 250;
        const verticalPadding = 60;

        const totalWindows = this.props.artworkIds.length;
        const windowsPerFloor = 3;
        const floors = Math.ceil(totalWindows / windowsPerFloor);
        return (floors * windowHeight) + (verticalPadding * 2);
    }

    render() {
        const { artist, artworkIds, artworks, onThumbClick } = this.props;
        const hue = 185;
        const saturation = 34;
        const lightness = 61;

        const nameSectionHue = 290;
        const galleryWidth = 800;

        const roofHeight = 364;
        const nameHeight = 422;
        const windowsHeight = this.getWindowSectionHeight();
        const bottomHeight = 500;
        const totalHeight = roofHeight + nameHeight + windowsHeight + bottomHeight;
        // this.props.setGalleryHeight(totalHeight);

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

export default connect(null, { setGalleryHeight })(SvgGallery);