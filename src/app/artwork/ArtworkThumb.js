import React, { Component } from "react";
import Artwork from "./Artwork";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = { sourceImg: null };
    }

    componentWillMount() {
        let sourceImg = new Image();
        sourceImg.setAttribute('crossOrigin', 'anonymous'); //
        sourceImg.src = this.props.artworkData.thumbUrl;
        sourceImg.onload = () => {
            this.setState({
                sourceImg
            });
        }
    }

    render() {
        const { sourceImg } = this.state;
        const { artworkData } = this.props;

        return (
            <div>
                <h1>ArtworkThumb</h1>
                {sourceImg && artworkData &&
                <Artwork masterCanvas={sourceImg}
                         artworkData={artworkData}
                         width={300}
                         height={300}/>
                }
            </div>
        );
    }
}

export default ArtworkThumb;