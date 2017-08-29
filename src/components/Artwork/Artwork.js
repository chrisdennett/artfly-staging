import React, { Component } from "react";
import PropTypes from 'prop-types';
import Room from './Room/Room';
import PictureFrame from './PictureFrame/PictureFrame';

class Artwork extends Component {

    constructor(props) {
        super(props);
        this.state = { imageLoading: false };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount() {
        this.updateDimensions();
        // this.setState({ imageLoading: true });
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
    }

    onImageLoad() {
        this.setState({ imageLoading: false });
    }

    updateDimensions() {
        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        this.setState({width, height});
    }

    render() {
        const { artwork } = this.props;
        // const { url, url_large, url_med, url_thumb } = artwork;
        const { url, url_large } = artwork;
        // set the image url to the full sized source image
        let artworkUrl = url;
        // if the large one has been created use that instead
        // TODO if the image area is smaller than the medium sized image use that instead
        if (url_large) {
            artworkUrl = url_large;
        }

        // work out max picture width
        const w = this.state.width;
        const h = this.state.height;
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
        const origImgWidth = artwork.imgWidth;
        const origImgHeight = artwork.imgHeight;
        const heightToWidthMultiplier = origImgWidth / origImgHeight;
        const widthToHeightMultiplier = origImgHeight / origImgWidth;

        let imgWidth = maxImgWidth;
        let imgHeight = imgWidth * widthToHeightMultiplier;

        if(imgHeight > maxImgHeight){
            imgHeight = maxImgHeight;
            imgWidth = imgHeight * heightToWidthMultiplier;
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

        if (this.state.imageLoading) {
            imgStyle.display = 'none';
        }

        return (
            <div>
                {this.state.imageLoading
                    ? <div>Loading artwork...</div>
                    : ""
                }

                <div style={{ position: 'absolute' }}>
                    <Room width={w} height={h}/>
                </div>

                <div style={{ position: 'absolute', top:paddingTop, left:paddingLeft }}>
                    <PictureFrame
                        frameThickness={frameThickness}
                        mountThickness={mountThickness}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}/>
                </div>

                <img alt="user artwork"
                     onLoad={this.onImageLoad.bind(this)}
                     style={imgStyle} src={artworkUrl}/>
            </div>
        )
    }
}

Artwork.propTypes = {
    artwork: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
};

export default Artwork;