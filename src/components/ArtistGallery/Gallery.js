import React, { Component } from 'react';
import SvgGalleryTitle from './SvgGalleryTitle';
import SvgWindow from './SvgWindow';
import SvgGalleryBottom from './SvgGalleryBottom';
import SvgLeftWall from "./SvgLeftWall";
import SvgRightWall from "./SvgRightWall";
import SvgBackground from "./SvgBackground";

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = { contentHeight: 0, contentWidth: 0 };
    }

    componentDidMount() {
        this.getContentHeight();

        window.onresize = this.getContentHeight.bind(this);
    }

    getContentHeight() {
        this.setState({
            contentHeight: this.refs.content.offsetHeight,
            contentWidth: window.innerWidth
        })
    }

    render() {

        /*TODO: Use Math.floor to fingure out the number per row
        * based on inner html width
        * */
        // console.log("this.state.contentHeight: ", this.state.contentHeight);

        const windowWidth = 139;
        const windowX = 330;

        return (
            <div className={'gallery-scene'}>

                <SvgBackground galleryHeight={this.state.contentHeight} pageWidth={this.state.contentWidth}/>

                <div className="gallery" ref='content'>
                    <div className="gallery-top">
                        <SvgGalleryTitle/>
                    </div>

                    <div className="gallery-middle">
                        <div className="gallery-middle2">

                            <SvgLeftWall/>

                            <div className="gallery-middle-windows">
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                                <SvgWindow viewBox={`${windowX} 0 ${windowWidth} 109.72265`} className="galleryTitle"/>
                            </div>

                            <SvgRightWall/>

                        </div>
                    </div>

                    <div className="gallery-bottom">
                        <SvgGalleryBottom/>
                    </div>
                </div>


            </div>
        );
    }
}

export default Gallery;