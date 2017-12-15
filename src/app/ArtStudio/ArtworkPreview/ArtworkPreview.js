import React, { Component } from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import * as PhotoHelper from "../PhotoEditor/assets/PhotoHelper";
import Artwork from "../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../Artwork/assets/ArtworkCalculations";

const maxImageWidth = 3000;
const maxImageHeight = 3000;

class ArtworkPreview extends Component {

    constructor(){
        super();

        this.onMasterCanvasInit = this.onMasterCanvasInit.bind(this);

        this.state = {artworkData:null}
    }

    onMasterCanvasInit(canvas){
        this.masterCanvas = canvas;
        this.props.onMasterCanvasInit(canvas);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selectedImg){
            this.updateCanvas(nextProps.selectedImg, nextProps.selectedImgOrientation);
        }
        else if(nextProps.artwork){
            const {widthToHeightRatio, heightToWidthRatio} = this.props.artwork;

            let artworkData = calculateArtworkSizes(200, 200, widthToHeightRatio, heightToWidthRatio);
            let img = new Image();
            img.src = nextProps.artwork.url_large;
            img.onload = (e) => {
                artworkData.imgSrc = e.target.src;
                this.setState({ artworkData })
            }
        }
    }

    updateCanvas(img, orientation){
        PhotoHelper.drawImageToCanvas(img, this.masterCanvas, orientation, maxImageWidth, maxImageHeight, (widthToHeightRatio, heightToWidthRatio) => {
            // onCanvasInit(this.canvas, widthToHeightRatio, heightToWidthRatio);

            //source:   3000x3000 (max)
            //large:    960x960
            //medium:   640x640 // created using cloud functions
            //thumb:    150x150

            PhotoHelper.drawCanvasToCanvas(this.largeCanvas, 960, 960, this.masterCanvas, 0, 0, this.masterCanvas.width, this.masterCanvas.height);
            PhotoHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, this.masterCanvas, 0, 0, this.masterCanvas.width, this.masterCanvas.height);


            let artworkData = calculateArtworkSizes(200, 200, widthToHeightRatio, heightToWidthRatio);
            artworkData.imgSrc = img.src;
            this.setState({ artworkData })
        })
    }

    render() {

        const {artworkData} = this.state;

        return (
            <div className={'artworkPreview'}>
                <h1>ArtworkPreview</h1>
                <h2>master canvas</h2>
                <div className={'artworkPreview--canvasHolder'} >
                    <canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                            ref={this.onMasterCanvasInit}/>

                    <canvas className='artworkPreview--canvas artworkPreview--hiddenCanvas'
                            ref={(canvas) => this.largeCanvas = canvas}/>

                    <canvas className={'artworkPreview--canvas artworkPreview--hiddenCanvas'}
                            ref={(canvas) => this.thumbCanvas = canvas}/>
                </div>

                <Artwork artwork={this.props.artwork}
                         width={200}
                         height={200}
                         artworkData={artworkData}/>

            </div>
        );
    }
}

export default ArtworkPreview;