import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
import Swipeable from 'react-swipeable'; //https://github.com/dogfessional/react-swipeable
// comps
import FramedArtworkCanvas from "../../components/artwork/FramedArtworkCanvas";
import LoadingThing from "../../components/loadingThing/LoadingThing";

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
        const { artworkData, onSwipeRight, onSwipeLeft } = this.props;

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

                        <Swipeable className={'gallery--framedArtwork'}
                                   onSwipedRight={onSwipeRight}
                                   onSwipedLeft={onSwipeLeft}
                        >
                            {artworkData && dimensions &&
                            <FramedArtworkCanvas
                                maxWidth={maxFrameWidth}
                                maxHeight={maxFrameHeight}
                                artworkData={artworkData}/>
                            }
                        {!artworkData &&
                        <LoadingThing label={'Loading artwork'} style={{flex:1, margin:20}}/>
                        }
                        </Swipeable>


                    </div>
                }
            </Measure>

        );
    }
}

export default GalleryArtwork;