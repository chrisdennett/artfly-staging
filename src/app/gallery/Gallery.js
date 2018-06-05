import React, { Component } from "react";
import { connect } from 'react-redux';
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
//
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

class Gallery extends Component {

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
        if(!currentArtwork) return null;

        const { dimensions } = this.state;
        const galleryStyle = {display:'flex', backgroundColor: '#FF0000', overflow: 'hidden', flexDirection: 'column', height: '100vh'};

        return (
            <Measure
                bounds
                onResize={this.onResize}>

                {({ measureRef }) =>
                    <div ref={measureRef} style={galleryStyle}>
                        <h1>Gallery</h1>

                        {currentArtwork && dimensions &&
                        <FramedArtworkCanvas
                            maxWidth={Math.min(dimensions.width - 20, 1000)}
                            maxHeight={Math.min(dimensions.height - 150, 1000)}
                            artworkData={currentArtwork}/>
                        }
                    </div>
                }
            </Measure>
        );
    }
}

const mapStateToProps = (state, props) => {
    let currentArtwork = null;
    if (state && props.artworkId) {
        currentArtwork = selectCurrentArtwork(state.artworks, state.resources, props.artworkId)
    }

    return {
        currentArtwork
    }
};
export default connect(mapStateToProps)(Gallery);

const selectCurrentArtwork = (artworks, resources, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;
    const resourceId = artwork.resources;

    return { ...artwork, ...resources[resourceId] }
};