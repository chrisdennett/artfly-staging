import React, { Component } from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import * as ImageHelper from "../../../ImageHelper";
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";

const maxImageWidth = 3000;
const maxImageHeight = 3000;

class ArtworkPreview extends Component {

    constructor() {
        super();

        this.onMasterCanvasInit = this.onMasterCanvasInit.bind(this);
        this.updateArtworkData = this.updateArtworkData.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.redrawCanvas = this.redrawCanvas.bind(this);

        this.state = { artworkData: null }
    }

    componentWillMount() {
        this.redrawCanvas(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const isDiffArtwork = nextProps.artwork !== this.props.artwork;
        const hasNewCropData = nextProps.cropData !== this.props.cropData;

        if (isDiffArtwork) {
            this.redrawCanvas(nextProps);
        }
        else if (hasNewCropData) {
            const {img} = this.state.artworkData;
            const {cropData} = nextProps;
            const {rotation, topPercent, rightPercent, bottomPercent, leftPercent} = cropData;

            console.log("cropData: ", cropData);

            this.updateCanvas(img, rotation);
        }

    }

    onMasterCanvasInit(canvas) {
        this.masterCanvas = canvas;
        this.props.onMasterCanvasInit(canvas);
    }

    redrawCanvas(props) {
        const { selectedImg, selectedImgOrientation, artwork } = props;

        // new image upload
        if (selectedImg) {
            this.updateCanvas(selectedImg, selectedImgOrientation);
        }
        // editing previously saved artwork.
        else if (artwork) {
            let artworkData = {}; // = calculateArtworkSizes(200, 200, widthToHeightRatio, heightToWidthRatio);
            let img = new Image();
            img.src = artwork.url_large;
            img.onload = (e) => {
                artworkData.imgSrc = e.target.src;
                this.updateCanvas(img)
            }
        }
    }


    updateCanvas(img, orientation) {
        ImageHelper.drawImageToCanvas(img, this.masterCanvas, orientation, maxImageWidth, maxImageHeight, (widthToHeightRatio, heightToWidthRatio) => {
            // onCanvasInit(this.canvas, widthToHeightRatio, heightToWidthRatio);

            //source:   3000x3000 (max)
            //large:    960x960
            //medium:   640x640 // created using cloud functions
            //thumb:    150x150

            ImageHelper.drawCanvasToCanvas(this.largeCanvas, 960, 960, this.masterCanvas, 0, 0, this.masterCanvas.width, this.masterCanvas.height);
            ImageHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, this.masterCanvas, 0, 0, this.masterCanvas.width, this.masterCanvas.height);

            this.updateArtworkData(img, widthToHeightRatio, heightToWidthRatio);

            this.props.onDrawnToCanvas(this.masterCanvas);
        })
    }

    updateArtworkData(img, widthToHeightRatio, heightToWidthRatio) {
        let artworkData = calculateArtworkSizes(150, 150, widthToHeightRatio, heightToWidthRatio, 5);

        artworkData.imgSrc = img.src;
        artworkData.img = img;

        this.setState({ artworkData }, () => {
            this.props.onArtworkUpdated(artworkData);
        })
    }

    render() {
        const { artworkData } = this.state;

        return (
            <div className={'artworkPreview'}>

                <Artwork width={100}
                         height={100}
                         artworkData={artworkData}/>
                    <canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                            ref={this.onMasterCanvasInit}/>

                <div className={'artworkPreview--canvasHolder'}>

                    <canvas className='artworkPreview--canvas artworkPreview--hiddenCanvas'
                            ref={(canvas) => this.largeCanvas = canvas}/>

                    <canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                            ref={(canvas) => this.thumbCanvas = canvas}/>
                </div>

            </div>
        );
    }
}

export default ArtworkPreview;