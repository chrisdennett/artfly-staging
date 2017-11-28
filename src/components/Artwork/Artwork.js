// externals
import React, { Component } from "react";
// components
import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';
import ScrollbarRemover from "../global/ScrollbarRemover";

class Artwork extends Component {

    constructor() {
        super();
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
        const { artwork, width, height, allowScrollbars=false } = this.props;

        const {widthToHeightRatio, heightToWidthRatio} = artwork;
        const frameThicknessPercent = 0.03;
        const mountThicknessPercent = 0.06;
        const spaceBelowPicturePercent = 0.1;
        const spaceBelowPicture = spaceBelowPicturePercent * height;

        let minPaddingLeft = 10;
        const minPaddingRight = 10;
        let minPaddingTop = 60;
        const minPaddingBottom = spaceBelowPicture;

        const maxWidth = width - (minPaddingLeft+minPaddingRight);
        const maxHeight = height - (minPaddingTop+minPaddingBottom);

        // calculate to maximise width
        let frameThickness = maxWidth * frameThicknessPercent;
        let mountThickness = maxWidth * mountThicknessPercent;
        let totalFrameAndMountThickness = (frameThickness*2)+(mountThickness*2);
        let imgWidth = maxWidth - totalFrameAndMountThickness;
        let imgHeight = imgWidth * widthToHeightRatio;
        let frameHeight = imgHeight + totalFrameAndMountThickness;

        // if it doesn't fit the height, calculate to maximise height
        if(frameHeight > maxHeight){
            frameThickness = maxHeight * frameThicknessPercent;
            mountThickness = maxHeight * mountThicknessPercent;
            totalFrameAndMountThickness = (frameThickness*2)+(mountThickness*2);
            imgHeight = maxHeight - totalFrameAndMountThickness;
            imgWidth = imgHeight * heightToWidthRatio;
        }

        // work out the padding around the picture
        const totalFramedPictureWidth = imgWidth + totalFrameAndMountThickness;
        const extraHorizontalSpace = width - (totalFramedPictureWidth + minPaddingLeft + minPaddingRight);
        const paddingLeft = minPaddingLeft + (extraHorizontalSpace / 2);

        const extraVerticalSpace = height - (imgHeight + totalFrameAndMountThickness + minPaddingTop + minPaddingBottom);
        const paddingTop = minPaddingTop + (extraVerticalSpace / 2);

        let imgStyle = {
            position: 'absolute',
            width: imgWidth,
            height: imgHeight,
            top: paddingTop + frameThickness + mountThickness,
            left: paddingLeft + frameThickness + mountThickness
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
                    <Room width={width} height={height} spaceBelowPicture={spaceBelowPicture}/>
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