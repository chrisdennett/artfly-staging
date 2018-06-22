import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// comps
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";
import LoadingThing from "../loadingThing/LoadingThing";

class GalleryArtwork extends Component {

    constructor(props) {
        super(props);

        this.state = { dimensions: null };

        this.onResize = this.onResize.bind(this);
    }

    onResize(contentRect) {
        this.setState({ dimensions: contentRect.bounds }, this.drawCuttingBoardCanvas);
    }

    render() {
        const { artworkData } = this.props;

        const { dimensions } = this.state;
        let maxFrameWidth, maxFrameHeight;

        if (dimensions) {
            const verticalPadding = dimensions.height * 0.15;
            const horizontalPadding = dimensions.width * 0.15;

            maxFrameWidth = Math.min(dimensions.width - horizontalPadding, 1000);
            maxFrameHeight = Math.min(dimensions.height - verticalPadding, 1000);
        }

        return (
            <Measure
                bounds
                onResize={this.onResize}>

                {({ measureRef }) =>
                    <div ref={measureRef} className={'gallery--sizePlaceholder'}>

                        <div className={'gallery--framedArtwork'}>
                            {artworkData && dimensions &&
                            <FramedArtworkCanvas
                                maxWidth={maxFrameWidth}
                                maxHeight={maxFrameHeight}
                                artworkData={artworkData}/>
                            }
                        {!artworkData &&
                        <LoadingThing label={'Loading artwork'} style={{flex:1, margin:20}}/>
                        }
                        </div>


                    </div>
                }
            </Measure>

        );
    }
}

export default GalleryArtwork;