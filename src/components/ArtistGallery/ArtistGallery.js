import React, { Component } from 'react';
import _ from 'lodash';

import './artistGallery.css';

import SvgGalleryTitle from './assets/SvgGalleryTitle';
import SvgWindow from './assets/SvgWindow';
import SvgGalleryBottom from './assets/SvgGalleryBottom';
import SvgLeftWall from "./assets/SvgLeftWall";
import SvgRightWall from "./assets/SvgRightWall";
import SvgBackground from "./assets/SvgBackground";

// import ArtworkThumb from "./ArtworkThumb";

class ArtistGallery extends Component {
    render() {
        const { artist, artworkIds, artworks, onThumbClick } = this.props;
        const windowWidth = 139;
        const windowX = 330;
        let galleryHeight = 0;
        let windowsHeight = 0;


        if (this.refs.gallery) {
            galleryHeight = this.refs.gallery.offsetHeight;
        }

        if (this.refs.middleWindows) {
            windowsHeight = 20;
        }

        // console.log("this.refs: ", this.refs);

        return (
            <div className={'gallery-scene'}>

                <SvgBackground galleryHeight={galleryHeight} pageWidth={this.props.pageWidth}/>

                <div className="gallery" ref='gallery'>
                    <div className="gallery-top">
                        <SvgGalleryTitle firstName={artist.firstName} lastName={artist.lastName}/>
                    </div>

                    <div className="gallery-middle">

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


                    </div>

                    <div className="gallery-bottom">
                        <SvgGalleryBottom/>
                    </div>
                </div>


            </div>
        )
    }
};

export default ArtistGallery;