import React, { Component } from "react";
import Artwork from "./Artwork";
import * as ImageHelper from "../global/ImageHelper";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        const { thumbUrl, orientation } = this.props.artworkData;

        let sourceImg = new Image();
        sourceImg.setAttribute('crossOrigin', 'anonymous'); //
        sourceImg.src = thumbUrl;
        sourceImg.onload = () => {

            const masterCanvas = document.createElement('canvas');

            ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
                () => {
                    this.setState({
                        masterCanvas
                    });
                })
        }
    }

    render() {
        const { masterCanvas } = this.state;
        const { artworkData } = this.props;

        return (
            <div>
                <h1>ArtworkThumb</h1>
                {masterCanvas && artworkData &&
                <Artwork masterCanvas={masterCanvas}
                         artworkData={artworkData}
                         width={300}
                         height={300}/>
                }
            </div>
        );
    }
}

export default ArtworkThumb;