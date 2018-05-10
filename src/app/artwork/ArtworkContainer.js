import React, { Component } from "react";
import Measure from 'react-measure'; //https://www.npmjs.com/package/react-measure
// comps
import Artwork from "./Artwork";

/*
* Using the Measure function to determine the size of the artwork
* The dummy content inside Measure is used to determine the available
* space.  This is then passed on to the Artwork which is position fixed
* so overlays the dummy content.
* */

class ArtworkContainer extends Component {

    constructor(props) {
        super(props);

        this.state = { dimensions: null };
    }

    render() {
        const { onPhotoSelected, isNewArtworkWithoutImage, artworkData, masterCanvas } = this.props;
        const passThroughProps = { onPhotoSelected, isNewArtworkWithoutImage, artworkData, masterCanvas };
        const { dimensions } = this.state;

        return (
            <div style={{ flex: 1, backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
                <Measure
                    bounds
                    onResize={(contentRect) => {
                        this.setState({ dimensions: contentRect.bounds })
                    }}>

                    {({ measureRef }) =>
                        <div ref={measureRef} style={{ backgroundColor: 'white', flex: 1 }}>

                            Loading artwork

                        </div>
                    }
                </Measure>

                {dimensions &&
                <div style={{ overflow: 'hidden', maxHeight: dimensions.height, position: 'fixed' }}>
                    <Artwork {...passThroughProps}
                             width={dimensions.width}
                             height={dimensions.height}/>
                </div>
                }
            </div>
        );
    }
}

export default ArtworkContainer;