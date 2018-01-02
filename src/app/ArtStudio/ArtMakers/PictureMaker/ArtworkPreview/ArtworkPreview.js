import React, { Component } from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import Artwork from "../../../../Artwork/Artwork";
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";

class ArtworkPreview extends Component {

    /*constructor(props) {
        super(props);

        this.updateArtworkData = this.updateArtworkData.bind(this);
        this.redrawCanvas = this.redrawCanvas.bind(this);

        this.state = { artworkData: null }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }*/
/*
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
                this.updateArtworkData(img)
            }
        }
    }

    updateArtworkData(img, widthToHeightRatio, heightToWidthRatio) {
        let artworkData = calculateArtworkSizes(150, 150, widthToHeightRatio, heightToWidthRatio, 5);

        artworkData.imgSrc = img.src;
        artworkData.img = img;

        this.setState({ artworkData });
    }*/

    render() {
        // const { artworkData } = this.state;
        if(!this.props.artwork) return <div>no artwork data</div>;

        const {maxWidth, maxHeight, artwork} = this.props;
        const {imgSrc, widthToHeightRatio, heightToWidthRatio} = artwork;
        let artworkData = calculateArtworkSizes(maxWidth, maxHeight, widthToHeightRatio, heightToWidthRatio, 5);
        artworkData.imgSrc = imgSrc;

        console.log("artworkData: ", artworkData);
        console.log("widthToHeightRatio: ", widthToHeightRatio);

        return (
            <div className={'artworkPreview'}>
                <Artwork width={maxWidth}
                         height={maxHeight}
                         artworkData={artworkData}/>
            </div>
        );
    }
}

export default ArtworkPreview;