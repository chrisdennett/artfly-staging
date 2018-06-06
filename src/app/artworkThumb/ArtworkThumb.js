import React from "react";
// import { Elevation } from 'rmwc/Elevation';
// import { Ripple } from 'rmwc/Ripple';
// helpers
import history from "../global/history";
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

const ArtworkThumb = ({ artworkData, artworkId }) => {
    return (
        <div style={{ lineHeight: 0, padding: 10 }}
             onClick={() => {history.push(`gallery/${artworkId}`)}}>

            <FramedArtworkCanvas artworkData={artworkData} maxHeight={260} maxWidth={260}/>

        </div>
    );
};

export default ArtworkThumb;

/*
 return (
            <Elevation
                z={this.state.elevation || 0}
                transition
                onMouseOver={() => this.setState({ elevation: 14 })}
                onMouseOut={() => this.setState({ elevation: 0 })}
            >
                <Ripple>
                    <div style={{ lineHeight: 0, padding: 10 }}
                         onClick={() => {history.push(`artwork/${artworkId}`)}}
                    >

                        <FramedArtworkCanvas artworkData={artworkData}/>

                    </div>
                </Ripple>
            </Elevation>


        );
*/

/*
render() {
        const { masterCanvas } = this.state;
        const { artworkData, artworkId } = this.props;
        // const {widthToHeightRatio,heightToWidthRatio} = artworkData;
        // const isPortrait = heightToWidthRatio < widthToHeightRatio;
        // const maxImageHeight = isPortrait ? 600 : 300;

        return (
            <Elevation
                z={this.state.elevation || 0}
                transition
                onMouseOver={() => this.setState({ elevation: 14 })}
                onMouseOut={() => this.setState({ elevation: 0 })}
            >
                <Ripple>
                    <div style={{ lineHeight: 0, padding:10 }}
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
*/