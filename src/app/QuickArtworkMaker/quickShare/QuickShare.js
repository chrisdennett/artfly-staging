import React, { Component } from "react";
// styles
import './quickShare_styles.css';
// images
import Butt from "../../global/Butt/Butt";
import QuickArtwork from "../quickArtwork/QuickArtwork";

class QuickShare extends Component {

    constructor(props) {
        super(props);

        this.saveImage = this.saveImage.bind(this);

        this.state = { downloadUrl: '' };
    }

    saveImage() {
        this.setState({ downloadUrl: this.canvas.toDataURL() })
    }

    render() {
        const { downloadUrl } = this.state;
        const { artworkData, width, height} = this.props;

        return (

            <div>
                <Butt useATag={true} href={downloadUrl} download={'artwork'} onClick={this.saveImage}>
                    Download image
                </Butt>

                <QuickArtwork artworkData={artworkData} width={width/2} height={height/2}/>
            </div>
        );
    }
}

export default QuickShare;