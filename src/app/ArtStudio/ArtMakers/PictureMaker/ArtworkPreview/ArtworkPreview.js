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

    constructor(props) {
        super(props);

        this.updateArtworkData = this.updateArtworkData.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.redrawCanvas = this.redrawCanvas.bind(this);

        this.state = { artworkData: null }
    }

    componentWillMount() {
        this.redrawCanvas(this.props);
    }

    componentWillReceiveProps(nextProps) {

        console.log("this.testCanvas: ", this.testCanvas);

        if (this.testCanvas && nextProps.masterCanvas) {
            ImageHelper.drawToCanvas({ sourceCanvas: nextProps.masterCanvas, outputCanvas: this.testCanvas });
        }


        const isDiffArtwork = nextProps.artwork !== this.props.artwork;
        const hasNewCropData = nextProps.cropData !== this.props.cropData;

        if (isDiffArtwork) {
            this.redrawCanvas(nextProps);
        }
        else if (hasNewCropData) {
            const { img } = this.state.artworkData;
            const { cropData } = nextProps;
            const { rotation, ...cropPercents } = cropData;

            this.updateCanvas(img, rotation, cropPercents);
        }
    }

    /*onMasterCanvasInit(canvas) {
        this.masterCanvas = canvas;
        this.props.onMasterCanvasInit(canvas);
    }*/

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

    updateCanvas(img, orientation, cropPercents) {
        const { masterCanvas } = this.props;


        ImageHelper.drawToCanvas({ sourceCanvas: img, outputCanvas: masterCanvas, orientation, cropPercents }, (widthToHeightRatio, heightToWidthRatio) => {
            // onCanvasInit(this.canvas, widthToHeightRatio, heightToWidthRatio);

            //source:   3000x3000 (max)
            //large:    960x960
            //medium:   640x640 // created using cloud functions
            //thumb:    150x150

            ImageHelper.drawCanvasToCanvas(this.largeCanvas, 960, 960, masterCanvas, 0, 0, masterCanvas.width, masterCanvas.height);
            ImageHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, masterCanvas, 0, 0, masterCanvas.width, masterCanvas.height);

            this.updateArtworkData(img, widthToHeightRatio, heightToWidthRatio);

            this.props.onDrawnToCanvas(img);
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

                {/*<Artwork width={100}
                         height={100}
                         artworkData={artworkData}/>*/}

                {/*<canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                        ref={this.onMasterCanvasInit}/>*/}

                {/*<canvas ref={(canvas) => this.testCanvas = canvas}
                        className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}/>*/}


                <div className={'artworkPreview--canvasHolder'}>
                    <canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                            ref={(canvas) => this.thumbCanvas = canvas}/>
                    <canvas className='artworkPreview--canvas artworkPreview--hiddenCanvas'
                            ref={(canvas) => this.largeCanvas = canvas}/>


                </div>

            </div>
        );
    }
}

export default ArtworkPreview;