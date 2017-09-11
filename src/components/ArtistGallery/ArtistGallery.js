import React, { Component } from 'react';
import _ from 'lodash';

import './artistGallery.css';

import SvgGalleryTitle from './SvgGalleryTitle';
import SvgWindow from './SvgWindow';
import SvgGalleryBottom from './SvgGalleryBottom';
import SvgLeftWall from "./SvgLeftWall";
import SvgRightWall from "./SvgRightWall";
import SvgBackground from "./SvgBackground";

// import ArtworkThumb from "./ArtworkThumb";

class ArtistGallery extends Component {
    render() {

        /*
        { gallery, artist, totalArtworks, artworks, onThumbClick, artworkIds }
        const oldGalleryContent = (
            <div>
                <h1>{gallery.name}</h1>
                <h2>Artist</h2>
                <p>Name: {artist.name}</p>
                <p>Total Artworks: {totalArtworks}</p>
                {
                    _.map(artworkIds, (id) => {
                        if (artworks[id]) {
                            return (
                                <div key={id}>
                                    <ArtworkThumb onThumbClick={onThumbClick.bind(this)} artwork={artworks[id]}/>
                                </div>)
                        }
                    })
                }


            </div>
        );*/

        const { artworkIds, artworks, onThumbClick } = this.props;
        const windowWidth = 139;
        const windowX = 330;
        let galleryHeight = 500;

        if (this.refs.content) {
            galleryHeight = this.refs.content.offsetHeight;
        }

        // console.log("this.refs: ", this.refs);

        return (
            <div className={'gallery-scene'}>

                <SvgBackground galleryHeight={galleryHeight} pageWidth={this.props.pageWidth}/>

                <div className="gallery" ref='content'>
                    <div className="gallery-top">
                        <SvgGalleryTitle/>
                    </div>

                    <div className="gallery-middle">
                        <div className="gallery-middle2">

                            <SvgLeftWall/>

                            <div className="gallery-middle-windows">

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


                                {/*<SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>*/}
                            </div>

                            <SvgRightWall/>

                        </div>
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