import React, { Component } from "react";
import { Elevation } from 'rmwc/Elevation';
import { Ripple } from 'rmwc/Ripple';
// helpers
import history from "../global/history";
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { artworkData, artworkId } = this.props;

        return (
            <div style={{ lineHeight: 0, padding: 10 }}
                 onClick={() => {history.push(`gallery/artworkId_${artworkId}_artworkId`)}}>
                <Elevation
                    z={this.state.elevation || 0}
                    transition
                    onMouseOver={() => this.setState({ elevation: 14 })}
                    onMouseOut={() => this.setState({ elevation: 0 })}>
                    <Ripple>

                        <FramedArtworkCanvas artworkData={artworkData}
                                             maxHeight={260}
                                             maxWidth={260}/>
                    </Ripple>
                </Elevation>
            </div>
        )
            ;
    }
}

export default ArtworkThumb;