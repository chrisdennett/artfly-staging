import React, { Component } from "react";
import { connect } from 'react-redux';
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// styles
// comps
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

// import AppBar from "../appBar/AppBar";

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
        const { currentArtwork } = this.props;
        if (!currentArtwork) return null;

        const { dimensions } = this.state;
        let maxFrameWidth, maxFrameHeight;

        if (dimensions) {
            maxFrameWidth = Math.min(dimensions.width - 20, 1000);
            maxFrameHeight = Math.min(dimensions.height - 100);
        }

        return (
            <Measure
                bounds
                onResize={this.onResize}>

                {({ measureRef }) =>
                    <div ref={measureRef} className={'gallery--sizePlaceholder'}>

                        <div className={'gallery--framedArtwork'}>
                            {currentArtwork && dimensions &&
                            <FramedArtworkCanvas
                                maxWidth={maxFrameWidth}
                                maxHeight={maxFrameHeight}
                                artworkData={currentArtwork}/>
                            }
                        </div>
                    </div>
                }
            </Measure>

        );
    }
}

export default GalleryArtwork;

/*const mapStateToProps = (state, props) => {
    let currentArtwork = null;
    if (state && props.artworkId) {
        currentArtwork = selectCurrentArtwork(state.artworks, props.artworkId)
    }

    return {
        currentArtwork
    }
};
export default connect(mapStateToProps)(GalleryArtwork);

const selectCurrentArtwork = (artworks, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;

    return artwork
};*/


/*
import React, { Component } from "react";
import { connect } from 'react-redux';
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
// styles
import './gallery_styles.css';
// comps
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";
import AppBar from "../appBar/AppBar";

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
        const { currentArtwork } = this.props;
        if (!currentArtwork) return null;

        const { dimensions } = this.state;
        let maxFrameWidth, maxFrameHeight;

        if (dimensions) {
            maxFrameWidth = Math.min(dimensions.width - 20, 1000);
            maxFrameHeight = Math.min(dimensions.height - 100);
        }

        return (
            <div className={'gallery'}>

                <AppBar title={'Gallery'} fixed={false}/>

                <Measure
                    bounds
                    onResize={this.onResize}>

                    {({ measureRef }) =>
                        <div ref={measureRef} className={'gallery--sizePlaceholder'}>

                            <div className={'gallery--framedArtwork'}>
                                {currentArtwork && dimensions &&
                                <FramedArtworkCanvas
                                    maxWidth={maxFrameWidth}
                                    maxHeight={maxFrameHeight}
                                    artworkData={currentArtwork}/>
                                }
                            </div>
                        </div>
                    }
                </Measure>


                <div className={'gallery--controls'}>
                    <Button><Icon use={'arrow_back'}/></Button>
                    <Button className={'gallery--controls--backToGalleryButt'}><Icon use={'dashboard'}/></Button>
                    <Button><Icon use={'arrow_forward'}/></Button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    let currentArtwork = null;
    if (state && props.artworkId) {
        currentArtwork = selectCurrentArtwork(state.artworks, props.artworkId)
    }

    return {
        currentArtwork
    }
};
export default connect(mapStateToProps)(GalleryArtwork);

const selectCurrentArtwork = (artworks, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;

    return artwork
};
*/