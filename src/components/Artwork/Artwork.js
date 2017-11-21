// externals
import React, { Component } from "react";
// components
import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";

class Artwork extends Component {

    constructor(props) {
        super(props);
        this.state = { imageLoading: true };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.artwork.url !== this.props.artwork.url) {
            this.setState({ imageLoading: true });
        }
    }

    onImageLoad() {
        this.setState({ imageLoading: false });
    }

    render() {
        const { artwork, windowSize, allowScrollbars=false } = this.props;


        // work out max picture width
        const w = windowSize.windowWidth;
        const h = windowSize.windowHeight;
        const mountThickness = 40;
        const frameThickness = 20;
        let paddingLeft = 30;
        const paddingRight = 30;
        let paddingTop = 60;
        const paddingBottom = 120;
        const verticalPadding = paddingTop + paddingBottom;
        const horizontalPadding = paddingLeft + paddingRight;
        const combinedFrameWidth = ((frameThickness + mountThickness) * 2);
        const maxImgWidth = w - (combinedFrameWidth + horizontalPadding);
        const maxImgHeight = h - (combinedFrameWidth + verticalPadding);

        let imgWidth = maxImgWidth;
        let imgHeight = imgWidth * artwork.widthToHeightRatio;

        if (imgHeight > maxImgHeight) {
            imgHeight = maxImgHeight;
            imgWidth = imgHeight * artwork.heightToWidthRatio;
        }

        // if there is extra space around the frame, center the image
        const extraHorizontalSpace = w - (imgWidth + combinedFrameWidth + paddingLeft + paddingRight);
        paddingLeft += extraHorizontalSpace / 2;

        const extraVerticalSpace = h - (imgHeight + combinedFrameWidth + paddingTop + paddingBottom);
        paddingTop += extraVerticalSpace / 2;

        const imgX = frameThickness + mountThickness + paddingLeft;
        const imgY = frameThickness + mountThickness + paddingTop;

        let imgStyle = {
            position: 'absolute',
            width: imgWidth,
            height: imgHeight,
            top: imgY,
            left: imgX
        };

        //source:   3000x3000 (max)
        //large:    960x960
        //medium:   640x640
        //thumb:    150x150
        const { url, url_large, url_med, thumb_url } = artwork;
        let artworkUrl;
        const largestImgEdge = imgWidth > imgHeight ? imgWidth : imgHeight;
        if (largestImgEdge <= 150 && thumb_url) {
            artworkUrl = thumb_url;
        }
        else if (largestImgEdge <= 640 && url_med) {
            artworkUrl = url_med;
        }
        else if (largestImgEdge <= 960 && url_large) {
            artworkUrl = url_large;
        }
        else {
            artworkUrl = url;
        }

        if (this.state.imageLoading) {
            imgStyle.display = 'none';
        }

        return (
            <ScrollbarRemover showScrollbars={allowScrollbars}>
                {this.state.imageLoading
                    ? <div style={{
                        position: 'absolute',
                        zIndex: 2000,
                        top: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>Loading artwork...</div>
                    : ""
                }

                <div style={{ position: 'absolute' }}>
                    <Room width={w} height={h}/>
                </div>

                <div style={{ position: 'absolute', top: paddingTop, left: paddingLeft }}>
                    <PictureFrame
                        frameThickness={frameThickness}
                        mountThickness={mountThickness}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}/>
                </div>

                <img alt="user artwork"
                     onLoad={this.onImageLoad.bind(this)}
                     style={imgStyle} src={artworkUrl}/>
            </ScrollbarRemover>
        )
    }
}

export default Artwork;