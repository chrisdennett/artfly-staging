import React, { Component } from "react";
import { Elevation } from 'rmwc/Elevation';
import { Ripple } from 'rmwc/Ripple';
// helpers
import * as ImageHelper from "../global/ImageHelper";
// comps
import Artwork from "./Artwork";
import history from "../global/history";

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
        const { artworkData, artworkId } = this.props;

        return (
            <Elevation
                z={this.state.elevation || 0}
                transition
                onMouseOver={() => this.setState({ elevation: 14 })}
                onMouseOut={() => this.setState({ elevation: 0 })}
            >
                <Ripple>

                    <div style={{lineHeight:0}}
                         onClick={() => {history.push(`artwork/${artworkId}`)}}
                    >
                        {
                            masterCanvas && artworkData &&
                            <Artwork masterCanvas={masterCanvas}
                                     artworkData={artworkData}
                                     width={300}
                                     height={300}
                            />
                        }
                    </div>
                </Ripple>
            </Elevation>


        );
    }
}

export default ArtworkThumb;